import React, { useState } from "react";
import { Avatar, Link, Grid, Box, Paper } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";
import useStyles from "components/auth/styles/SignUp";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpSchema } from "components/auth/validations";

import Title from "components/common/Title";
import InputField from "components/common/InputField";
import Button from "components/common/Button";

import { useHistory } from "react-router-dom";

import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "config/Firebase";
import { signUpUser } from "api";

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  // Inputs
  const [showVerfiyCodeInput, setShowVerfiyCodeInput] = useState(false);
  const [final, setFinal] = useState();
  const [userId, setUserId] = useState(null);
  const [showRecaptcha, setShowRecaptcha] = useState(true);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(SignUpSchema(showVerfiyCodeInput)),
  });

  // Sent OTP
  const sendOTP = () => {
    let phoneNumber = "+91" + getValues("phone");
    if (phoneNumber === "" || phoneNumber.length < 10) return;

    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setFinal(confirmationResult);
        alert("Verification code is sent on your mobile number please check");
        setShowVerfiyCodeInput(true);
        setShowRecaptcha(false);
      })
      .catch((err) => {
        alert(err);
        window.location.reload();
      });
  };
  // Validate OTP
  const validateOtp = () => {
    let OTP = getValues("OTP");
    if (OTP === null) {
      alert("Please enter the OTP that you have received");
      return;
    }
    if (final === null) {
      alert("Something went wrong");
      return;
    }
    final
      .confirm(OTP)
      .then((result) => {
        // success
        if (result.user.uid) {
          alert("Successfully verified, please register to continue");
          setUserId(result.user.uid);
          setShowVerfiyCodeInput(false);
        }
      })
      .catch((err) => {
        alert("Verification code is wrong");
      });
  };

  const onRegisterUser = async (data) => {
    if (userId !== null) {
      let userData = {
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        phone: "+91" + data.phone,
        password: data.password,
        confirmPassword: data.confirmPassword,
        userId: userId,
      };
      let response = await signUpUser("users", userData);
      if (response.id) {
        alert("Successfully register your account please login");
        history.push("/login");
      }
      if (response.errorMessage) {
        alert(response.errorMessage);
      }
    } else {
      try {
        sendOTP();
      } catch (err) {
        alert("Something went wrong, please try again later" + err.message);
      }
    }
  };
  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} variant="outlined">
          <Box mb={4}></Box>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Title variant="h5">Register</Title>
          <form
            className={classes.form}
            onSubmit={handleSubmit(onRegisterUser)}
          >
            <InputField
              variant="outlined"
              size="small"
              fullWidth
              inputLabel="Full Name"
              register={register("fullName")}
              error={errors.fullName}
            />
            <InputField
              variant="outlined"
              size="small"
              fullWidth
              inputLabel="Username"
              register={register("username")}
              error={errors.username}
            />
            <InputField
              variant="outlined"
              size="small"
              fullWidth
              inputLabel="Email Address"
              register={register("email")}
              error={errors.email}
            />
            <InputField
              variant="outlined"
              size="small"
              fullWidth
              id="phone"
              inputLabel="Phone Number"
              register={register("phone")}
              error={errors.phone}
            />
            <div
              id="recaptcha-container"
              style={{
                marginBottom: 8,
                display: showRecaptcha ? "block" : "none",
              }}
            ></div>
            <div style={{ display: showVerfiyCodeInput ? "block" : "none" }}>
              <InputField
                fullWidth
                type="text"
                size="small"
                inputLabel="OTP"
                placeholder={"Enter your OTP"}
                register={register("OTP")}
                error={errors.OTP}
              />
              <Button
                fullWidth
                size="small"
                variant="contained"
                color="secondary"
                mBottom={10}
                onClick={validateOtp}
              >
                Verify
              </Button>
            </div>
            <InputField
              variant="outlined"
              size="small"
              fullWidth
              inputLabel="Password"
              type="password"
              register={register("password")}
              error={errors.password}
            />
            <InputField
              variant="outlined"
              size="small"
              fullWidth
              inputLabel="Repeat Password"
              type="password"
              register={register("confirmPassword")}
              error={errors.confirmPassword}
            />

            <Button type="submit" fullWidth variant="contained" color="primary">
              Register
            </Button>
            <Grid container style={{ marginTop: 5 }}>
              <Grid item>
                <Link
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/login");
                  }}
                  variant="body2"
                >
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </form>
          <Box mb={8}>{/* <Copyright /> */}</Box>
        </Paper>
      </Container>
    </div>
  );
};
export default SignUp;
