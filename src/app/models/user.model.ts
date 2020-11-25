// https://ponyracer.ninja-squad.com/apidoc#resources-user

export interface UserModel {
  id: number;
  login: string;
  money: number;
  registrationInstant: string;
  token?: string;
}
