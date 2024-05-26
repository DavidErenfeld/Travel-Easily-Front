import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import CloseIcon from "../icons/CloseIcon";
import { uploadPhoto } from "../../services/fileService";
import AddImgsIcon from "../icons/AddImgsIcon";
import { googleSignin, registerUser } from "../../services/registerService";
import axios from "axios";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import LoadingDots from "../Loader";

const defaultImage = "/imgs/new_worlld.jpg";

const schema = z.object({
  userName: z
    .string()
    .min(2, "Name must be longer than 2 characters")
    .max(20, "Name must be less than 20 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters long")
    .regex(/[a-z]/, "Password must include a lowercase letter"),
});

type FormData = z.infer<typeof schema> & {
  image: FileList;
  imgUrl?: string;
};

interface RegisterProps {
  onClickClose: () => void;
  goToLogin: () => void;
  onLogin: (isConnect: boolean) => void;
}

function Register({ onClickClose, goToLogin, onLogin }: RegisterProps) {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState(defaultImage);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const imageRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImgFile(e.target.files[0]);
      setImgSrc(URL.createObjectURL(e.target.files[0]));
    }
  };

  useEffect(() => {
    return () => {
      if (imgSrc) URL.revokeObjectURL(imgSrc);
    };
  }, [imgSrc]);

  const handleUploadImage = async (imgFile: File) => {
    try {
      const uploadedUrl = await uploadPhoto(imgFile);
      console.log(`Image uploaded successfully: ${uploadedUrl}`);
      return uploadedUrl;
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image.");
      return null;
    }
  };

  const onSubmit = async (data: FormData) => {
    let imgUrl = defaultImage;
    if (imgFile) {
      imgUrl = (await handleUploadImage(imgFile)) || defaultImage;
    }
    try {
      setLoading(true);
      await registerUser({
        userName: data.userName,
        email: data.email,
        password: data.password,
        imgUrl: imgUrl,
      });
      setLoading(false);
      goToLogin();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data;
        setLoading(false);
        setRegisterError(errorMessage + " Please try again");
      } else {
        setLoading(false);
        setRegisterError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const onGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    console.log(credentialResponse);
    try {
      await googleSignin(credentialResponse);
      console.log("user is logt");
      onLogin(true);
    } catch (e) {
      console.log(e);
    }
  };

  const onGoogleLoginFailure = () => {
    console.log("Google login failed");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {registerError && <div className="text-danger">{registerError}</div>}
      <div className="close-icon">
        <CloseIcon onClick={onClickClose} />
      </div>
      <p className="title">Register</p>

      <div className="image-box">
        <input
          {...register("image", { required: true })}
          type="file"
          name="image"
          ref={imageRef}
          style={{ display: "none" }}
          onChange={handleChange}
        />
        {imgSrc && <img src={imgSrc} alt="Preview" className="register-img" />}
      </div>
      <section className="input-section">
        <div
          className="icon-select-img"
          onClick={() => imageRef.current?.click()}
        >
          <AddImgsIcon />
        </div>
        <div className="input-box">
          <input
            {...register("userName")}
            type="text"
            id="userName"
            placeholder="User Name"
            className="user-name"
          />
          {errors.userName && (
            <p className="text-danger">{errors.userName.message}</p>
          )}
        </div>
        <div className="input-box">
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="UserName@gmail.com"
            className="email"
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div className="input-box">
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Password"
            className="password"
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
      </section>
      {loading ? (
        <div className="loader-section">
          <LoadingDots />
        </div>
      ) : (
        <button type="submit" className="submit-btn">
          Submit
        </button>
      )}

      <GoogleLogin
        onSuccess={onGoogleLoginSuccess}
        onError={onGoogleLoginFailure}
      />
    </form>
  );
}

export default Register;
