import React from 'react'


import Header from '../layout/Header'
import Footer from '../layout/Footer'
import Clients from '../components/Clients'
import { products } from "../data/products";

import BestsellerProducts from '../components/product/BestsellerProducts'
import ProductDetail from '../components/product/ProductDetail'
import PageContent from '../layout/PageContent';

function ProductDetailPage() {



    return (
        <div>

            <Header />

            <PageContent>

                <ProductDetail />

                <BestsellerProducts
                    showTitle={false}
                    showDescription={false}
                />

                <Clients />

            </PageContent>

            <Footer />

        </div>
    )
}

export default ProductDetailPage