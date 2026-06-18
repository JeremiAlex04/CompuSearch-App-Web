import axios from "axios";

export const LoginService = async ({ identifier, password, ip, rememberMe }) => {
    return axios.post("/auth/login", {
        identificador: identifier,
        contrasena: password,
        dispositivo: ip,
        recordar: rememberMe
    }, {
        withCredentials: true
    });
};