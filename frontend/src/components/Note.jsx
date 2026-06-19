import React from 'react';
import toast from 'react-hot-toast';
import api from '../lib/axios';
import {Link} from "react-router";
import {formatDate} from "../lib/utils";
import {SquarePen, Trash2} from "lucide-react";


const templateNote = {title: 'Note Title', body: 'Note Body'}

const Note = ({note = templateNote, setNotes, confirmDelete}) => {
    const handleDelete = async (e, note_id) => {
        e.preventDefault();
        
        const ans = await confirmDelete();
        if (!ans) return;

        try {
            await api.delete(`notes/${note_id}`);
            setNotes((prev) => prev.filter(note => note._id !== note_id))
            toast.success('Note deleted successfully');
        } catch (err) {
            console.log('Error deleting note', err)
            toast.error('Failed to delete note');
        }
    }

    return (
        <Link to={`/note/${note._id}`} className="card card-lg flex-1 bg-base-200 hover:bg-base-300 rounded-2xl border-3 border-base-300 shadow-lg w-full">
            <div className="flex justify-between items-center bg-primary text-primary-content p-6 rounded-t-xl font-bold text-lg">
                <h2 className='card-title wotfard-bold text-white'>{note.title}</h2>
                <p className='text-sm wotfard-regular text-white'>{formatDate(new Date(note.createdAt))}</p>
            </div>
            <div className="card-body max-w-full break-all whitespace-pre-wrap">
                <p className='whitespace-pre-wrap line-clamp-10'>
                    {note.content}
                </p>
            </div>
            <div className="flex justify-end gap-2 p-3">
                <button className='hover:bg-base-100 p-2 rounded-lg ease-in-out cursor-pointer' onClick={(e) => {handleDelete(e, note._id)}}>
                    <Trash2 stroke="#FF746C" />
                </button>
            </div>
        </Link>
    )
}

const NoteSkeleton = () => {
    return (
        <div className="skeleton rounded-2xl min-h-50 w-full"></div>
    )
}

export {Note, NoteSkeleton}