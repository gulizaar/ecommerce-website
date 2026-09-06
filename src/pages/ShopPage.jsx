import React, { useState, useEffect } from "react";
import ShopCategory from "../components/shop/ShopCategory";
import ProductPagination from "../components/shop/ProductPagination";

import Header from "../layout/Header";
import { Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProductCard from "../components/product/ProductCard";
import Footer from "../layout/Footer";
import { IoGrid } from "react-icons/io5";
import { PiListChecks } from "react-icons/pi";

import Clients from "../components/Clients";
import PageContent from "../layout/PageContent";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/product/productThunk";

function ShopPage() {
    const [showFilters, setShowFilters] = useState(false);
    const { categoryId } = useParams();

    const dispatch = useDispatch();

    const { productList, fetchState, total } = useSelector((state) => state.product);

    const categories = useSelector((state) => state.category.categories);
    const kadin = categories.filter((c) => c.code.startsWith("k:"));
    const erkek = categories.filter((c) => c.code.startsWith("e:"));

    const [view, setView] = useState("grid");
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState("");
    const [filter, setFilter] = useState("");
    const [debouncedFilter, setDebouncedFilter] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");
    const [appliedPriceMin, setAppliedPriceMin] = useState("");
    const [appliedPriceMax, setAppliedPriceMax] = useState("");

    const itemsPerPage = 12;

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedFilter(filter), 400);
        return () => clearTimeout(handler);
    }, [filter]);

    useEffect(() => {
        dispatch(
            fetchProducts({
                category: selectedCategory ?? categoryId,
                filter: debouncedFilter,
                sort,
                limit: 999,
                offset: 0,
            })
        );
    }, [dispatch, categoryId, selectedCategory, debouncedFilter, sort, currentPage, appliedPriceMin, appliedPriceMax]);

    useEffect(() => {
        setCurrentPage(1);
    }, [categoryId, selectedCategory, debouncedFilter, sort, appliedPriceMin, appliedPriceMax]);

    const handleCategorySelect = (id) => {
        setSelectedCategory((prev) => (prev === id ? null : id));
    };

    const handleApplyFilter = () => {
        setAppliedPriceMin(priceMin);
        setAppliedPriceMax(priceMax);
        setCurrentPage(1);
        setShowFilters(false);
    };

    const handleResetFilters = () => {
        setPriceMin("");
        setPriceMax("");
        setAppliedPriceMin("");
        setAppliedPriceMax("");
        setSelectedCategory(null);
        setCurrentPage(1);
    };

    const activeFilterCount = [
        selectedCategory,
        appliedPriceMin !== "",
        appliedPriceMax !== "",
    ].filter(Boolean).length;

    const filteredProducts = productList.filter((product) => {
        const min = appliedPriceMin !== "" ? Number(appliedPriceMin) : null;
        const max = appliedPriceMax !== "" ? Number(appliedPriceMax) : null;
        if (min !== null && product.price < min) return false;
        if (max !== null && product.price > max) return false;
        return true;
    });

    return (
        <div>
            <Header />

            <PageContent>

                {/* HEADER */}
                <div className="bg-[rgba(250,250,250,1)] w-full flex flex-col md:flex-row items-center md:justify-between py-4 gap-2 px-20">
                    <h2 className="font-bold text-center md:text-left">Shop</h2>
                    <div className="flex items-center justify-center md:justify-end">
                        <Link to="/" className="no-underline font-bold">Home</Link>
                        <ChevronRight className="text-gray-400" />
                        <h6 className="text-gray-500">Shop</h6>
                    </div>
                </div>

                <ShopCategory />

                {/* FILTER BAR */}
                <div className="flex flex-col md:flex-row md:justify-around items-center p-5 gap-4">
                    <p>Showing all {filteredProducts.length} results</p>

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
                            onChange={(e) => setFilter(e.target.value)}
                            className="border h-12 px-3 rounded"
                        />
                        <select
                            className="border w-40 h-12 p-2 rounded"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="">Sırala</option>
                            <option value="price:asc">Fiyat: Artan</option>
                            <option value="price:desc">Fiyat: Azalan</option>
                            <option value="rating:asc">Puan: Artan</option>
                            <option value="rating:desc">Puan: Azalan</option>
                        </select>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="relative bg-blue-500 text-white h-10 w-32 rounded"
                        >
                            {showFilters ? "Kapat" : "Filter"}
                            {activeFilterCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* FILTER PANEL */}
                {showFilters && (
                    <div className="bg-gray-50 shadow-lg rounded-lg p-8 my-5 mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">

                            {/* Kadın */}
                            <div>
                                <h3 className="font-semibold mb-4">Kadın</h3>
                                <div className="flex flex-col gap-3">
                                    {kadin.map((cat) => (
                                        <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="category"
                                                checked={selectedCategory === cat.id}
                                                onChange={() => handleCategorySelect(cat.id)}
                                            />
                                            <span className={`text-sm ${selectedCategory === cat.id ? "text-blue-500 font-semibold" : "text-gray-600"}`}>
                                                {cat.title}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Erkek */}
                            <div>
                                <h3 className="font-semibold mb-4">Erkek</h3>
                                <div className="flex flex-col gap-3">
                                    {erkek.map((cat) => (
                                        <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="category"
                                                checked={selectedCategory === cat.id}
                                                onChange={() => handleCategorySelect(cat.id)}
                                            />
                                            <span className={`text-sm ${selectedCategory === cat.id ? "text-blue-500 font-semibold" : "text-gray-600"}`}>
                                                {cat.title}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-4">Renke Göre Filtre</h3>
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-3"><button className="w-5 h-5 rounded-full bg-blue-500" /> <p>Mavi</p></div>
                                    <div className="flex gap-3"> <button className="w-5 h-5 rounded-full bg-green-500" /><p>Yeşil</p></div>
                                    <div className="flex gap-3"> <button className="w-5 h-5 rounded-full bg-orange-500" /><p>Turuncu</p></div>
                                    <div className="flex gap-3"><button className="w-5 h-5 rounded-full bg-gray-800" /><p>Siyah</p></div>
                                </div>

                            </div>

                            {/* FİYAT ARALIĞI */}
                            <div>
                                <h3 className="font-semibold mb-4">Fiyat Aralığı</h3>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs text-gray-500">Min (₺)</label>
                                            <input
                                                type="number"
                                                min="0"
                                                placeholder="0"
                                                value={priceMin}
                                                onChange={(e) => setPriceMin(e.target.value)}
                                                className="border w-24 h-9 px-2 rounded text-sm"
                                            />
                                        </div>
                                        <span className="mt-4 text-gray-400">—</span>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs text-gray-500">Max (₺)</label>
                                            <input
                                                type="number"
                                                min="0"
                                                placeholder="∞"
                                                value={priceMax}
                                                onChange={(e) => setPriceMax(e.target.value)}
                                                className="border w-24 h-9 px-2 rounded text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {[
                                            { label: "0–500₺", min: 0, max: 500 },
                                            { label: "500–1000₺", min: 500, max: 1000 },
                                            { label: "1000₺+", min: 1000, max: "" },
                                        ].map((range) => (
                                            <button
                                                key={range.label}
                                                onClick={() => {
                                                    setPriceMin(String(range.min));
                                                    setPriceMax(String(range.max));
                                                }}
                                                className={`text-xs px-3 py-1 rounded-full border transition-colors ${priceMin === String(range.min) && priceMax === String(range.max)
                                                    ? "bg-blue-500 text-white border-blue-500"
                                                    : "bg-white text-gray-600 hover:border-blue-400"
                                                    }`}
                                            >
                                                {range.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Butonlar */}
                            <div className="flex flex-col justify-end gap-2 ml-auto">
                                <button
                                    onClick={handleResetFilters}
                                    className="border border-gray-400 text-gray-600 hover:bg-gray-100 font-semibold px-8 h-10 rounded transition-colors"
                                >
                                    Sıfırla
                                </button>
                                <button
                                    onClick={handleApplyFilter}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 h-10 rounded transition-colors"
                                >
                                    Uygula
                                </button>
                            </div>

                        </div>
                    </div>
                )}

                {/* PRODUCTS */}
                {fetchState === "FETCHING" ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className={`flex flex-wrap gap-6 px-4 py-6 mx-20 my-20 ${view === "list" ? "flex-col" : ""}`}>
                        {filteredProducts
                            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                            .map((product) => (
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
                    totalItems={filteredProducts.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <Clients />
            </PageContent>

            <Footer />
        </div>
    );
}

export default ShopPage;