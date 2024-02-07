import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import "./Form.css";
import CloseIcon from "../icons/CloseIcon";
import { loginUser } from "../../services/loginService";
import axios from "axios";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(4, "Password must be at least 8 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginProps {
  onLogin: (isConnect: boolean) => void;
  onClickRegister: () => void;
  onClickClose: () => void;
}

function Login({ onClickRegister, onClickClose, onLogin }: LoginProps) {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [emgUrl, setEmgUrl] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });
      console.log("user is logt");
      onLogin(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // גישה לתוכן השגיאה מתוך ה-response
        const errorMessage = error.response.data;
        // הצגת הודעת השגיאה למשתמש
        setLoginError(errorMessage + " Please try again");
      } else {
        // הצגת הודעת שגיאה כללית אם השגיאה אינה מסוג AxiosError
        setLoginError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      {loginError && <div className="text-danger">{loginError}</div>}
      <div className="close-icon">
        <CloseIcon onClick={onClickClose} />
      </div>
      <h3 className="title">Login</h3>
      <img
        style={{
          border: "2px solid #fff",
          borderRadius: "50%",
          width: "100px",
          height: "100px",
        }}
        src="/imgs/user.png"
        alt="user img"
      />
      <div className="input-box">
        <input
          {...register("email")}
          type="email"
          id="email"
          placeholder="Email"
          className="email"
        />
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
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
      <div className="buttons-section">
        <button type="submit" className="submit-btn">
          Login
        </button>
        <p className="text-login-register">or</p>
        <button onClick={onClickRegister} className="submit-btn rerister-btn">
          Register
        </button>
      </div>
    </form>
  );
}

export default Login;
