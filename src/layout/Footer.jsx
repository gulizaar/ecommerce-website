import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

function Footer() {
    return (
        <div className="w-full font-montserrat">


            <div className="bg-gray-100  ">
                <div className="h-32 max-w-6xl mx-auto flex flex-col md:flex-row justify-center md:justify-between items-start md:items-center px-4 md:px-0">
                    <div>
                        <p className="font-bold">Bandage</p>
                    </div>

                    <div className="flex gap-3 text-xl">
                        <FaFacebook className="text-[rgba(35,166,240,1)]" />
                        <FaInstagram className="text-[rgba(35,166,240,1)]" />
                        <FaTwitter className="text-[rgba(35,166,240,1)]" />
                    </div>
                </div>
            </div>

            <hr className="border-t border-gray-200 m-0" />


            <div className="mt-10  max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 px-4 md:px-0 h-50">


                <div className="md:col-span-2">
                    <h5 className="font-bold mb-2">Company Info</h5>
                    <div className="flex flex-col gap-2 font-bold text-sm text-[rgba(115,115,115,1)] font-montserrat">
                        <a href="#" className='no-underline text-[rgba(115,115,115,1)] font-bold'>About Us</a>
                        <a href="#" className='no-underline text-[rgba(115,115,115,1)] '>Carrier</a>
                        <a href="#" className='no-underline text-[rgba(115,115,115,1)] '>We are hiring</a>
                        <a href="#" className='no-underline text-[rgba(115,115,115,1)] '>Blog</a>
                    </div>
                </div>


                <div className="md:col-span-2">
                    <h5 className="font-bold mb-2">Legal</h5>
                    <div className="flex flex-col gap-2 text-sm  font-bold text-[rgba(115,115,115,1)]">
                        <a href="#" className='text-[rgba(115,115,115,1)] no-underline'>About Us</a>
                        <a href="#" className='text-[rgba(115,115,115,1)] no-underline'>Carrier</a>
                        <a href="#" className='text-[rgba(115,115,115,1)] no-underline'>We are hiring</a>
                        <a href="#" className='text-[rgba(115,115,115,1)] no-underline'>Blog</a>
                    </div>
                </div>


                <div className="md:col-span-2 font-montserrat">
                    <h5 className="font-bold mb-2">Features</h5>
                    <div className="flex flex-col gap-2 text-sm font-bold ">
                        <a href="#" className='text-[rgba(115,115,115,1)] no-underline '>Business Marketing</a>
                        <a href="#" className='text-[rgba(115,115,115,1)] no-underline'>User Analytic</a>
                        <a href="#" className='text-[rgba(115,115,115,1)] no-underline'>Live Chat</a>
                        <a href="#" className='text-[rgba(115,115,115,1)] no-underline'>Unlimited Support</a>
                    </div>
                </div>


                <div className="md:col-span-2 font-montserrat">
                    <h5 className="font-bold mb-2">Resources</h5>
                    <div className="flex flex-col gap-2 text-sm font-bold ">
                        <a href="#" className='text-[rgba(115,115,115,1)] no-underline' >IOS & Android</a>
                        <a href="#" className='text-[rgba(115,115,115,1)] no-underline'>Watch a Demo</a>
                        <a href="#" className='text-[rgba(115,115,115,1)] no-underline'>Customers</a>
                        <a href="#" className='text-[rgba(115,115,115,1)] no-underline'>API</a>
                    </div>
                </div>


                <div className="md:col-span-4">
                    <h5 className="font-bold mb-2">Get In Touch</h5>

                    <form className="flex border rounded overflow-hidden mt-2 w-full max-w-xs">
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="bg-[rgba(230,230,230,1)] flex-1 px-3 py-2 text-sm outline-none h-[50px]"
                        />
                        <button className="bg-blue-500 text-white px-4 text-sm">
                            Subscribe
                        </button>
                    </form>
                </div>

            </div>


            <div className="mt-10 bg-gray-100 ">
                <div className="h-20 max-w-6xl mx-auto flex items-center px-4 md:px-0">
                    <p className="text-sm text-[rgba(115,115,115,1)] font-bold">Made With Love By Finland All Right Reserved</p>
                </div>
            </div>

        </div >
    )
}

export default Footer