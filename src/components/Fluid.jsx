import React from 'react'
import fluid from '../assets/fluid.png';

function Fluid() {
    return (
        <div className='flex  flex-col-reverse md:flex-row items-center justify-between gap-3 w-full h-[682px] mt-10'>


            <div className='mr-5'>
                <img src={fluid} className="" />
            </div>


            <div className='flex flex-col justify-center items-center md:items-start gap-3  mx-20 md:mr-32 text-center md:text-left'>
                <h5 className='text-[rgba(115,115,115,1)] font-bold text-sm'>
                    SUMMER 2020
                </h5>

                <h1 className='text-3xl font-bold'>
                    Part of the Neural Universe
                </h1>

                <h4 className='font-montserrat text-[rgba(115,115,115,1)]'>
                    We know how large objects will act,
                    but things on a small scale.
                </h4>

                <div className='flex  flex-col md:flex-row gap-3 mt-4'>
                    <button className='font-bold bg-[rgba(45,192,113,1)] text-white px-4 py-2 font-montserrat'>
                        BUY NOW
                    </button>

                    <button className='text-[rgba(45,192,113,1)] border-1 border-[rgba(45,192,113,1)] px-4 py-2 font-montserrat font-bold'>
                        READ MORE
                    </button>
                </div>
            </div>

        </div>
    )

}

export default Fluid