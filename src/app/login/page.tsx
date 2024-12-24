import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='h-screen w-full flex flex-row'>
        <div className='h-full w-1/2 bg-[#2C73EB] flex items-center justify-center'>
          <Image src='/3.svg' alt='image' width={400} height={400} />
        </div>
        <div className='h-full w-1/2 '>
             
        </div>
    </div>
  )
}

export default page