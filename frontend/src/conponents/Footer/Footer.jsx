import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full h-16 md:h-26 bg-gray-700 flex items-center justify-center'>
        <p className='text-center text-gray-400 text-sm'>
            &copy; {new Date().getFullYear()} Rohit Kumawat. All rights reserved.
        </p>
    </footer>
  )
}
export default Footer
