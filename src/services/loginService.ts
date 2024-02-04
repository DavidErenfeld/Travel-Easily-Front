import apiClient from "./apiClient";

export interface IUserLogin {
  email: string;
  password: string;
}

export const loginUser = (user: IUserLogin) => {
  return new Promise<IUserLogin>((resolve, reject) => {
    console.log("Login...");
    console.log(user);
    apiClient
      .post("/auth/login", user)
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("imgUrl", response.data.imgUrl);
        response.data.imgUrl;
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
