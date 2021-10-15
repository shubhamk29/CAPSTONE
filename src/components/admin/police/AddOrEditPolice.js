import React, { useState, useEffect, useRef } from "react";
import { Box, Paper, Container, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import useStyles from "components/admin/police/styles/AddOrEditPolice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { policeSchema } from "components/admin/police/validations";
import Title from "components/common/Title";
import InputField from "components/common/InputField";
import InputSelect from "components/common/InputSelect";
import Button from "components/common/Button";

import PoliceTable from "components/admin/police/PoliceTable";
import { addData, getAllData, getSingleData, updateData } from "api";
const AddOrEditPolice = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(policeSchema()),
  });
  const classes = useStyles();
  const refInput = useRef();
  const [editedId, setEditedId] = useState();
  const [policeList, setPoliceList] = useState([]);
  const [locationsList, setLocationsList] = useState([]);
  const [locationId, setLocationId] = useState("0");

  let optionsKeys = ["id", "locationName"];
  //Get Loaction for refreshing
  const getPoliceList = async () => {
    gettingPoliceData();
  };
  const gettingPoliceData = async () => {
    let response = await getAllData("police");
    if (response.errorMessage) {
      alert("Something went wrong while fetching the data");
    } else {
      setPoliceList(response);
    }
  };
  const gettingLocationsData = async () => {
    let response = await getAllData("cityLocation");
    if (response.errorMessage) {
      alert("Something went wrong while fetching the data");
    } else {
      setLocationsList(response);
    }
  };
  const onAddPolice = async (data) => {
    let response = await addData("police", data);
    if (response.id) {
      alert("Police detail is successfully added");
      gettingPoliceData();
      setValue("fullName", "");
      setValue("username", "");
      setValue("email", "");
      setValue("phone", "");
      setValue("password", "");
      setValue("stationName", "");
      setValue("locationId", "");
      setLocationId("0");
    }
    if (response.errorMessage) {
      alert("Something went wrong" + response.errorMessage);
    }
  };

  //Edit Police
  const handleEditPolice = async (id) => {
    let response = await getSingleData("police", id);
    if (response?.errorMessage) {
      alert(response?.errorMessage);
    } else {
      setValue("fullName", response.fullName);
      setValue("username", response.username);
      setValue("email", response.email);
      setValue("phone", response.phone);
      setValue("password", response.password);
      setValue("stationName", response.stationName);
      setValue("locationId", response.locationId);
      setLocationId(response.locationId);
      setEditedId(response.id);
    }
  };

  const onEditPolice = async (data) => {
    let response = await updateData("police", editedId, data);
    if (response?.errorMessage) {
      alert(response?.errorMessage);
    } else {
      if (response.success) {
        setEditedId("");
        setValue("fullName", "");
        setValue("username", "");
        setValue("email", "");
        setValue("phone", "");
        setValue("password", "");
        setValue("stationName", "");
        setValue("locationId", "");
        setLocationId("0");
        alert(response.success);
        gettingPoliceData();
      }
    }
  };
  useEffect(() => {
    gettingLocationsData();
    gettingPoliceData();
  }, []);
  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} variant="outlined">
          <Box mb={2}></Box>
          <Title variant="h5">
            {editedId ? "Edit Police Detail" : "Add Police Detail"}
          </Title>
          <form
            className={classes.form}
            onSubmit={
              editedId ? handleSubmit(onEditPolice) : handleSubmit(onAddPolice)
            }
          >
            <InputField
              variant="outlined"
              size="small"
              fullWidth
              label="Full Name"
              placeholder="Enter full name"
              register={register("fullName")}
              error={errors.fullName}
              ref={refInput}
            />

            <InputField
              variant="outlined"
              size="small"
              fullWidth
              label="Username"
              placeholder="Enter user name"
              register={register("username")}
              error={errors.username}
            />
            <InputField
              variant="outlined"
              size="small"
              fullWidth
              label="Email Address"
              placeholder="Enter email address"
              register={register("email")}
              error={errors.email}
            />
            <InputField
              variant="outlined"
              size="small"
              fullWidth
              id="phone"
              label="Phone Number"
              placeholder="Enter phone"
              register={register("phone")}
              error={errors.phone}
            />

            <InputField
              variant="outlined"
              size="small"
              fullWidth
              label="Password"
              placeholder="Enter password"
              type="password"
              register={register("password")}
              error={errors.password}
            />
            <InputField
              variant="outlined"
              size="small"
              fullWidth
              label="Station Name"
              placeholder="Enter station name"
              register={register("stationName")}
              error={errors.stationName}
            />

            <InputSelect
              size="small"
              label="Select Location"
              options={locationsList}
              optionsKeys={optionsKeys}
              register={register("locationId")}
              error={errors.locationId}
              dummyOptionLabel="Location"
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              mBottom={20}
              Icon={editedId ? EditIcon : AddIcon}
            >
              {editedId ? "Edit" : "Add"}
            </Button>
          </form>
        </Paper>
      </Container>
      <Container maxWidth="md" style={{ marginTop: 20 }}>
        <Grid item md={12}>
          <Paper style={{ padding: 10 }} variant="outlined">
            <PoliceTable
              policeList={policeList}
              getPoliceList={getPoliceList}
              handleEditPolice={handleEditPolice}
            />
          </Paper>
        </Grid>
      </Container>
    </div>
  );
};

export default AddOrEditPolice;
