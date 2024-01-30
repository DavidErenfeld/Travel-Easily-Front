import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import AddPicture from "../icons/AddPicture";
import AddImgs from "../icons/AddImgs";
import CloseIcon from "../icons/CloseIcon";

interface RegisterProps {
  onClickClose: () => void;
}
const defaultImage = "/imgs/user.png"; // או מקום מקומי כמו '/images/default.jpg'

// סכמת האימות של Zod
const schema = z.object({
  userName: z
    .string()
    .min(2, "Name must be longer than 2 characters")
    .max(10, "Name must be less than 10 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must include a lowercase letter"),
  // אין צורך באימות לשדה התמונה במקרה זה
});

type FormData = z.infer<typeof schema> & {
  image: FileList;
};

function Register({ onClickClose }: RegisterProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const selectedFile = watch("image");

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: data.userName,
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("רישום בוצע בהצלחה: ", responseData);
        // ניתן להוסיף פעולות נוספות לאחר רישום מוצלח, לדוגמה ניתוב לעמוד אחר
      } else {
        console.log("שגיאה ברישום: ", await response.text());
        // טיפול במקרה של שגיאה
      }
    } catch (error) {
      console.error("שגיאת רשת: ", error);
      // טיפול בשגיאת רשת
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="close-icon">
        <CloseIcon onClickClose={onClickClose} />
      </div>
      <h3 className="title">Register</h3>

      <div className="image-box">
        <div className="icon-select-img" onClick={openFilePicker}>
          <AddImgs />
        </div>
        <input
          {...register("image")}
          className="image-profile"
          type="file"
          id="image"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }} // הסתרת אלמנט הקלט
        />
        <img
          src={
            selectedFile && selectedFile.length > 0
              ? URL.createObjectURL(selectedFile[0])
              : defaultImage
          }
          alt="Preview"
          style={{
            border: "2px solid #fff",
            borderRadius: "50%",
            width: "100px",
            height: "100px",
          }}
        />
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
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
}

export default Register;
