import axios from "axios";

export const LogoutService = async () => {
  return axios.post("/auth/logout", null, {
    withCredentials: true,
  });
};
