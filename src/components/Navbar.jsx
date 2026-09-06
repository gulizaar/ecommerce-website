import { NavLink, useLocation, Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import md5 from "md5";
import {
    Search,
    ShoppingCart,
    Heart,
    User,
    ChevronDown,
    Menu
} from "lucide-react"
import { useState } from "react"
import { useShop } from "../context/ShopContext";

const genderMap = { k: "kadin", e: "erkek" };

function Navbar() {
    const navigate = useNavigate();

    const user = useSelector((state) => state.client.user);

    const categories = useSelector(
        (state) => state.category?.categories || []
    );

    const groupedCategories = {
        kadin: categories.filter(c => c.code?.startsWith("k:")),
        erkek: categories.filter(c => c.code?.startsWith("e:")),
    };

    const { cart, favorites } = useShop();
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const isHome = location.pathname === "/";
    const isShop =
        location.pathname.startsWith("/shop") ||
        location.pathname.startsWith("/product");

    const totalCount = cart.reduce((acc, item) => acc + (item.count || 1), 0);

    return (
        <nav className="bg-white px-4 md:px-10 md:mx-20 py-4 ">

            <div className="flex items-center justify-between">

                <h1 className="text-2xl font-bold text-[#252B42]">
                    Bandage
                </h1>

                <div className="hidden md:flex items-center gap-6 text-[rgba(115,115,115,1)]">

                    <NavLink to="/" className="text-sm font-bold no-underline">
                        Home
                    </NavLink>


                    <div className="relative group">

                        <NavLink
                            to="/shop"
                            className="text-sm font-bold no-underline inline-flex items-center gap-1"
                        >
                            Shop <ChevronDown size={16} />
                        </NavLink>

                        <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md min-w-[320px] z-50 p-4">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <Link to="/shop/kadin" className="text-sm font-bold mb-3 text-gray-700 block no-underline">
                                        Kadın
                                    </Link>
                                    {groupedCategories.kadin.map((category) => (
                                        <Link
                                            key={category.id}
                                            to={`/shop/kadin/${category.title}/${category.id}`}
                                            className="block py-1 text-sm text-gray-600 hover:text-black no-underline"
                                        >
                                            {category.title}
                                        </Link>
                                    ))}
                                </div>
                                <div>
                                    <Link to="/shop/erkek" className="text-sm font-bold mb-3 text-gray-700 block no-underline">
                                        Erkek
                                    </Link>
                                    {groupedCategories.erkek.map((category) => (
                                        <Link
                                            key={category.id}
                                            to={`/shop/erkek/${category.title}/${category.id}`}
                                            className="block py-1 text-sm text-gray-600 hover:text-black no-underline"
                                        >
                                            {category.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    <NavLink to="/about" className="text-sm font-bold no-underline">About</NavLink>
                    <NavLink to="/blog" className="text-sm font-bold no-underline">Blog</NavLink>
                    <NavLink to="/contact" className="text-sm font-bold no-underline">Contact</NavLink>
                    <NavLink to="/pages" className="text-sm font-bold no-underline">Pages</NavLink>

                </div>

                <div className="flex items-center gap-4 text-[#23A6F0]">

                    <div className="hidden md:flex items-center gap-2 cursor-pointer">
                        {user ? (
                            <div className="relative group flex items-center gap-2 cursor-pointer">
                                <img
                                    src={`https://www.gravatar.com/avatar/${md5(user.email?.trim().toLowerCase() || "")}?d=identicon`}
                                    alt="avatar"
                                    className="w-6 h-6 rounded-full"
                                />
                                <p className="text-sm font-semibold mb-0">{user.email || user.name}</p>
                                <ChevronDown size={14} />

                                {/* Dropdown */}
                                <div className="absolute right-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md w-48 z-50 py-2">
                                    <Link
                                        to="/orders"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 no-underline"
                                    >
                                        Siparişlerim
                                    </Link>
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem("token");
                                            navigate("/login");
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
                                    >
                                        Çıkış Yap
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <NavLink to="/login" className="flex items-center gap-2">
                                <User size={18} />
                                <p className="text-sm font-semibold mb-0">Login / Register</p>
                            </NavLink>
                        )}
                    </div>

                    <Search size={20} />

                    {/* DESKTOP SEPET */}
                    <div className="relative group cursor-pointer">
                        <ShoppingCart size={20} onClick={() => navigate('/sepet')} />
                        <span
                            onClick={() => navigate('/sepet')}
                            className="absolute -top-2 -right-2 text-[10px] bg-orange-500 text-white rounded-full w-4 h-4 flex items-center justify-center"
                        >
                            {totalCount}
                        </span>

                        {cart.length > 0 && (
                            <div className="absolute right-0 top-6 hidden group-hover:block bg-white shadow-xl rounded-md w-80 z-50 p-4">
                                <h6 className="font-bold mb-3">Sepetim ({totalCount} Ürün)</h6>

                                <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
                                    {cart.map((item) => {
                                        const product = item.product || item;
                                        const count = item.count || 1;
                                        return (
                                            <div key={product.id} className="flex gap-3 items-center">
                                                <img
                                                    src={product.images?.[0]?.url}
                                                    alt={product.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                                <div>
                                                    <p className="font-bold text-sm mb-0">{product.name}</p>
                                                    <p className="text-xs text-gray-500 mb-0">Adet: {count}</p>
                                                    <p className="text-orange-500 text-sm mb-0">{product.price} ₺</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="flex gap-2 mt-4">
                                    <button
                                        className="flex-1 border border-gray-300 rounded py-2 text-sm hover:bg-gray-50"
                                        onClick={() => navigate('/sepet')}
                                    >
                                        Sepete Git
                                    </button>
                                    <button className="flex-1 bg-orange-500 text-white rounded py-2 text-sm hover:bg-orange-600"
                                        onClick={() => navigate('/order/create')}>

                                        Siparişi Tamamla
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="hidden md:flex relative cursor-pointer" onClick={() => navigate('/favorites')}>
                        <Heart size={20} />
                        <span className="absolute -top-2 -right-2 text-[10px]">
                            {favorites.length}
                        </span>
                    </div>

                    <Menu
                        className="md:hidden cursor-pointer"
                        size={22}
                        onClick={() => setMenuOpen(!menuOpen)}
                    />

                </div>

            </div>


            {menuOpen && (
                <div className="md:hidden mt-4 bg-white p-4 shadow-md rounded-lg">

                    {isHome && (
                        <div className="flex flex-col items-center gap-4">
                            <NavLink to="/" className="text-gray-500 no-underline">Home</NavLink>
                            <NavLink to="/product" className="text-gray-500 no-underline">Product</NavLink>
                            <NavLink to="/about" className="text-gray-500 no-underline">Pricing</NavLink>
                            <NavLink to="/contact" className="text-gray-500 no-underline">Contact</NavLink>
                        </div>
                    )}

                    {isShop && (
                        <div className="flex flex-col items-center gap-4">
                            <NavLink to="/" className="text-gray-500 no-underline">Home</NavLink>
                            <NavLink to="/shop" className="text-gray-500 no-underline">Shop</NavLink>

                            <p className="font-bold text-gray-500 mt-2">Kadın</p>
                            {groupedCategories.kadin.map((category) => (
                                <NavLink
                                    key={category.id}
                                    to={`/shop/kadin/${category.title}/${category.id}`}
                                    className="text-sm text-gray-500 no-underline"
                                >
                                    {category.title}
                                </NavLink>
                            ))}

                            <p className="font-bold text-gray-500 mt-2">Erkek</p>
                            {groupedCategories.erkek.map((category) => (
                                <NavLink
                                    key={category.id}
                                    to={`/shop/erkek/${category.title}/${category.id}`}
                                    className="text-sm text-gray-500 no-underline"
                                >
                                    {category.title}
                                </NavLink>
                            ))}

                            <NavLink to="/about" className="text-gray-500 no-underline">About</NavLink>
                            <NavLink to="/blog" className="text-gray-500 no-underline">Blog</NavLink>
                            <NavLink to="/contact" className="text-gray-500 no-underline">Contact</NavLink>
                            <NavLink to="/pages" className="text-gray-500 no-underline">Pages</NavLink>

                            <div className="flex items-center gap-2 text-[#23A6F0]">
                                <User size={18} />
                                <p className="text-sm mb-0">Login / Register</p>
                            </div>

                            <Search size={20} />

                            <div className="relative" onClick={() => navigate('/sepet')}>
                                <ShoppingCart size={20} />
                                <span className="absolute -top-2 -right-2 text-[10px]">
                                    {totalCount}
                                </span>
                            </div>

                            <div className="relative">
                                <Heart size={20} />
                                <span className="absolute -top-2 -right-2 text-[10px]">
                                    {favorites.length}
                                </span>
                            </div>
                        </div>
                    )}
                    {!isHome && !isShop && (
                        <div className="flex flex-col items-center gap-4">
                            <NavLink to="/" className="text-gray-500 no-underline">Home</NavLink>
                            <NavLink to="/shop" className="text-gray-500 no-underline">Shop</NavLink>
                            <NavLink to="/about" className="text-gray-500 no-underline">About</NavLink>
                            <NavLink to="/contact" className="text-gray-500 no-underline">Contact</NavLink>
                        </div>
                    )}


                </div>
            )}

        </nav>
    )
}

export default Navbar