import React from 'react'
import { AlarmClock, ChartArea, ChevronRight } from 'lucide-react';

function PostCard({ post }) {
    return (
        <div className="border  overflow-hidden shadow-md w-72 bg-white mb-20">

            <div className="relative">

                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                />

                <h6 className="absolute top-2 left-2 bg-[rgba(231,64,64,1)] text-white text-xs px-2 py-1 rounded font-montserrat">
                    NEW
                </h6>

            </div>


            <div className="p-4 flex flex-col gap-1">
                <div className='flex gap-2   '>
                    <p className='text-xs font-montserrat text-[rgba(142,194,242,1)]'>Google</p>
                    <p className='text-xs font-montserrat text-[rgba(115,115,115,1)]'>Trending</p>
                    <p className='text-xs font-montserrat text-[rgba(115,115,115,1)]'>Now</p>
                </div>

                <h3 className="text-lg font-montserrat">{post.title}</h3>

                <p className="text-[rgba(115,115,115,1)] text-sm  font-montserrat">
                    {post.description}
                </p>

                <div className="flex justify-between text-xs text-gray-500 mt-2 ">
                    <div className='flex  gap-1'><AlarmClock className="text-[rgba(35,166,240,1)] " /> <span className='font-montserrat'>{post.date}</span></div>
                    <div className='flex gap-1'><ChartArea className='text-[rgba(35,133,109,1)]' /><span className='font-montserrat'>{post.comments}</span></div>
                </div>
                <div className='flex mt-3'>
                    <h6 className='text-[rgba(115,115,115,1)]'>Learn More</h6> <ChevronRight className='text-[rgba(35,166,240,1)]' />
                </div>


            </div>
        </div>
    );
}

export default PostCard