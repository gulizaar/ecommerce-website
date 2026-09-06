import { useEffect } from "react";
import api from "../api/axios";

function TestApi() {
    useEffect(() => {
        api
            .get("/roles")
            .then((res) => {
                console.log("ROLLER:", res.data);
            })
            .catch((err) => {
                console.log("HATA:", err);
            });
    }, []);

    return <h1>API Test</h1>;
}

export default TestApi;