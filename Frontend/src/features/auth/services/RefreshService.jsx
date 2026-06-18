import axios from "axios";

export const RefreshService = async () => {
    return axios.post("/auth/refresh", null, {
        withCredentials: true,
    });
};
