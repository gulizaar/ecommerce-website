import React from 'react'
import { useDispatch } from 'react-redux';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus } from 'lucide-react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import SiparisOzeti from '../components/SiparisOzeti';

function AlisverisSepeti() {
    const dispatch = useDispatch();
    const { cart } = useShop();

    const handleRemove = (productId) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: productId });
    };

    const handleCount = (productId, count) => {
        dispatch({ type: "UPDATE_COUNT", payload: { id: productId, count } });
    };

    const handleToggle = (productId) => {
        dispatch({ type: "TOGGLE_CHECKED", payload: productId });
    };

    return (
        <>
            <Header />
            <div className="max-w-6xl mx-auto px-4 py-10">
                <h3 className="font-bold text-[#252B42] mb-6">
                    Sepetim ({cart.length} Ürün)
                </h3>

                {cart.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 mb-4">Sepetiniz boş.</p>
                        <Link to="/shop" className="bg-[#23A6F0] text-white px-6 py-2 rounded no-underline">
                            Alışverişe Başla
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-6 items-start">

                        <div className="flex-1 flex flex-col gap-4">
                            {cart.map((item) => (
                                <div
                                    key={item.product.id}
                                    className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4"
                                >
                                    <input
                                        type="checkbox"
                                        checked={item.checked}
                                        onChange={() => handleToggle(item.product.id)}
                                        className="w-5 h-5 accent-[#23A6F0] cursor-pointer"
                                    />

                                    <img
                                        src={item.product.images?.[0]?.url}
                                        alt={item.product.name}
                                        className="w-20 h-20 object-cover rounded"
                                    />

                                    <div className="flex-1">
                                        <p className="font-bold text-[#252B42] mb-1">
                                            {item.product.name}
                                        </p>

                                        <div className="flex items-center gap-3 mt-2">
                                            <button
                                                onClick={() => handleCount(item.product.id, item.count - 1)}
                                                className="w-7 h-7 border rounded flex items-center justify-center hover:bg-gray-100"
                                            >
                                                <Minus size={14} />
                                            </button>

                                            <span className="font-semibold w-6 text-center">
                                                {item.count}
                                            </span>

                                            <button
                                                onClick={() => handleCount(item.product.id, item.count + 1)}
                                                className="w-7 h-7 border rounded flex items-center justify-center hover:bg-gray-100"
                                            >
                                                <Plus size={14} />
                                            </button>

                                            <button
                                                onClick={() => handleRemove(item.product.id)}
                                                className="ml-2 text-red-400 hover:text-red-600"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-right min-w-[100px]">
                                        <p className="font-bold text-[#252B42]">
                                            {(item.product.price * item.count).toFixed(2)} ₺
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {item.product.price} ₺ / adet
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <SiparisOzeti showOrderButton={true} />

                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default AlisverisSepeti;