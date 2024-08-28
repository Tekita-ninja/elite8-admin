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
      // IF LOGIN
      if (error.config.url === "auth/signin") {
        if (error.response.status === 401) {
          console.log({
            error:error.response.data
          })
          toast.error(error.response.data.error, {
            description: error.response.data.message || 'Login failed',
            position:"bottom-center"
          })
        }
        return;
      }
      // IF LOGIN

      if (error.response.status === 401) {
        // REFESH TOKE NANTI
        const access_token = useCookie("access_token");
        const refresh_token = useCookie("refresh_token");
        access_token.value = null;
        refresh_token.value = null;
        localStorage.removeItem("permissions");
        localStorage.removeItem("permissionGroups");
        window.location.reload();
      }else if (error.response.status === 403) {
        // REFESH TOKE NANTI
        const access_token = useCookie("access_token");
        const refresh_token = useCookie("refresh_token");
        access_token.value = null;
        refresh_token.value = null;
        localStorage.removeItem("permissions");
        localStorage.removeItem("permissionGroups");
        window.location.reload();
      } else {
        toast.error(error.response.data.error, {
          description: error.response.data.message || 'Internal Server Error',
          position: "bottom-center"
        })
      }
      return Promise.reject(error);
    }
  );
  return axiosClient;
};