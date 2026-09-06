import React from 'react'
import Header2 from '../layout/Header2'
import Footer from '../layout/Footer'
import teamh1 from "../assets/teamh1.jpg";
import teamh2 from "../assets/teamh2.jpg";
import teamh3 from "../assets/teamh3.jpg";
import teamh4 from "../assets/teamh4.jpg";
import teamh5 from "../assets/teamh5.jpg";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import TeamGrid from '../components/TeamGrid';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

function Team() {
    return (
        <div>
            <Header2></Header2>
            <div className="flex flex-col items-center text-center py-10">
                <h5 className='text-[rgba(115,115,115,1)]'>WHAT WE DO</h5>

                <h2 className="text-3xl font-bold mt-2">
                    Innovation tailored for you
                </h2>

                <div className="flex items-center gap-2 mt-4">
                    <Link
                        to="/"
                        className="text-[rgba(37,43,66,1)] no-underline font-medium"
                    >
                        Home
                    </Link>

                    <IoIosArrowForward className="text-[rgba(115,115,115,1)]" />

                    <Link
                        to="/team"
                        className="text-[rgba(115,115,115,1)] no-underline font-medium"
                    >
                        Team
                    </Link>
                </div>
            </div>
            <div className="grid md:grid-cols-[2fr_1fr] gap-2">

                <img
                    src={teamh1}
                    alt=""
                    className="w-full h-[530px] object-cover"
                />

                <div className="grid grid-cols-2 gap-2">
                    <img src={teamh2} alt="" className="w-full h-[260px] object-cover" />
                    <img src={teamh3} alt="" className="w-full h-[260px] object-cover" />
                    <img src={teamh4} alt="" className="w-full h-[260px] object-cover" />
                    <img src={teamh5} alt="" className="w-full h-[260px] object-cover" />
                </div>

            </div>
            <TeamGrid />
            <div className="flex flex-col items-center text-center py-10 gap-3">

                <h2 className='font-bold'>Start your 14 days free trial</h2>
                <h6 className='text-[rgba(115,115,115,1)]'>Met minim Mollie non desert Alamo est sit cliquey dolor<br></br>
                    do met sent. RELIT official consequent.</h6>

                <button className='text-white bg-[rgba(35,166,240,1)] w-36 h-12 rounded-2'>Try it free now</button>
                <div className='flex gap-3 text-2xl'>
                    <FaTwitter className="text-[rgba(85,172,238,1)]" />
                    <FaFacebook className="text-[rgba(57,81,133,1)]" />
                    <FaInstagram className='text-black'></FaInstagram>
                    <FaLinkedin className="text-[rgba(10, 102, 194, 1)]" />


                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Team