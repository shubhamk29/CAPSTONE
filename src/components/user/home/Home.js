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
        <Title variant="subtitle1">
          This portal is an initiative of Government of India to facilitate victims/complainants to report crime complaints online. Complaints reported on this portal are dealt by law enforcement authorities/police based on the information available in the complaints record. It is imperative to provide correct and accurate details while filing complaint for prompt action. Please contact local police in case of an emergency or for reporting crimes .
        </Title>
        <h3>To contact local police dial 100</h3>
        <h3>Please consult our chatbot for further information.</h3>
        <Title variant="subtitle1"></Title>
      </Paper>
    </Container>
  );
};

export default Home;
