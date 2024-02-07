import apiClient from "./apiClient";
// import { IUser } from "./registerService";

export interface IUpdateUser {
  userName?: string;
  email?: string;
  password?: string;
  imgUrl?: string;
}

export const updateUser = (userId: string, user: IUpdateUser) => {
  const accessToken = localStorage.getItem("token"); // או לקבל את הטוקן כפרמטר אם אתה מעדיף

  return new Promise<IUpdateUser>((resolve, reject) => {
    console.log("Update user...");
    apiClient
      .put(
        `/users/${userId}`,
        {
          imgUrl: user.imgUrl,
        },
        {
          headers: {
            Authorization: `jwt ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem("imgUrl", response.data.imgUrl);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
