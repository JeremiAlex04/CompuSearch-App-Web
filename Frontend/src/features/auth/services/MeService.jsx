import axios from "axios";

export const MeService = async () => {
    return axios.get("/auth/me", {
        withCredentials: true,
    });
};
