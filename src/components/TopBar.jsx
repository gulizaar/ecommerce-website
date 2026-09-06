import React from 'react'
import { useLocation } from "react-router-dom";
import { Phone, Mail } from 'lucide-react';
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
function TopBar() {
    const location = useLocation();

    const isShop = location.pathname === "/shop";
    return (
        <div className={`
    flex flex-row justify-between items-center h-12 px-10
    ${isShop ? "bg-[#23856D]" : "bg-[#252b42]"}
  `}>

            <div className="flex items-center gap-10 text-white">

                <div className="flex items-center gap-2 leading-none">
                    <Phone size={16} className="mt-[1px]" />
                    <span className="text-sm">(225) 555-0118</span>
                </div>

                <div className="flex items-center gap-2 leading-none">
                    <Mail size={16} className="mt-[1px]" />
                    <span className="text-sm">
                        gulizar.aksy07@gmail.com
                    </span>
                </div>

            </div>

            <div>
                <p className='text-white mb-0'>Follow Us and get a chance to win 80% off</p>
            </div>

            <div className='text-white flex flex-row gap-3 items-center'>
                <p className='mb-0'>Follow Us : </p>
                <FaInstagram />
                <FaFacebook />
                <FaYoutube />
                <FaTwitter />
            </div>
        </div>
    )
}

export default TopBar