import api from "./axios";

export const orderApi = {
    createOrder: async (orderData) => {
        const res = await api.post("/order", orderData);
        return res.data;
    },

    getOrders: async () => {
        const res = await api.get("/order");
        return res.data;
    },
};