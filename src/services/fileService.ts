import apiClient from "./apiClient";

interface IUploadResponse {
  url: string;
}

export const uploadPhoto = async (photo: File) => {
  return new Promise<string>((resolve, reject) => {
    console.log("Uploading Photo..." + photo);
    const formData = new FormData();
    if (photo) {
      formData.append("file", photo);
      apiClient
        .post<IUploadResponse>("file?file=123.png", formData, {
          headers: {
            "Content-Type": "image/png",
          },
        })
        .then((res) => {
          console.log(res);
          resolve(res.data.url);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    }
  });
};
