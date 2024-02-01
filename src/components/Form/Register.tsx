import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import CloseIcon from "../icons/CloseIcon";
import { uploadPhoto } from "../../services/fileService";
import AddImgsIcon from "../icons/AddImgsIcon";
import { registerUser } from "../../services/registerService";

// Interface for props of the Register component
interface RegisterProps {
  onClickClose: () => void;
  goToMainPage: () => void;
  // isUserConect: boolean
}

// Default image source
const defaultImage = "/imgs/new_worlld.jpg"; // Can be a local path like '/images/default.jpg'

// Schema for form validation using Zod
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

// FormData type, combining schema inference and image file
type FormData = z.infer<typeof schema> & {
  image: FileList;
  imgUrl?: string; // עכשיו הטיפוס כולל גם את המאפיין imgUrl כאופציונלי
};

function Register({ onClickClose, goToMainPage }: RegisterProps) {
  // State for managing the File object
  const [imgFile, setImgFile] = useState<File | null>(null);
  // State for managing the display URL of the image
  const [imgSrc, setImgSrc] = useState(defaultImage);
  const [isUserConecte, setIsUserConecte] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const imageRef = useRef<HTMLInputElement>(null);
  // const [image] = watch(["image"]);

  // Handle change in image input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImgFile(e.target.files[0]); // Store the File object
      setImgSrc(URL.createObjectURL(e.target.files[0])); // Update display URL
    }
  };

  useEffect(() => {
    // Cleanup URL.createObjectURL to avoid memory leaks
    return () => {
      if (imgSrc) URL.revokeObjectURL(imgSrc);
    };
  }, [imgSrc]);

  const handleUploadImage = async (imgFile: File) => {
    try {
      const uploadedUrl = await uploadPhoto(imgFile);
      console.log(`Image uploaded successfully: ${uploadedUrl}`);
      return uploadedUrl; // החזר את ה-URL של התמונה המועלה
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image.");
      return null; // במקרה של כשלון, החזר null
    }
  };

  const onSubmit = async (data: FormData) => {
    // בדיקה אם קובץ תמונה נבחר והועלה
    let imgUrl = defaultImage; // הגדרת URL ברירת מחדל אם ההעלאה נכשלת או לא בוצעה
    if (imgFile) {
      imgUrl = (await handleUploadImage(imgFile)) || defaultImage;
    }

    try {
      const registerResult = await registerUser({
        userName: data.userName,
        email: data.email,
        password: data.password,
        imgUrl: imgUrl, // שימוש ב-URL של התמונה שהועלתה או ב-URL ברירת המחדל
      });
      console.log("user is registered: ", registerResult);
      setIsUserConecte(true);
      goToMainPage();
      // פעולות לאחר הרישום המוצלח, למשל ניתוב לדף אחר
    } catch (error) {
      console.error("Register failed", error);
      alert("Failed to register user");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="close-icon">
        <CloseIcon onClick={onClickClose} />
      </div>
      <h3 className="title">Register</h3>

      <div className="image-box">
        <div
          className="icon-select-img"
          onClick={() => imageRef.current?.click()} // Trigger file input on icon click
        >
          <AddImgsIcon />
        </div>

        <input
          {...register("image", { required: true })}
          type="file"
          name="image"
          ref={imageRef}
          style={{ display: "none" }}
          onChange={handleChange}
        />
        {imgSrc && (
          <img
            src={imgSrc}
            alt="Preview"
            style={{
              border: "2px solid #fff",
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        )}
      </div>
      {/* Input fields for user details */}
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
