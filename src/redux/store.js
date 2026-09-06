import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { createLogger } from "redux-logger";

import clientReducer from "./client/clientReducer";
import productReducer from "./product/productReducer";
import cartReducer from "./cart/cartReducer";
import categoryReducer from "./category/categoryReducer";

const logger = createLogger();

const rootReducer = combineReducers({
    client: clientReducer,
    product: productReducer,
    cart: cartReducer,
    category: categoryReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
);

export default store;