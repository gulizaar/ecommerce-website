import api from "../../api/axios";
import md5 from "md5";
import { setRoles, setUser } from "./clientActions";
import { setAuthToken } from "../../api/axios";

export const fetchRoles = () => async (dispatch) => {
    try {
        const res = await api.get("/roles");
        dispatch(setRoles(res.data));
    } catch (err) {
        console.log("roles error:", err);
    }
};

export const loginUser =
    (credentials, rememberMe, navigate, from) =>
        async (dispatch) => {
            try {
                const res = await api.post("/login", credentials);
                const { token, ...user } = res.data;

                // rememberMe varsa localStorage, yoksa sessionStorage
                if (rememberMe) {
                    localStorage.setItem("token", token);
                } else {
                    sessionStorage.setItem("token", token);
                }

                setAuthToken(token);
                dispatch(setUser(user));
                navigate(from || "/", { replace: true });
            } catch (err) {
                throw err;
            }
        };

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setAuthToken(null);
    dispatch(setUser(null));
};