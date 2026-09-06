import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { BiMenu, BiMenuAltRight } from "react-icons/bi";
import { useSelector } from "react-redux";
import { User, Heart } from "lucide-react";
import { useShop } from "../context/ShopContext";

function Header2() {
    const [menuOpen, setMenuOpen] = useState(false);
    const user = useSelector((state) => state.client.user);
    const { cart, favorites } = useShop();
    const navigate = useNavigate();
    const totalCount = cart.reduce((acc, item) => acc + (item.count || 1), 0);

    return (
        <div className="relative">

            {/* HEADER TOP */}
            <div className="flex items-center justify-between px-6 md:px-16 py-4 bg-white">

                {/* LEFT - LOGO */}
                <div className="text-2xl font-bold text-[#252B42]">
                    Bandage
                </div>

                {/* CENTER - MENU (desktop) */}
                <div className="hidden md:flex items-center gap-8 text-[rgba(115,115,115,1)]">
                    <NavLink to="/" className="text-sm font-bold no-underline">Home</NavLink>
                    <NavLink to="/shop" className="text-sm font-bold no-underline">Product</NavLink>
                    <NavLink to="/" className="text-sm font-bold no-underline">Pricing</NavLink>
                    <NavLink to="/contact" className="text-sm font-bold no-underline">Contact</NavLink>
                </div>

                {/* RIGHT - DESKTOP ACTIONS */}
                <div className="hidden md:flex items-center gap-5 text-[#23A6F0]">
                    {user ? (
                        <div className="flex items-center gap-2">
                            <img src={user.avatar} alt="avatar" className="w-7 h-7 rounded-full" />
                            <span className="text-sm font-semibold text-[#252B42]">
                                {user.email || user.name}
                            </span>
                        </div>
                    ) : (
                        <NavLink to="/login" className="flex items-center gap-2 no-underline">
                            <User size={18} />
                            <span className="text-sm font-semibold">Login / Register</span>
                        </NavLink>
                    )}

                    {!user && (
                        <NavLink
                            to="/signup"
                            className="bg-[rgba(35,166,240,1)] text-white px-3 py-2 rounded-md text-sm font-semibold no-underline"
                        >
                            Become a member →
                        </NavLink>
                    )}
                </div>

                {/* RIGHT - MOBILE ICONS */}
                <div className="flex md:hidden items-center gap-4 text-[#252B42] text-xl">

                    <CiSearch />

                    <div className="relative cursor-pointer" onClick={() => navigate('/sepet')}>
                        <FiShoppingCart />
                        <span className="absolute -top-2 -right-2 text-[10px] bg-orange-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                            {totalCount}
                        </span>
                    </div>

                    <div className="relative cursor-pointer" onClick={() => navigate('/favorites')}>
                        <Heart size={20} />
                        <span className="absolute -top-2 -right-2 text-[10px]">
                            {favorites.length}
                        </span>
                    </div>

                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <BiMenuAltRight /> : <BiMenu />}
                    </button>

                </div>

            </div>

            {/* MOBILE MENU */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-md p-4 flex flex-col items-center gap-4">
                    <NavLink to="/" className="text-sm font-bold text-gray-500 no-underline">Home</NavLink>
                    <NavLink to="/shop" className="text-sm font-bold text-gray-500 no-underline">Product</NavLink>
                    <NavLink to="/" className="text-sm font-bold text-gray-500 no-underline">Pricing</NavLink>
                    <NavLink to="/contact" className="text-sm font-bold text-gray-500 no-underline">Contact</NavLink>

                    {user ? (
                        <div className="flex items-center gap-2 text-[#23A6F0]">
                            <img src={user.avatar} className="w-6 h-6 rounded-full" />
                            <span className="text-sm">{user.email || user.name}</span>
                        </div>
                    ) : (
                        <NavLink to="/login" className="text-sm text-[#23A6F0] no-underline">
                            Login / Register
                        </NavLink>
                    )}

                    {!user && (
                        <NavLink to="/register" className="text-sm font-bold text-[#23A6F0] no-underline">
                            Become a member →
                        </NavLink>
                    )}
                </div>
            )}

        </div>
    );
}

export default Header2;