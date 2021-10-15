import React, { useState, useEffect } from "react";
import { Box, Paper, Container, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import useStyles from "components/admin/city/styles/AddOrEditCity";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { citySchema } from "components/admin/city/validations";
import Title from "components/common/Title";
import InputField from "components/common/InputField";
import Button from "components/common/Button";
import CityTable from "components/admin/city/CityTable";
import { addData, getAllData, getSingleData, updateData } from "api";
const AddOrEditCity = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(citySchema()),
  });
  const classes = useStyles();

  const [editedId, setEditedId] = useState();
  const [citiesList, setCitiesList] = useState([]);

  //Get Cities for refreshing
  const getCitiesList = async () => {
    gettingCityData();
  };
  const gettingCityData = async () => {
    let response = await getAllData("cities");
    if (response.errorMessage) {
      alert("Something went wrong while fetching the data");
    } else {
      setCitiesList(response);
    }
  };
  const onAddCity = async (data) => {
    let cityData = {
      cityName: data.cityName,
    };
    let response = await addData("cities", cityData);
    if (response.id) {
      alert("City is successfully added");
      gettingCityData();
      setValue("cityName", "");
    }
    if (response.errorMessage) {
      alert("Something went wrong" + response.errorMessage);
    }
  };

  //Edit City
  const handleEditCity = async (id) => {
    let response = await getSingleData("cities", id);
    if (response?.errorMessage) {
      alert(response?.errorMessage);
    } else {
      setValue("cityName", response.cityName);
      setEditedId(response.id);
    }
  };

  const onEditCity = async (data) => {
    let response = await updateData("cities", editedId, data);
    if (response?.errorMessage) {
      alert(response?.errorMessage);
    } else {
      if (response.success) {
        setEditedId("");
        setValue("cityName", "");
        alert(response.success);
        gettingCityData();
      }
    }
  };

  useEffect(() => {
    gettingCityData();
  }, []);
  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} variant="outlined">
          <Box mb={2}></Box>
          <Title variant="h5">{editedId ? "Edit City" : "Add City"}</Title>
          <form
            className={classes.form}
            onSubmit={
              editedId ? handleSubmit(onEditCity) : handleSubmit(onAddCity)
            }
          >
            <InputField
              variant="outlined"
              size="small"
              fullWidth
              label="City Name"
              placeholder="Enter city name"
              register={register("cityName")}
              error={errors.cityName}
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
            <CityTable
              citiesList={citiesList}
              getCitiesList={getCitiesList}
              handleEditCity={handleEditCity}
            />
          </Paper>
        </Grid>
      </Container>
    </div>
  );
};

export default AddOrEditCity;
