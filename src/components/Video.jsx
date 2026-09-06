import React from 'react'
import video from "../assets/video.jpg"
import { IoIosPlay } from "react-icons/io";

function Video() {
    return (
        <div className='relative flex justify-center py-10'>

            <div className='w-full max-w-4xl px-4'>

                <div className='relative'>

                    <img
                        src={video}
                        alt="video"
                        className='w-full h-[200px] md:h-[500px] rounded-2xl object-cover'
                    />

                    <button className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                               w-12 h-12 md:w-16 md:h-16 bg-[rgba(35,166,240,1)] rounded-full flex items-center justify-center'>

                        <IoIosPlay className='text-white text-xl md:text-2xl' />

                    </button>

                </div>

            </div>

        </div>
    )
}

export default Video