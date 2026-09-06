export const setCart = (data) => ({
    type: "SET_CART",
    payload: data,
});

export const setPayment = (data) => ({
    type: "SET_PAYMENT",
    payload: data,
});

export const setAddress = (data) => ({
    type: "SET_ADDRESS",
    payload: data,
});

export const addToCartAction = (product) => ({
    type: "ADD_TO_CART",
    payload: product,
});
export const clearCart = () => ({
    type: "CLEAR_CART",
});