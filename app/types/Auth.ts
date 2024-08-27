export type TAuthRoleResponse = {
  id: number;
  name: string;
};

export type TUserAuthResponse = {
  id: number;
  name: number;
  username: number;
  nik: number;
  email: string | null;
  should_change_password: boolean;
  roles: TAuthRoleResponse[];
  permission_list: string[];
};

export type TUserLoggedIn = {
  id: number;
  name: string;
  nik: string;
  should_change_password: boolean;
  username: string;
};

export type TLogin = {
  username: string;
  password: string;
};