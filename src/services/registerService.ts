import apiClient from "./apiClient";

export interface IUser {
  userName: string;
  email: string;
  password: string;
  imgUrl: string;
}

export const registerUser = (user: IUser) => {
  return new Promise<IUser>((resolve, reject) => {
    console.log("Registering...");
    console.log(user);
    apiClient
      .post("/auth/register", user)
      .then((response) => {
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
