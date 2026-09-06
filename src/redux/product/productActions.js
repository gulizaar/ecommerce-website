import api from "../../api/axios";
export const setCategories = (data) => ({
    type: "SET_CATEGORIES",
    payload: data,
});

export const setProducts = (data) => ({
    type: "SET_PRODUCTS",
    payload: data,
});
export const setProduct = (data) => ({
    type: "SET_PRODUCT",
    payload: data,
});
export const setTotal = (data) => ({
    type: "SET_TOTAL",
    payload: data,
});

export const setLimit = (data) => ({
    type: "SET_LIMIT",
    payload: data,
});

export const setOffset = (data) => ({
    type: "SET_OFFSET",
    payload: data,
});

export const setFilter = (data) => ({
    type: "SET_FILTER",
    payload: data,
});

export const setFetchState = (data) => ({
    type: "SET_FETCH_STATE",
    payload: data,
});
export const fetchCategories = () => async (dispatch) => {
    try {
        const res = await api.get("/categories");
        dispatch({ type: "SET_CATEGORIES", payload: res.data });
    } catch (err) {
        console.error("Categories fetch error:", err);
    }
};