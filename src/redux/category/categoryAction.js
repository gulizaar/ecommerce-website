export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_LOADING = "SET_LOADING";

export const setCategories = (data) => ({
    type: SET_CATEGORIES,
    payload: data,
});

export const setLoading = (value) => ({
    type: SET_LOADING,
    payload: value,
});