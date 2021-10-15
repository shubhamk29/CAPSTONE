import * as yup from "yup";
const complaintSchema = () => {
  return yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
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

    aadharNumber: yup
      .string()
      .test("required", "Aadhar number is required", (val) => {
        if (val.length === 0) {
          return false;
        } else {
          return true;
        }
      })
      .test("len", "Must be exactly 12 characters", (val) => val.length === 12)
      .test("checkNumer", "The number's are allowed only", (value) => {
        let isNumber = isNaN(value);
        if (isNumber === true) {
          return false;
        } else {
          return true;
        }
      }),
    description: yup
      .mixed()
      .test("required", "Description is required", (value, context) => {
        if (value.length > 0) {
          return true;
        } else {
          return false;
        }
      }),
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

    policeId: yup
      .string()
      .required("Station is required")
      .test("", "Please select the station", (val) => {
        if (+val === 0) {
          return false;
        } else {
          return true;
        }
      }),
  });
};
export { complaintSchema };
