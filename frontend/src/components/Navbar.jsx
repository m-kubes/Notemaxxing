import React from 'react'
import toast from 'react-hot-toast'
import {Link} from 'react-router'
import { Plus, Sun, Moon, LayoutGrid } from 'lucide-react';
import GithubLogo from './GithubLogo';
import { useTheme } from './ThemeContext';


const Navbar = () => {
  const [theme, toggleTheme] = useTheme();

  const handleBoards = () => {
    toast.error('Not implemented yet!')
  }

  return (
    <nav className='flex justify-between h-15 mt-10 md:pr-8'>
      <div id="nav-left" className='flex items-center'>
          <span className='label text-primary text-2xl sm:text-4xl wotfard-bold'>Notemaxxing</span>
      </div>
      <div id="nav-right" className='flex gap-2 sm:gap-5 w-fit justify-end items-center'>
        <Link to={"/create"} className='h-fit w-fit tooltip cursor-pointer' data-tip="New Note">
          <Plus stroke-width={4} size={30} />
        </Link>

        <button className='h-fit w-fit tooltip cursor-pointer' data-tip="Boards" onClick={handleBoards}>
          <LayoutGrid stroke-width={2.25} size={30} />
        </button>

        <label className='tooltip swap swap-rotate h-fit w-fit' data-tip="Toggle Theme">
          <input type="checkbox" value='dark' checked={theme === 'dark'} onChange={toggleTheme}/>
          <Sun className='swap-off' stroke-width={2.75} size={30} />
          <Moon className='swap-on' size={30} />
        </label>

        <a className="h-2/4 w-auto tooltip hidden md:block" href="https://github.com/m-kubes" target="_blank" data-tip="My GitHub">
          <GithubLogo />
        </a>
      </div>
    </nav>
  )
}

export default Navbar