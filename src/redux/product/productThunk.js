import api from "../../api/axios";
import {
    setProducts,
    setTotal,
    setFetchState,
    setProduct
} from "./productActions";

// PRODUCTS
export const fetchProducts = (params = {}) => async (dispatch) => {
    dispatch(setFetchState("FETCHING"));

    try {
        const cleanParams = Object.fromEntries(
            Object.entries(params).filter(([_, v]) => v !== "" && v !== undefined && v !== null)
        );

        const res = await api.get("/products", { params: cleanParams });

        dispatch(setProducts(res.data.products));
        dispatch(setTotal(res.data.total));
        dispatch(setFetchState("FETCHED"));

    } catch (err) {
        dispatch(setFetchState("FAILED"));
        console.log("products error:", err);
    }
};
export const fetchProductById = (id) => async (dispatch) => {
    dispatch(setFetchState("FETCHING"));
    try {
        const res = await api.get(`/products/${id}`);
        dispatch(setProduct(res.data));
        dispatch(setFetchState("FETCHED"));
    } catch (err) {
        dispatch(setFetchState("FAILED"));
        console.log("fetchProductById error:", err);
    }
};