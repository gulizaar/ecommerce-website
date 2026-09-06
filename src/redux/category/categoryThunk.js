import { setCategories, setLoading } from "./categoryAction";

export const fetchCategories = () => {
    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const res = await fetch("https://workintech-fe-ecommerce.onrender.com/categories");
            const data = await res.json();

            dispatch(setCategories(data));
        } catch (err) {
            console.error(err);
        } finally {
            dispatch(setLoading(false));
        }
    };
};