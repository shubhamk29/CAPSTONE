import React, { useEffect, useState, useRef } from "react";
import { Avatar, Link, Grid, Box, Paper } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";
import useStyles from "components/auth/styles/Login";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "components/auth/validations";

import Title from "components/common/Title";
import InputField from "components/common/InputField";
import InputSelect from "components/common/InputSelect";
import Button from "components/common/Button";

import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import { loginUser } from "api";
const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [token, setToken] = useState("");
  const [roles, setRoles] = useState([
    {
      roleId: "admin",
      roleName: "admin",
    },
    {
      roleId: "police",
      roleName: "police",
    },
    {
      roleId: "user",
      roleName: "user",
    },
  ]);

  let optionsKeys = ["roleId", "roleName"];
  const refCaptcha = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(LoginSchema()),
  });

  //check user/police/admin is login or not
  localStorage.getItem("is-admin-login") && history.push("/admin/dashboard");
  localStorage.getItem("is-police-login") &&
    history.push("/police/user/complaints");
  localStorage.getItem("is-user-login") && history.push("/");

  const onLoginUser = async (data) => {
    if (!token) {
      alert("Please verify that you are human");
    } else {
      let response = await loginUser(data.username, data.password, data.roleId);
      if (response.errorMessage) {
        console.log("Error");
        alert(response.errorMessage);
      } else {
        if (response.docSnap.docs.length === 1) {
          alert("Successfully Login");
          if (response.role === "admin") {
            localStorage.setItem("is-admin-login", "true");
            let adminData = response.docSnap.docs.map((doc) => {
              const obj = doc.data();
              obj.id = doc.id;
              return obj;
            })[0];
            localStorage.setItem("adminFullName", adminData.fullName);
            history.push("/admin/dashboard");
          }
          if (response.role === "police") {
            let policeData = response.docSnap.docs.map((doc) => {
              const obj = doc.data();
              obj.id = doc.id;
              return obj;
            })[0];
            localStorage.setItem("is-police-login", "true");
            localStorage.setItem("policeId", policeData.id);
            localStorage.setItem("policeFullName", policeData.fullName);
            history.push("/police/user/complaints");
          }
          if (response.role === "user") {
            let userData = response.docSnap.docs.map((doc) => {
              const obj = doc.data();
              obj.id = doc.id;
              return obj;
            })[0];
            localStorage.setItem("is-user-login", "true");
            localStorage.setItem("userId", userData.id);
            localStorage.setItem("userFullName", userData.fullName);
            history.push("/");
          }
          setToken("");
          refCaptcha.current = null;
        }
        if (response.docSnap.docs.length === 0) {
          alert("Username or password is wrong");
        }
      }
    }
  };

  const onChangeReCAPTCHA = (value) => {
    setToken(value);
  };
  useEffect(() => {}, []);
  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} variant="outlined">
          <Box mb={4}></Box>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Title variant="h5">Sign in</Title>
          <form className={classes.form} onSubmit={handleSubmit(onLoginUser)}>
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
              inputLabel="Password"
              type="password"
              register={register("password")}
              error={errors.password}
            />
            <InputSelect
              size="small"
              options={roles}
              optionsKeys={optionsKeys}
              dummyOptionLabel="Select Role"
              register={register("roleId")}
              error={errors.roleId}
            />

            {/* Recaptcha */}

            <div style={{ marginBottom: 8 }}>
              <ReCAPTCHA
                // secrect key
                sitekey="6Lf4McocAAAAAK3DNGUxeaeLPOoYgCmduEpYZXaG"
                //sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" //test secret key
                onChange={onChangeReCAPTCHA}
                ref={refCaptcha}
              />
            </div>

            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign In
            </Button>
            <Grid container style={{ marginTop: 10 }}>
              <Grid item xs></Grid>
              <Grid item>
                <Link
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/register");
                  }}
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
          <Box mb={8}></Box>
        </Paper>
      </Container>
    </div>
  );
};
export default Login;
