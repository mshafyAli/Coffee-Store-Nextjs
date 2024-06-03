'use client'

import Image from 'next/image'
import React from 'react'

const UpVote = () => {

    const handleOnClick = () => {
        console.log('clicked')
    }



  return (
   <>
     <div className="mb-6 flex">
        <Image
          src="/static/icons/star.svg"
          width="24"
          height="24"
          alt="star icon"
        />
        <p className="pl-2">0</p>
      </div>

      <button onClick={handleOnClick}>Up Vote!</button>
   
   </>
  )
}

export default UpVote