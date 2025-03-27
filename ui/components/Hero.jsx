import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

function Hero() {
  return (
    <div className='bg-gray-700 flex flex-col sm:flex-row m-4  rounded'>
        <div>
            <Image
                src="/Designer.jpeg"
                width={500}
                height={500}
                alt="Picture of the author"
                className='rounded'
            />
        </div>
        <Link
            href="/Form"
            className="bg-green-600 flex items-center justify-center" 
        >
            <Button className="bg-green-600 rounded-b-3xl flex items-center justify-center" >
                Get Started
            </Button>
        </Link>
        
    </div>
  )
}

export default Hero