import { CredentialResponse } from "@react-oauth/google";
import apiClient from "./apiClient";
import { AxiosResponse } from "axios";

export interface IUser {
  userName?: string;
  email: string;
  password?: string;
  imgUrl?: string;
  _id?: string;
  accessToken?: string;
  refreshToken?: string;
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

export const googleSignin = (credentialResponse: CredentialResponse) => {
  return new Promise<IUser>((resolve, reject) => {
    console.log("googleSignin...");
    apiClient
      .post("/auth/google", credentialResponse)
      .then((response: AxiosResponse) => {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("loggedUserId", response.data.user_Id);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("imgUrl", response.data.imgUrl);
        localStorage.setItem("userName", response.data.userName);
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
