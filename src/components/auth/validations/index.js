import * as yup from "yup";
const SignUpSchema = (isOTP) => {
  return yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    username: yup.string().required("Username is required"),
    email: yup
      .string()
      .email("Please enter correct email address")
      .required("Email is required"),
    phone: yup
      .string()
      .test("required", "Phone number is required", (val) => {
        if (val.length === 0) {
          return false;
        } else {
          return true;
        }
      })
      .test("len", "Must be exactly 10 characters", (val) => val.length === 10)
      .test("checkNumer", "The number's are allowed only", (value) => {
        let isNumber = isNaN(value);
        if (isNumber === true) {
          return false;
        } else {
          return true;
        }
      }),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Minium length should be 6 character"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .min(6, "Minium length should be 6 character")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    //OTP: yup.string().required("Code is required"),

    OTP: yup.string().when([], {
      // any condition to remove validation
      is: () => isOTP,
      then: yup
        .string()
        .required("OTP is required")
        .min(6, "Minimum length should be 6 character")
        .max(6, "Maximum length should be 6 character"),
      otherwise: yup.string().notRequired(),
    }),
  });
};
const LoginSchema = () => {
  return yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Minium length should be 6 character"),
    roleId: yup
      .string()
      .required("Role is required")
      .test("", "Please select the role", (val) => {
        if (+val === 0) {
          return false;
        } else {
          return true;
        }
      }),
  });
};
export { LoginSchema, SignUpSchema };
