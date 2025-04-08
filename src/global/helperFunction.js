import * as Yup from "yup";
export const yupSchema = (action) => {
  switch (action) {
    case "signup":
      return Yup.object().shape({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
      });

    case "signin":
      return Yup.object().shape({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });

    default:
      break;
  }
};
export const authFormArray = [
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
  { name: "confirmPassword", label: "Confirm Password", type: "password" },
];
export const getInitValues = (action) => {
  switch (action) {
    case "/auth/signup":
      return {
        email: "",
        password: "",
        confirmPassword: "",
      };

    case "/auth/signin":
      return {
        email: "",
        password: "",
      };

    default:
      break;
  }
};
