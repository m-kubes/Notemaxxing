import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import api from '../lib/axios';
import toast from 'react-hot-toast';
import RateLimitedUI from '../components/RateLimitedUI';
import { LoaderCircleIcon, Trash } from 'lucide-react';
import { BackToNotes } from '../components/Buttons';
import useConfirm from '../components/Confirm';

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fetching, setFetching] = useState(true)
  const [saving, setSaving] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  
  const navigate = useNavigate();
  const {id} = useParams();

  const [ConfirmDialog, confirmDelete] = useConfirm(
    'Delete',
    'Are you sure you want to delete this note?'
  )

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        toast.error('Failed to fetch note')
        if (err.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error('Failed to load notes');
        }
      } finally {
        setFetching(false);
      }
    }

    fetchNote();
  }, [id])


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required")
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, {
        title,
        content
      })
      toast.success('Note updated successfully!')
      navigate('/')
    } catch (err) {
      console.log("Error updating note:", err)
      if (err.response.status === 429) {
        toast.error("You're creating notes too fast, please try again in a few seconds.", {
          duration: 4000
        })
      } else {
        toast.error("Failed to update note")
      }
    } finally {
      setSaving(false);
    }
  }

  
  const handleDelete = async (e) => {
    e.preventDefault();
    
    const ans = await confirmDelete();
    if (!ans) return;

    try {
      await api.delete(`notes/${id}`);
      toast.success('Note deleted successfully');
    } catch (err) {
      console.log('Error deleting note', err)
      toast.error('Failed to delete note');
    } finally {
      navigate('/')
    }
  }


  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderCircleIcon className='animate-spin size-10'/>
      </div>
    )
  }

  return (
    <main className='min-h-screen'>
      <ConfirmDialog />
      <div className="container mx-auto max-w-2xl px-4 py-8">
        {isRateLimited && <RateLimitedUI />}

        <div className="flex align-middle justify-between">
          <BackToNotes />

          <button className="btn btn-outline btn-error backface-hidden overflow-hidden translate-z-0" onClick={handleDelete}>
            <Trash className='size-5'/>
            Delete Note
          </button>
        </div>

        <div className="card bg-base-300">
            <div className="flex justify-between items-center bg-primary text-primary-content p-6 rounded-t-xl font-bold text-lg">
                <h2 className='card-title text-white'>Note Details</h2>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label w-full mb-1">
                    <span className='label-text text-lg'>Title</span>
                  </label>
                  <input type="text" 
                    placeholder='Note Title' 
                    className='input rounded-xl w-full'
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label w-full mb-1">
                    <span className='label-text text-lg'>Content</span>
                  </label>
                  <textarea 
                    placeholder='Note Content'
                    wrap="soft"
                    className='textarea rounded-xl w-full min-h-50 whitespace-pre-wrap wrap-break-word overflow-x-hidden'
                    value={content}
                    onChange={(e) => {setContent(e.target.value)}}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary text-white" disabled={saving}>
                    {saving? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
      </div>
    </main>
  )
}

export default NoteDetailPage