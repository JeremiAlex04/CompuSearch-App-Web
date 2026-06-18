import axios from "axios";

export const RegisterService = async ({ username, email, password, ip }) => {
    return axios.post("/auth/register", {
        username: username,
        email: email,
        contrasena: password,
        tipoUsuario: "USUARIO",
        dispositivo: ip
    }, {
        withCredentials: true
    });
};