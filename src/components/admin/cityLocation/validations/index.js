import * as yup from "yup";
const locationSchema = () => {
  return yup.object().shape({
    cityId: yup
      .string()
      .required("City is required")
      .test("", "Please select the city", (val) => {
        if (+val === 0) {
          return false;
        } else {
          return true;
        }
      }),
    locationName: yup.string().required("Location name is required"),
  });
};
export { locationSchema };
