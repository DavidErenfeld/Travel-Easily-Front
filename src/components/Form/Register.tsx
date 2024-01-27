import "./Form.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  userName: z
    .string()
    .min(2, "Name nust be longer then 2 charectrrs")
    .max(10, "Name nust be less then 10 charectrrs"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long") // אורך מינימלי
    .regex(/[a-z]/, "Password must include a lowercase letter"), // לפחות אות קטנה אחת
});

type FormData = z.infer<typeof schema>;

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (date: FormData) => {
    console.log("On Submit");
    console.log(date);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="title">Register</h3>
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
