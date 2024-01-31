import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import "./Form.css";
import CloseIcon from "../icons/CloseIcon";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginProps {
  onLogin: (email: string) => void;
  onClickRegister: () => void;
  onClickClose: () => void;
}

function Login({ onLogin, onClickRegister, onClickClose }: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginFormData) => {
    onLogin(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
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
