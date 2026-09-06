import React, { useEffect, useState } from 'react'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import ProductCard from '../components/product/ProductCard'
import ProductPagination from '../components/shop/ProductPagination'

import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/product/productThunk'

function Erkek() {

    const dispatch = useDispatch()

    const { productList, fetchState, total } = useSelector(
        (state) => state.product
    )

    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 12

    useEffect(() => {
        dispatch(
            fetchProducts({
                gender: "e"
            })
        )
    }, [dispatch])

    useEffect(() => {
        setCurrentPage(1)
    }, [productList])

    const startIndex = (currentPage - 1) * itemsPerPage
    const erkekProducts = productList.filter(
        (product) => product.category_id >= 9 &&
            product.category_id <= 14
    );
    const currentProducts = erkekProducts.slice(
        startIndex,
        startIndex + itemsPerPage
    )

    return (
        <div>
            <Header />

            <div className="px-10 py-6">

                <h1 className="text-2xl font-bold mb-6">
                    Erkek Ürünleri
                </h1>

                {fetchState === "FETCHING" ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {currentProducts.map((product) => (
                            <div key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}

                <ProductPagination
                    totalItems={erkekProducts.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

            </div>

            <Footer />
        </div>
    )
}

export default Erkek