import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function TeamCard({ name, profession, image, facebook, instagram, twitter }) {
    return (
        <div className="text-center p-2 max-w-[360px] mx-auto mb-10">
            <img src={image} alt={name} className="w-full aspect-square object-cover" />
            <p className="font-semibold mt-3 mb-1">{name}</p>
            <p className="text-gray-500 text-sm m-0">{profession}</p>
            <div className="flex justify-center gap-3 mt-2">
                <a href={facebook}><FaFacebook className="text-[#335BF5]" size={18} /></a>
                <a href={instagram}><FaInstagram className=" text-[rgba(229,31,90,1)]" size={18} /></a>
                <a href={twitter}><FaTwitter className="text-[rgba(33,166,223,1)]" size={18} /></a>
            </div>
        </div>
    )
}

export default TeamCard