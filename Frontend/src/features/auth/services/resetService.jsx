import axios from "axios";

export const ResetService = async ({ token, password }) => {
    return axios.post("/auth/password/reset", {
        token: token,
        contrasena: password
    }, {
        withCredentials: true
    });
};