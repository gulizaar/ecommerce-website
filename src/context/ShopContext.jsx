import { createContext, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShopContext = createContext();

export function ShopProvider({ children }) {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);

    const [favorites, setFavorites] = useState([]);

    // localStorage LOAD (favorites)
    useEffect(() => {
        const savedFav = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFav);
    }, []);

    // localStorage SAVE (favorites)
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    // localStorage SAVE (cart)
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // 🛒 ADD TO CART → Redux'a dispatch
    const addToCart = (product) => {
        dispatch({ type: "ADD_TO_CART", payload: product });
    };

    // ❤️ TOGGLE FAVORITE
    const toggleFavorite = (product) => {
        setFavorites((prev) => {
            const exists = prev.find((p) => p.id === product.id);
            return exists
                ? prev.filter((p) => p.id !== product.id)
                : [...prev, product];
        });
    };

    return (
        <ShopContext.Provider value={{ cart, favorites, addToCart, toggleFavorite }}>
            {children}
        </ShopContext.Provider>
    );
}

export function useShop() {
    return useContext(ShopContext);
}