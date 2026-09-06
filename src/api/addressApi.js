import api from "./axios";

export const addressApi = {
    getAddresses: async () => {
        const res = await api.get("/user/address");
        return res.data;
    },

    createAddress: async (data) => {
        const res = await api.post("/user/address", data);
        return res.data;
    },

    updateAddress: async (data) => {
        const res = await api.put("/user/address", data);
        return res.data;
    },

    deleteAddress: async (id) => {
        const res = await api.delete(`/user/address/${id}`);
        return res.data;
    },
};