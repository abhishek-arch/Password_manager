import React from 'react'

const Footer = () => {
  return (
    <div className='bg-purple-200 flex gap-2 items-center justify-center flex-col pb-2'>
         <div className="logo font-bold text-2xl">
        <span className='text-green-300'> &lt;</span>
        Pass 
        <span className='text-green-300 ml-1'>OP /&gt;</span>
        </div>
      <div className='flex'>
        Created with <img src="#" alt="heart" /> by Abhi
      </div>
    </div>
  )
}

export default Footer
