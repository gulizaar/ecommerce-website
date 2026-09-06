import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useShop } from "../../context/ShopContext";
import { GrFavorite } from "react-icons/gr";
import { SlBasket } from "react-icons/sl";

function ProductCard({ product }) {
    const { categories } = useSelector((state) => state.category);
    const category = categories?.find((c) => c.id === product.category_id);

    const { cart, favorites, addToCart, toggleFavorite } = useShop();

    const gender = category?.code?.startsWith("k:") ? "kadin" : "erkek";
    const categoryName = category?.title || "kategori";
    const productSlug = product.name.toLowerCase().replace(/\s+/g, "-");

    const isFavorite = favorites?.some(f => f.id === product.id);
    const isInCart = cart?.some(item => (item.product?.id || item.id) === product.id);

    return (
        <Link
            to={`/shop/${gender}/${categoryName}/${product.category_id}/${productSlug}/${product.id}`}
            className="block no-underline font-montserrat font-bold cursor-pointer group"
        >
            <div className="flex flex-col items-center text-center transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg rounded p-2">
                <img
                    src={product.images?.[0]?.url}
                    alt={product.name}
                    className="w-full h-96 md:h-96 object-cover rounded"
                />
                <h5 className='mt-3 text-[rgba(37,43,66,1)]'>
                    {product.name}
                </h5>
                <span className="text-[#737373] text-sm">
                    {category ? category.title : "Category"}
                </span>
                <div className='flex gap-2'>
                    <p className="text-[rgba(189,189,189,1)]">
                        ${product.price}
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="w-5 h-5 rounded-full bg-blue-500" />
                    <button className="w-5 h-5 rounded-full bg-green-500" />
                    <button className="w-5 h-5 rounded-full bg-orange-500" />
                    <button className="w-5 h-5 rounded-full bg-gray-800" />
                </div>

                {/* FAV + SEPET BUTONLARI */}
                <div className="flex gap-3 mt-3">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(product);
                        }}
                        className={`w-9 h-9 flex items-center justify-center border rounded-full transition ${isFavorite ? "bg-red-500 border-red-500" : "hover:bg-gray-100"
                            }`}
                    >
                        <GrFavorite className={isFavorite ? "text-white" : "text-gray-600"} />
                    </button>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                        className={`w-9 h-9 flex items-center justify-center border rounded-full transition ${isInCart ? "bg-[#23A6F0] border-[#23A6F0]" : "hover:bg-gray-100"
                            }`}
                    >
                        <SlBasket className={isInCart ? "text-white" : "text-gray-600"} />
                    </button>
                </div>

            </div>
        </Link>
    );
}

export default ProductCard;