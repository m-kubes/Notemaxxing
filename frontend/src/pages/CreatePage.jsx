import {useState} from 'react'
import { Link, useNavigate } from 'react-router';
import { Move, MoveLeft } from 'lucide-react';
import toast from "react-hot-toast";
import Navbar from '../components/Navbar';
import api from '../lib/axios';
import { BackToNotes } from '../components/Buttons';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required")
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content
      })
      toast.success('Note created successfully!')
      navigate('/');
    } catch (err) {
      console.log("Error creating note:", err)
      if (err.response.status === 429) {
        toast.error("You're creating notes too fast, please try again in a few seconds.", {
          duration: 4000
        })
      } else {
        toast.error("Failed to create note")
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen'>    
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <BackToNotes />

          <div className="card bg-base-300">
            <div className="flex justify-between items-center bg-primary text-primary-content p-6 rounded-t-xl font-bold text-lg">
                <h2 className='card-title text-white'>Create New Note</h2>
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
                    className='textarea rounded-xl w-full min-h-50 whitespace-pre-wrap break-words overflow-x-hidden'
                    value={content}
                    onChange={(e) => {setContent(e.target.value)}}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary text-white" disabled={loading}>
                    {loading? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage