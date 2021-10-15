import * as yup from "yup";
const citySchema = () => {
  return yup.object().shape({
    cityName: yup.string().required("City name is required"),
  });
};
export { citySchema };
