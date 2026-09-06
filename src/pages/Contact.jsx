import React from 'react'
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import product from "../assets/product.png"
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { PiArrowBendRightDown } from "react-icons/pi";

import { IoLogoFacebook } from "react-icons/io";
import Footer from "../layout/Footer";
import Header2 from '../layout/Header2';

function Contact() {
    return (
        <div>
            <Header2 />
            <div className='flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-16 py-10 '>

                {/* LEFT */}
                <div className='max-w-sm'>
                    <h5 className='text-sm font-semibold tracking-widest text-gray-500 mb-4'>
                        CONTACT US
                    </h5>

                    <h1 className='text-5xl font-extrabold text-[#1a2e4a] leading-tight mb-4'>
                        Get in touch today!
                    </h1>

                    <p className='text-gray-500 text-sm mb-6'>
                        We know how large objects will act, but things on a small scale
                    </p>

                    <p className='font-bold text-gray-800 mb-1'>Phone ; +451 215 215</p>
                    <p className='font-bold text-gray-800 mb-6'>Fax : +451 215 215</p>

                    <div className='flex gap-4 text-2xl text-gray-800'>
                        <FaTwitter />
                        <IoLogoFacebook />
                        <FaInstagram />
                        <FaLinkedin />
                    </div>
                </div>

                <div className='relative w-full md:w-1/2 flex items-center justify-center overflow-visible'>

                    {/* BACKGROUND CIRCLE (biraz büyüttük) */}
                    <div className="absolute w-[320px] sm:w-[420px] md:w-[520px] h-[320px] sm:h-[420px] md:h-[520px] rounded-full bg-[rgba(255,233,234,1)]"></div>

                    {/* DECOR DOTS */}
                    <div className="absolute top-6 right-10 w-4 h-4 rounded-full bg-pink-300 opacity-60"></div>
                    <div className="absolute bottom-10 right-16 w-3 h-3 rounded-full bg-purple-400 opacity-60"></div>

                    {/* IMAGE - GERÇEKTEN BÜYÜTÜLDÜ */}
                    <img
                        src={product}
                        alt="product"
                        className="relative z-10 w-[520px] sm:w-[600px] md:w-[750px] lg:w-[850px] max-w-none"
                    />
                </div>

            </div>

            <div className="mt-24 text-center mb-10">

                <div className="mb-16">
                    <h6 className="font-bold text-gray-500 tracking-widest">
                        VISIT OUR OFFICE
                    </h6>

                    <h2 className="text-5xl font-bold text-[#252B42] leading-tight mt-4">
                        We help small businesses <br />
                        with big ideas
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center">

                    {/* LEFT CARD */}
                    <div className="w-[330px] h-[380px] flex flex-col items-center justify-center gap-6 bg-white">

                        <FaPhoneAlt className="text-6xl text-sky-400" />

                        <div className="font-bold text-[#252B42]">
                            <h6>georgia.young@example.com</h6>
                            <h6>georgia.young@ple.com</h6>
                        </div>

                        <h5 className="text-2xl font-bold text-[#252B42]">
                            Get Support
                        </h5>

                        <button className="border border-sky-400 rounded-full px-8 py-3 text-sky-400 font-bold hover:bg-sky-400 hover:text-white duration-300">
                            Submit Request
                        </button>
                    </div>

                    {/* MIDDLE CARD */}
                    <div className="w-[330px] h-[480px] flex flex-col items-center justify-center gap-6 bg-[#252B42]">

                        <IoLocationSharp className="text-7xl text-sky-400" />

                        <div className="font-bold text-white">
                            <h6>georgia.young@example.com</h6>
                            <h6>georgia.young@ple.com</h6>
                        </div>

                        <h5 className="text-2xl font-bold text-white">
                            Get Support
                        </h5>

                        <button className="border border-sky-400 rounded-full px-8 py-3 text-sky-400 font-bold hover:bg-sky-400 hover:text-white duration-300">
                            Submit Request
                        </button>
                    </div>

                    {/* RIGHT CARD */}
                    <div className="w-[330px] h-[380px] flex flex-col items-center justify-center gap-6 bg-white">

                        <MdEmail className="text-6xl text-sky-400" />

                        <div className="font-bold text-[#252B42]">
                            <h6>georgia.young@example.com</h6>
                            <h6>georgia.young@ple.com</h6>
                        </div>

                        <h5 className="text-2xl font-bold text-[#252B42]">
                            Get Support
                        </h5>

                        <button className="border border-sky-400 rounded-full px-8 py-3 text-sky-400 font-bold hover:bg-sky-400 hover:text-white duration-300">
                            Submit Request
                        </button>
                    </div>

                </div>
            </div>


            <div className="flex flex-col items-center justify-center text-center gap-2 mb-32">

                <PiArrowBendRightDown className="text-[rgba(35,166,240,1)] w-16 h-16 mb-1" />

                <h6 className="m-0 text-sm font-bold tracking-widest">
                    WE CAN'T WAIT TO MEET YOU
                </h6>

                <h2 className="m-0 text-4xl font-bold leading-tight">
                    Let’s Talk
                </h2>

                <button className="bg-[rgba(35,166,240,1)] text-white w-40 h-10 rounded-md mt-2">
                    Try it free now
                </button>

            </div>


            <Footer />
        </div >
    )
}

export default Contact