import React, { useEffect, useState } from 'react'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import ProductCard from '../components/product/ProductCard'
import ProductPagination from '../components/shop/ProductPagination'
import { IoGrid } from "react-icons/io5"
import { PiListChecks } from "react-icons/pi"

import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/product/productThunk'

function Kadin() {

  const dispatch = useDispatch()

  const { productList, fetchState, total } = useSelector(
    (state) => state.product
  )

  const [currentPage, setCurrentPage] = useState(1)
  const [view, setView] = useState("grid")
  const [sort, setSort] = useState("")
  const [filter, setFilter] = useState("")
  const [debouncedFilter, setDebouncedFilter] = useState("")

  const itemsPerPage = 12

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(filter)
    }, 400)
    return () => clearTimeout(handler)
  }, [filter])

  useEffect(() => {
    dispatch(fetchProducts({
      filter: debouncedFilter,
      sort,
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
    }))
  }, [dispatch, debouncedFilter, sort, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedFilter, sort])

  return (
    <div>
      <Header />

      <div className="px-10 py-6">

        <h1 className="text-2xl font-bold mb-6">Kadın Ürünleri</h1>

        {/* FILTER BAR */}
        <div className="flex flex-col md:flex-row md:justify-around items-center p-5 gap-4">

          <p>Showing all {total} results</p>

          {/* VIEW */}
          <div className="flex gap-2 items-center">
            <p>Views:</p>
            <button
              onClick={() => setView("grid")}
              className={`border p-2 rounded ${view === "grid" ? "bg-gray-200" : ""}`}
            >
              <IoGrid size={20} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`border p-2 rounded ${view === "list" ? "bg-gray-200" : ""}`}
            >
              <PiListChecks size={20} />
            </button>
          </div>

          {/* FILTERS */}
          <div className="flex gap-3 items-center flex-wrap">
            <input
              type="text"
              placeholder="Ürün ara..."
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="border h-12 px-3 rounded"
            />

            <select
              className="border w-40 h-12 p-2 rounded"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value)
                setCurrentPage(1)
              }}
            >
              <option value="">Sırala</option>
              <option value="price:asc">Fiyat: Artan</option>
              <option value="price:desc">Fiyat: Azalan</option>
              <option value="rating:asc">Puan: Artan</option>
              <option value="rating:desc">Puan: Azalan</option>
            </select>
          </div>
        </div>

        {/* PRODUCTS */}
        {fetchState === "FETCHING" ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className={`flex flex-wrap gap-6 px-4 py-6 ${view === "list" ? "flex-col" : ""}`}>
            {productList.map((product) => (
              <div
                key={product.id}
                className={
                  view === "grid"
                    ? "w-full sm:w-[calc(50%-18px)] lg:w-[calc(25%-18px)] mb-10"
                    : "w-full"
                }
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        <ProductPagination
          totalItems={total}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <Footer />
    </div>
  )
}

export default Kadin