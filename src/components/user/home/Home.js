import React from "react";
import { Container, Paper, Grid } from "@material-ui/core";
import Title from "components/common/Title";
const Home = () => {
  let userId = localStorage.getItem("userId");
  let userFullName = localStorage.getItem("userFullName");
  console.log(userId);
  return (
    <Container maxWidth="md">
      <Paper variant="outlined" style={{ padding: 40, textAlign: "center" }}>
        <Grid container justifyContent="center" style={{ marginBottom: 20 }}>
          <Grid item md={5}>
            <img
              src={require("./images/img-bangaluru.jfif").default}
              alt="img"
              style={{ height: "100%", width: "100%" }}
            />
          </Grid>
        </Grid>

        <Title variant="subtitle1" style={{ fontWeight: "bolder" }}>
          WELCOME TO BENGALURU CRIME AUTHORITY.
        </Title>
        <Title variant="subtitle1" mBottom={10}>
          We provide an efficient, effective, sensitive and impartial law
          enforcement machinery.
        </Title>
        <Title variant="subtitle2">
          <strong>1.</strong> To register a complaint, please click on "register
          complaint" tab on top.
        </Title>

        <Title variant="subtitle2">
          <strong>2.</strong> To view your registered complaints, please click
          on "my complaints" tab on top.
        </Title>
        <Title variant="subtitle1"></Title>
      </Paper>
    </Container>
  );
};

export default Home;
