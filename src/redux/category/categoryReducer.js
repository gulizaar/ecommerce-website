import { SET_CATEGORIES, SET_LOADING } from "./categoryAction";

const initialState = {
    categories: [],
    loading: false,
};

export default function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, loading: action.payload };

        case SET_CATEGORIES:
            return { ...state, categories: action.payload };

        default:
            return state;
    }
}