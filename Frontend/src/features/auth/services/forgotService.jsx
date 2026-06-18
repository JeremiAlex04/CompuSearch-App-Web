import axios from "axios";

export const ForgotService = async ( { email, ip } ) => {
    return axios.post("/auth/password/forgot", {
        email: email,
        dispositivo: ip
    }, {
        withCredentials: true
    });
};