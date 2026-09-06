import React from 'react'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import { useShop } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'

function Favorite() {
    const { favorites, toggleFavorite, addToCart } = useShop();
    const navigate = useNavigate();
    return (
        <div className="px-4 md:px-20 py-10">

            <h2 className="text-2xl font-bold text-[#252B42] mb-6">
                Favorilerim ({favorites.length} ürün)
            </h2>

            {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <Heart size={48} className="text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-gray-500">Favori listeniz boş</h3>
                    <p className="text-gray-400 mt-2">Beğendiğiniz ürünleri buradan takip edebilirsiniz.</p>
                    <button
                        onClick={() => navigate('/shop')}
                        className="mt-6 bg-[#23A6F0] text-white px-6 py-3 rounded-md text-sm font-semibold"
                    >
                        Alışverişe Başla
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {favorites.map((product) => (
                        <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-md transition">

                            <div
                                className="relative cursor-pointer"
                                onClick={() => navigate(`/product/${product.id}`)}
                            >
                                <img
                                    src={product.images?.[0]?.url}
                                    alt={product.name}
                                    className="w-full h-72 object-top"
                                />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(product);
                                    }}
                                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                                >
                                    <Heart size={16} className="text-red-500 fill-red-500" />
                                </button>
                            </div>

                            <div className="p-5">
                                <p className="font-semibold text-base text-[#252B42] truncate">{product.name}</p>
                                <p className="text-orange-500 font-bold text-base mt-2">{product.price} ₺</p>

                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="flex-1 flex items-center justify-center gap-1 bg-[#23A6F0] text-white text-sm py-3 rounded"
                                    >
                                        <ShoppingCart size={16} />
                                        Sepete Ekle
                                    </button>
                                    <button
                                        onClick={() => toggleFavorite(product)}
                                        className="p-3 border rounded text-gray-400 hover:text-red-500"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default Favorite