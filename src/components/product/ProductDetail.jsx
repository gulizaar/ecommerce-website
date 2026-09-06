import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronRight } from 'lucide-react';
import { SlBasket } from "react-icons/sl";
import { IoEye } from "react-icons/io5";
import { GrFavorite } from "react-icons/gr";
import { useShop } from "../../context/ShopContext";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../redux/product/productThunk";

function ProductDetail() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { selectedProduct, fetchState } = useSelector((state) => state.product);
    const { cart, favorites, toggleFavorite, addToCart } = useShop();

    useEffect(() => {
        dispatch(fetchProductById(productId));
    }, [dispatch, productId]);

    if (fetchState === "FETCHING") {
        return (
            <div className="flex justify-center items-center py-40">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!selectedProduct) return null;

    const isFavorite = favorites?.some(f => f.id === selectedProduct.id);
    const isCart = cart?.some(f => f.id === selectedProduct.id);
    const stars = Math.round(selectedProduct.rating);

    return (
        <div className="w-full bg-[#FAFAFA] p-10">
            <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm">
                <Link to="/" className="no-underline text-[#252B42] font-bold">
                    Home
                </Link>
                <ChevronRight className="text-[#BDBDBD]" />
                <h6 className="text-[#BDBDBD]">Shop</h6>
            </div>

            <div className="max-w-6xl mx-auto mt-2">
                <button
                    onClick={() => navigate(-1)}
                    className="text-sm text-[#23A6F0] hover:underline"
                >
                    ← Geri Dön
                </button>
            </div>

            <div className="p-10 flex flex-col md:flex-row gap-20 max-w-7xl mx-auto items-center">

                {/* Ürün Görseli */}
                <div className="w-full md:w-[65%] h-[650px] flex items-center justify-center overflow-hidden">
                    <img
                        src={selectedProduct.images?.[0]?.url}
                        alt={selectedProduct.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="w-full md:w-[35%] flex flex-col">
                    <h1>{selectedProduct.name}</h1>

                    <div className="flex text-xl gap-1">
                        {[...Array(5)].map((_, i) =>
                            i < stars
                                ? <FaStar key={i} className='text-[rgba(243,205,3,1)]' />
                                : <FaRegStar key={i} className='text-[rgba(243,205,3,1)]' />
                        )}
                        <div className='ml-2 text-sm'>
                            <p>{selectedProduct.rating} / 5</p>
                        </div>
                    </div>

                    <h5 className='text-[#252B42]'>
                        {selectedProduct.price} ₺
                    </h5>

                    <h6 className='text-[#737373]'>
                        Stok:
                        <span className='text-[#23A6F0]'>
                            {" "}{selectedProduct.stock} adet
                        </span>
                    </h6>

                    <p className='text-[#858585] font-montserrat'>
                        {selectedProduct.description}
                    </p>

                    <hr />

                    <div className="flex gap-2">
                        <button
                            className="w-5 h-5 rounded-full"
                            style={{ backgroundColor: "rgba(35, 166, 240, 1)" }}
                        />
                        <button
                            className="w-5 h-5 rounded-full"
                            style={{ backgroundColor: "rgba(35, 133, 109, 1)" }}
                        />
                        <button
                            className="w-5 h-5 rounded-full"
                            style={{ backgroundColor: "rgba(231, 124, 64, 1)" }}
                        />
                        <button
                            className="w-5 h-5 rounded-full"
                            style={{ backgroundColor: "rgba(37, 43, 66, 1)" }}
                        />
                    </div>

                    <div className='flex mt-20 gap-2'>
                        <button className='bg-[#23A6F0] text-white rounded h-10 w-32'>
                            Select Options
                        </button>

                        <button
                            onClick={() => toggleFavorite(selectedProduct)}
                            className={`w-10 h-10 flex items-center justify-center border rounded-full ${isFavorite ? "bg-red-500" : ""
                                }`}
                        >
                            <GrFavorite className={isFavorite ? "text-white" : ""} />
                        </button>

                        <button
                            onClick={() => addToCart(selectedProduct)}
                            className='w-10 h-10 flex items-center justify-center border rounded-full'
                        >
                            <SlBasket className={isCart ? "text-red-500" : ""} />
                        </button>

                        <button className='w-10 h-10 flex items-center justify-center border rounded-full'>
                            <IoEye />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;