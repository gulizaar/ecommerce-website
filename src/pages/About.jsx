import React from 'react'
import Header2 from '../layout/Header2'
import Footer from '../layout/Footer'
import about from '../assets/about.png'
import about1 from '../assets/about1.jpg'
import Clients from '../components/Clients'
import TeamGrid from '../components/TeamGrid'
import Video from '../components/Video'
import Stats from '../components/Stats'

function About() {
    return (
        <div>
            <Header2 />
            <div className='flex flex-col md:flex-row items-center justify-between px-6 md:px-32 py-10 md:py-16 gap-10'>

                {/* TEXT */}
                <div className='flex flex-col gap-3 text-center md:text-left'>
                    <h5>ABOUT COMPANY</h5>

                    <h1 className='font-bold'>ABOUT US</h1>

                    <h4 className='text-[rgba(115,115,115,1)]'>
                        We know how large objects will act ,<br />
                        but things on a small scale
                    </h4>

                    <button className='bg-[rgba(35,166,240,1)] text-white w-36 mx-auto md:mx-0 rounded-2 py-2 mt-4'>
                        Get Quote Now
                    </button>
                </div>

                {/* IMAGE */}
                <div className='relative flex items-center justify-center'>

                    <div className='absolute w-[80px] h-[80px] bg-[rgba(255,233,234,1)] rounded-full z-0 top-[-20px] left-[40px]' />
                    <div className='absolute w-[20px] h-[20px] bg-[rgba(255,233,234,1)] rounded-full z-0 top-[150px] right-[150px]' />
                    <div className='absolute w-[10px] h-[10px] bg-[rgba(151,125,244,1)] rounded-full z-0 top-[10px] right-[200px]' />
                    <div className='absolute w-[10px] h-[10px] bg-[rgba(151,125,244,1)] rounded-full z-0 top-[250px] left-[90px]' />
                    <div className='absolute w-[250px] md:w-[350px] h-[250px] md:h-[350px] bg-[rgba(255,233,234,1)] rounded-full z-0' />

                    <img
                        src={about}
                        alt="about"
                        className='relative z-10 h-[300px] md:h-[450px] object-contain'
                    />

                </div>

            </div>
            <div className='flex flex-col md:flex-row items-center md:items-start justify-between px-10 md:px-32 py-16 gap-10 text-center md:text-left'>

                <div className='w-full md:w-[500px]'>
                    <p className='text-[rgba(231,64,64,1)]'>
                        Problems trying
                    </p>

                    <h2 className='font-bold'>
                        Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
                    </h2>
                </div>

                <div className='w-full md:w-[500px]'>
                    <p className='text-[rgba(115,115,115,1)]'>
                        Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
                    </p>
                </div>

            </div>
            <Stats />
            <Video />
            <TeamGrid featured />
            <div className='  bg-[rgba(250,250,250,1)] '>
                <div className='flex flex-col items-center text-center pt-20 gap-3'>
                    <h2 className='font-bold'>Big Companies Are Here</h2>
                    <p className='text-[rgba(115,115,115,1)] font-bold'>         Problems trying to resolve the conflict between <br />
                        the two major realms of Classical physics: Newtonian mechanics </p>
                </div>
                <Clients />

            </div>

            <div className='flex w-full'>


                <div className='bg-[rgba(42,124,199,1)] text-white flex-1 md:flex-[2] p-10 md:pl-48 flex flex-col justify-center items-center md:items-start text-center md:text-left'>
                    <h5>WORK WITH US</h5>
                    <h2 className='font-bold'>Now Let’s grow Yours</h2>

                    <p>
                        The gradual accumulation of information about atomic and <br /> small-scale behavior during the first quarter of the 20th
                    </p>

                    <button className='border border-white px-4 py-2 mt-4'>
                        Buton
                    </button>
                </div>


                <img
                    src={about1}
                    className='hidden md:block md:flex-[1] object-cover'
                    alt="about"
                />

            </div>
            <Footer />


        </div >
    )
}

export default About
