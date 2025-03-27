import Form from '@/components/Form'
import Navbar from '@/components/Navbar'
import React from 'react'


function page() {
  return (
  <>
  <Navbar/>
   <div className='flex justify-center m-4 h-screen '>
     <Form/>
   </div>

  </>    
  )
}

export default page