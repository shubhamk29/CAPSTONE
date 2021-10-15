import React, { useState, useEffect } from "react";
import { Box, Paper, Container, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import useStyles from "components/admin/cityLocation/styles/AddOrEditLocation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { locationSchema } from "components/admin/cityLocation/validations";
import Title from "components/common/Title";
import InputField from "components/common/InputField";
import InputSelect from "components/common/InputSelect";
import Button from "components/common/Button";

import LocationTable from "components/admin/cityLocation/LocationTable";
import { addData, getAllData, getSingleData, updateData } from "api";
const AddOrEditLocation = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(locationSchema()),
  });
  const classes = useStyles();

  const [editedId, setEditedId] = useState();
  const [locationsList, setLocationsList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [cityId, setCityId] = useState("0");

  let optionsKeys = ["id", "cityName"];
  //Get Loaction for refreshing
  const getLocationsList = async () => {
    gettingLocationData();
  };
  const gettingLocationData = async () => {
    let response = await getAllData("cityLocation");
    if (response.errorMessage) {
      alert("Something went wrong while fetching the data");
    } else {
      setLocationsList(response);
    }
  };
  const gettingCityData = async () => {
    let response = await getAllData("cities");
    if (response.errorMessage) {
      alert("Something went wrong while fetching the data");
    } else {
      setCitiesList(response);
    }
  };

  const onAddLocation = async (data) => {
    let locationData = {
      locationName: data.locationName,
      cityId: data.cityId,
    };
    let response = await addData("cityLocation", locationData);
    if (response.id) {
      alert("Location is successfully added");
      gettingLocationData();
      setValue("locationName", "");
      setValue("cityId", "0");
      setCityId("0");
    }
    if (response.errorMessage) {
      alert("Something went wrong" + response.errorMessage);
    }
  };

  //Edit Location
  const handleEditLocation = async (id) => {
    let response = await getSingleData("cityLocation", id);
    if (response?.errorMessage) {
      alert(response?.errorMessage);
    } else {
      setValue("locationName", response.locationName);
      setValue("cityId", response.cityId);
      setCityId(response.cityId);
      setEditedId(response.id);
    }
  };

  const onEditLocation = async (data) => {
    let result = {
      locationName: data.locationName,
      cityId: data.cityId,
    };
    let response = await updateData("cityLocation", editedId, result);
    if (response?.errorMessage) {
      alert(response?.errorMessage);
    } else {
      if (response.success) {
        setEditedId("");
        setValue("locationName", "");
        setValue("cityId", "0");
        setCityId("0");
        alert(response.success);
        gettingLocationData();
      }
    }
  };
  useEffect(() => {
    gettingCityData();
    gettingLocationData();
  }, []);
  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} variant="outlined">
          <Box mb={2}></Box>
          <Title variant="h5">
            {editedId ? "Edit Location" : "Add Location"}
          </Title>
          <form
            className={classes.form}
            onSubmit={
              editedId
                ? handleSubmit(onEditLocation)
                : handleSubmit(onAddLocation)
            }
          >
            <InputField
              variant="outlined"
              size="small"
              fullWidth
              label="Location Name"
              placeholder="Enter location name"
              register={register("locationName")}
              error={errors.locationName}
            />
            <InputSelect
              size="small"
              label="Select City"
              options={citiesList}
              optionsKeys={optionsKeys}
              dummyOptionLabel="City"
              register={register("cityId")}
              error={errors.cityId}
              value={cityId}
              onChange={(e) => setCityId(e.target.value)}
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
            <LocationTable
              locationsList={locationsList}
              getLocationsList={getLocationsList}
              handleEditLocation={handleEditLocation}
            />
          </Paper>
        </Grid>
      </Container>
    </div>
  );
};

export default AddOrEditLocation;
