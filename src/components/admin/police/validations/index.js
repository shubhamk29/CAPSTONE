import * as yup from "yup";
const policeSchema = () => {
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
    stationName: yup.string().required("Station name is required"),
    locationId: yup
      .string()
      .required("Location is required")
      .test("", "Please select the location", (val) => {
        if (+val === 0) {
          return false;
        } else {
          return true;
        }
      }),
  });
};
export { policeSchema };
