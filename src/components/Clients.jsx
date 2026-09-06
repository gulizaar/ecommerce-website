import React from 'react'
import { FaHooli, FaLyft, FaPiedPiperHat, FaStripe, FaRedditAlien, FaAws } from "react-icons/fa";


function Clients() {
    return (
        <div className='bg-[rgba(250,250,250,1)] flex flex-col md:flex-row gap-5 items-center md:justify-center py-4 '>
            <FaHooli className='text-[rgba(115,115,115,1)] w-20 h-20' />
            <FaLyft className='text-[rgba(115,115,115,1)]  w-20 h-20' />
            <FaPiedPiperHat className='text-[rgba(115,115,115,1)]  w-20 h-20' />
            <FaStripe className='text-[rgba(115,115,115,1)]  w-20 h-20' />
            <FaAws className='text-[rgba(115,115,115,1)]  w-20 h-20' />
            <FaRedditAlien className='text-[rgba(115,115,115,1)]  w-20 h-20' />
        </div>
    )
}

export default Clients