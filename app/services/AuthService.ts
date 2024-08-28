import type { TLogin } from "@/app/types/Auth";

class AuthService {
  api = useApi();
  async login(formData: TLogin) {
    const access_token = useCookie("access_token");
    const refresh_token = useCookie("refresh_token");
    const response = await this.api({
      url: `auth/signin`,
      method: "POST",
      data: formData,
    });

    if (response) {
      if (response.status === 200) {
        access_token.value = response.data.access_token
        refresh_token.value = response.data.refresh_token
        const permissions = response.data.user.permissions
        const permissionGroups = response.data.user.permissionGroups
        localStorage.setItem("permissions", JSON.stringify(permissions));
        localStorage.setItem("permissionGroups", JSON.stringify(permissionGroups));
        window.location.reload()
      }
    }
    return false
  }
}

export default new AuthService();