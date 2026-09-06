// api/cardApi.js
const API_BASE = "https://workintech-fe-ecommerce.onrender.com";

const authHeader = () => ({
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token") || "",
});

const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Bir hata oluştu");
    return data;
};

export const cardApi = {
    getCards: async () => {
        const response = await fetch(`${API_BASE}/user/card`, {
            method: "GET",
            headers: authHeader(),
        });
        return handleResponse(response);
    },

    createCard: async (cardData) => {
        const response = await fetch(`${API_BASE}/user/card`, {
            method: "POST",
            headers: authHeader(),
            body: JSON.stringify(cardData),
        });
        return handleResponse(response);
    },

    updateCard: async (cardData) => {
        const response = await fetch(`${API_BASE}/user/card`, {
            method: "PUT",
            headers: authHeader(),
            body: JSON.stringify(cardData),
        });
        return handleResponse(response);
    },

    deleteCard: async (cardId) => {
        const response = await fetch(`${API_BASE}/user/card/${cardId}`, {
            method: "DELETE",
            headers: authHeader(),
        });
        return handleResponse(response);
    },
};