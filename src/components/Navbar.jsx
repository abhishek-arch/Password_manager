import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-200 flex justify-between items-center px-4 h-14'>
      
      <div className="logo font-bold text-2xl">
        <span className='text-green-300'> &lt;</span>
        Pass 
        <span className='text-green-300 ml-1'>OP /&gt;</span>
        </div>
      <ul>
    <li className='flex gap-4'>
        <a className='hover:font-bold' href="#"> Home</a>
        <a className='hover:font-bold' href="#"> About</a>
        <a className='hover:font-bold' href="#"> Contact</a>
    </li>

      </ul>
      <button className=' bg-green-300 p-2 rounded-full '>
        <a className='w-xl flex items-center gap-2' href="https://github.com" target='_blank'>
        <img className='invert' src="/icons/github.svg" alt="" />
        GitHub


        </a>

      </button>
      
    </nav>
  )
}

export default Navbar
