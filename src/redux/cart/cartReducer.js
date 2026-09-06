const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
const initialState = {
    cart: savedCart,
    payment: {},
    address: {},
};

export default function cartReducer(state = initialState, action) {
    switch (action.type) {

        case "ADD_TO_CART": {
            const existing = state.cart.find(
                (item) => item.product.id === action.payload.id
            );
            if (existing) {
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.product.id === action.payload.id
                            ? { ...item, count: item.count + 1 }
                            : item
                    ),
                };
            }
            return {
                ...state,
                cart: [...state.cart, { count: 1, checked: true, product: action.payload }],
            };
        }

        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter(
                    (item) => item.product.id !== action.payload
                ),
            };

        case "UPDATE_COUNT":
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item.product.id === action.payload.id
                        ? { ...item, count: Math.max(1, action.payload.count) }
                        : item
                ),
            };

        case "TOGGLE_CHECKED":
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item.product.id === action.payload
                        ? { ...item, checked: !item.checked }
                        : item
                ),
            };

        case "SET_CART":
            return { ...state, cart: action.payload };

        case "CLEAR_CART":   // ← bunu ekle
            return { ...state, cart: [] };
        case "SET_PAYMENT":
            return { ...state, payment: action.payload };

        case "SET_ADDRESS":
            return { ...state, address: action.payload };

        default:
            return state;
    }
}