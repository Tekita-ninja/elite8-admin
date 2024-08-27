import axios from "axios";
import { toast } from "vue-sonner";

const token = useCookie("access_token");
const API = import.meta.env.VITE_BASE_URL;

export const useApi = () => {
  const baseURL = API
  const axiosClient = axios.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token?.value,
    },
  });
  axiosClient.interceptors.response.use(
    function (response): any {
      document.querySelector("body")?.classList.remove("with-network-error");
      return response;
    },
    function (error) {
      console.log({
        error
      })
      // if (error.config.url !== "login") {
      //   if (error.response.status === 401) {
      //     const token = useCookie("token");
      //     token.value = null;
      //     localStorage.removeItem("c_user");
      //     window.location.reload();
      //   }
      // }
      // if (error.code === "ERR_NETWORK") {
      //   document.querySelector("body")?.classList.add("with-network-error");
      //   toast.error("Ups! Terjadi kesalahan", {
      //     description: "Mungkin Sinyal atau Jaringan Anda Terputus!",
      //   });
      //   return;
      // }

      // if (error.response.status === 504) {
      //   toast.error(`Ups! Terjadi kesalahan`, {
      //     description:
      //       error.response.data.message || "Proses terputus silahkan coba beberapa saat lagi!",
      //   });
      //   return;
      // }

      // if (error.response.status === 500 || error.response.status > 400) {
      //   toast.error(`Ups! Terjadi kesalahan`, {
      //     description: error.response.data.message || "Internal server error!",
      //   });
      //   return;
      // }
      // return Promise.reject(error);
    }
  );
  return axiosClient;
};