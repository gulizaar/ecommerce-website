import React from 'react'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'

function BestsellerProducts({
    showTitle = true,
    showSubtitle = true,
    showDescription = true,
}) {
    const productList = useSelector((state) => state.product.productList);

    const bestSellers = [...productList]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8);

    return (
        <div className='m-10 px-4'>
            <div className='text-center space-y-5'>
                {showTitle && (
                    <h2 className='text-[rgba(115,115,115,1)]'>
                        Featured Products
                    </h2>
                )}

                {showSubtitle && (
                    <h3 className='text-[rgba(37,43,66,1)] font-bold'>
                        BESTSELLER PRODUCTS
                    </h3>
                )}

                {showDescription && (
                    <p className='text-[rgba(115,115,115,1)] font-medium'>
                        Problems trying to resolve the conflict between
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 mb-20">
                {bestSellers.map(item => (
                    <div key={item.id} className="flex flex-col">
                        <ProductCard product={item} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BestsellerProducts;