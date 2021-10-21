import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import emailjs from "emailjs-com";
import { Container, Grid, Paper } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddArrowBack from "@material-ui/icons/ArrowBack";
import Title from "components/common/Title";
import InputField from "components/common/InputField";
import InputSelect from "components/common/InputSelect";
import Button from "components/common/Button";
import { complaintSchema } from "components/user/complaint/validations";
import useStyles from "components/user/complaint/styles/RegisterComplaint";
import {
  addData,
  getAllData,
  getAllDataByColName,
  getSingleData,
  checkDuplicateComplaintsRegistration,
} from "api";
import { useHistory } from "react-router-dom";

const Complaint = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(complaintSchema()),
  });
  const classes = useStyles();
  const history = useHistory();
  let optionsKeys = ["id", "locationName"];
  let optionsKeysForStation = ["id", "stationName"];
  const [locationsList, setLocationsList] = useState([]);
  const [stationList, setStationList] = useState([]);
  const [policeId, setPoliceId] = useState("0");
  const [locationId, setLocationId] = useState("0");

  const gettingLocationsData = async () => {
    let response = await getAllData("cityLocation");
    if (response.errorMessage) {
      alert("Something went wrong while fetching the data");
    } else {
      setLocationsList(response);
    }
  };
  const onChangeLocation = async (e) => {
    setPoliceId("0");
    setLocationId(e.target.value);
    if (+e.target.value !== 0) {
      let response = await getAllDataByColName(
        "police",
        "locationId",
        e.target.value,
        "Sorry Station is not found for this location"
      );
      if (response.errorMessage) {
        alert(response.errorMessage);
        setStationList([]);
        setPoliceId("0");
      } else {
        setStationList(response);
      }
    }
  };
  const onChangeStation = (e) => {
    setPoliceId(e.target.value);
  };
  const onRegisterComplaint = async (data) => {
    let response = await getSingleData("police", data.policeId);
    data.status = 0;
    let userId = localStorage.getItem("userId");
    data.userId = userId;
    let resDuplication = await checkDuplicateComplaintsRegistration(
      userId,
      data.description,
      "duplication"
    );
    if (resDuplication.errorMessage) {
      if (resDuplication.errorMessage !== "duplication") {
        alert(
          "Something went wrong while registration" +
            resDuplication.errorMessage
        );
      }
      if (resDuplication.errorMessage === "duplication") {
        alert(
          "Your registration can't be received because same registraion is already received"
        );
      }
    }
    if (resDuplication.success) {
      let res = await addData("complaints", data);
      if (res.id) {
        const templateParams = {
          userFullName: data.fullName,
          userEmail: data.email,
          userPhone: data.phone,
          userAadharNumber: data.aadharNumber,
          userLocationId: data.locationId,
          userDescription: data.description,
          policeName: response.fullName,
          policeEmailId: response.email,
          dashboardLink:
            "https://bengaluru-crime-authority1.herokuapp.com/login",
        };
        await emailjs.send(
          "service_frzhp2e",
          "template_vqgyfph",
          templateParams,
          "user_KABEgrmocz13tmxIMJi3Z"
        );
        alert(
          "Thanks we have received your complaint, we will contact you as soon as possible"
        );
        reset();
        setPoliceId("0");
        setLocationId("0");
      }
      if (res.errorMessage) {
        alert("Something went wrong while registering your complaint");
      }
    }
  };
  useEffect(() => {
    gettingLocationsData();
  }, []);
  return (
    <div className={classes.root}>
      <Container maxWidth="sm" component={Paper} variant="outlined">
        <Grid container>
          <Title mBottom={16} mTop={16}>
            Register a Complaint
          </Title>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit(onRegisterComplaint)}>
              <Grid item xs={12}>
                <InputField
                  size="small"
                  label="Full Name"
                  placeholder="Enter your full name"
                  register={register("fullName")}
                  error={errors.fullName}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  size="small"
                  label="Email"
                  placeholder="Enter your email"
                  register={register("email")}
                  error={errors.email}
                />
              </Grid>

              <Grid item xs={12}>
                <InputField
                  size="small"
                  label="Contact Number"
                  placeholder="Enter your phone number"
                  register={register("phone")}
                  error={errors.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  size="small"
                  label="Aadhar Number"
                  placeholder="Enter your aadhar number"
                  register={register("aadharNumber")}
                  error={errors.aadharNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <InputSelect
                  size="small"
                  label="Select Location"
                  options={locationsList}
                  optionsKeys={optionsKeys}
                  register={register("locationId")}
                  error={errors.locationId}
                  dummyOptionLabel="Location"
                  onChange={onChangeLocation}
                  value={locationId}
                />
              </Grid>
              <Grid item xs={12}>
                <InputSelect
                  id="station-list"
                  size="small"
                  label="Select Station"
                  options={stationList}
                  optionsKeys={optionsKeysForStation}
                  register={register("policeId")}
                  error={errors.policeId}
                  dummyOptionLabel="Station"
                  value={policeId}
                  onChange={onChangeStation}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  size="small"
                  label="Description"
                  placeholder="Enter your description"
                  register={register("description")}
                  error={errors.description}
                  multiline
                  rows={3}
                />
              </Grid>

              <Grid container>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    mBottom={16}
                    fullWidth={true}
                    Icon={AddIcon}
                  >
                    Register a Complaint
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Grid container justifyContent="space-between">
              <Grid item xs={8} md={9}>
                Wanna change your mind?
              </Grid>
              <Grid item xs={4} md={3}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  mBottom={16}
                  fullWidth={true}
                  Icon={AddArrowBack}
                  onClick={() => history.push("/")}
                >
                  Go Back
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Complaint;
