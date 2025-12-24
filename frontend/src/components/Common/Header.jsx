import React from 'react'
import Topbar from '../Layout/Topbar'
import Navbar from './Navbar'

const Header = () => {
  return (
   <>   
    {/* topbar
    navbar 
    cart drawer */}
    <header className='border-b border-gray-100'>
        <Topbar/>
        <Navbar/>
    </header>

   </>
  )
}

export default Header
