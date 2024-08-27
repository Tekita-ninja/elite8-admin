import type { TLogin } from "@/app/types/Auth";

class AuthService {
  api = useApi();
  async login(formData: TLogin) {
    const access_token = useCookie("access_token");
    const refresh_token = useCookie("refresh_token");
    const { data, status } = await this.api({
      url: `auth/signin`,
      method: "POST",
      data: formData,
    });

    if (status === 200) {
      access_token.value = data.access_token
      refresh_token.value = data.refresh_token
      window.location.reload()
    }
    return false;
  }
}

export default new AuthService();