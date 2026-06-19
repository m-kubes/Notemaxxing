import {useState, useEffect} from 'react'
import {toast} from 'react-hot-toast'
import api from '../lib/axios';
import Navbar from '../components/Navbar'
import WelcomeUI from '../components/WelcomeUI'
import {Note, NoteSkeleton} from '../components/Note'
import RateLimitedUI from '../components/RateLimitedUI'
import useConfirm from '../components/Confirm';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // custom window.confirm kinda hook
  const [ConfirmDialog, confirmDelete] = useConfirm(
    'Delete',
    'Are you sure you want to delete this note?'
  );

  useEffect(() => {
    // get all notes api/notes
    const fetchNotes = async() => {
      try {
        const res = await api.get('/notes');
        console.log(res.data);
        setNotes(res.data);
      } catch (err) {
        console.log("Error fetching notes");
        if (err.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error('Failed to load notes');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, [])

  return (
    <main className='justify-self-center mx-auto h-auto my-0 w-[90vw] sm:w-[85vw] xl:w-[70vw] 2xl:w-[60vw]'>
        <Navbar />
        <ConfirmDialog />

        {isRateLimited && <RateLimitedUI />}

        {/* display welcome ui if there arent any notes */}
        {notes.length === 0 && !isRateLimited && !loading && <WelcomeUI />}

        <div id="note-container" className="grid my-5 gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

          {/* Repeat 12 note skeletons when loading */}
          {loading && 
            [...Array(12)].map((_, index) => (
              <NoteSkeleton key={index} />
            ))
          }

          {/* Display real notes with map */}
          {notes.length > 0 && !isRateLimited && (
            notes.map((note) => {
              return (<Note key={note._id} note={note} setNotes={setNotes} confirmDelete={confirmDelete} />)
            })
          )}
        </div>
    </main>
  )
}

export default HomePage