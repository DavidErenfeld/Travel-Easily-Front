import { apiClient } from "./apiClient";
import { IUser } from "./registerService";

export const loginUser = (user: IUser) => {
  return new Promise<IUser>((resolve, reject) => {
    console.log("Login...");
    console.log(user);
    apiClient
      .post("/auth/login", user)
      .then((response: any) => {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("loggedUserId", response.data.user_Id);
        localStorage.setItem("imgUrl", response.data.imgUrl);
        localStorage.setItem("userName", response.data.userName);

        response.data.imgUrl;
        console.log(response);
        resolve(response.data);
      })
      .catch((error: any) => {
        console.log(error);
        reject(error);
      });
  });
};
