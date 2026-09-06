import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/category/categoryThunk";
import CategoryCard from "./CategoryCard";

function ShopCategory() {
    const dispatch = useDispatch();

    const { categories } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    // ⭐ TOP 5 RATING
    const topCategories = [...(categories || [])]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);

    return (
        <div className="bg-[rgba(250,250,250,1)] flex flex-col md:flex-row gap-4 justify-center items-center mt-10 md:mt-20 px-16 md:px-10 lg:px-20 py-6 md:py-10">

            {topCategories.map((category) => (
                <CategoryCard
                    key={category.id}
                    category={category}
                />
            ))}

        </div>
    );
}

export default ShopCategory;