import React from "react";
import { Container, Paper } from "@material-ui/core";
import Title from "components/common/Title";
const Dashboard = () => {
  let adminFullName = localStorage.getItem("adminFullName");
  return (
    <Container maxWidth="md">
      <Paper variant="outlined" style={{ padding: 30 }}>
        <Title>Welcome {adminFullName} !!</Title>
        <Title variant="subtitle1">
          We hope you are doing well, Please help us to manage our system !!!
        </Title>
        <Title variant="subtitle1"></Title>
      </Paper>
    </Container>
  );
};

export default Dashboard;
