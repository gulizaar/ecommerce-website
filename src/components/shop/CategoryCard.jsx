import React from 'react'
import { products } from "../../data/products";
import { Link } from "react-router-dom";

function CategoryCard({ category }) {

    const count = products.filter(
        (product) =>
            product.category.trim().toLowerCase() ===
            category.title.trim().toLowerCase()
    ).length;

    // gender route formatı için normalize
    const gender =
        category.code?.startsWith("k") ? "kadin" : "erkek";

    return (

        <Link
            to={`/shop/${gender}/${category.title}/${category.id}`}
            className="no-underline"
        >

            <div className="relative w-full max-w-xs h-64 overflow-hidden rounded-lg shadow-md">

                <img
                    src={category.img || category.image}
                    className="w-full h-full object-cover"
                    alt={category.title}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white">

                    <h6 className="text-lg font-bold">
                        {category.title}
                    </h6>



                    {/* ⭐ RATING EKLENDİ */}
                    <p className="text-yellow-400 text-sm mt-1">
                        ⭐ {category.rating}
                    </p>

                </div>

            </div>

        </Link>
    )
}

export default CategoryCard;