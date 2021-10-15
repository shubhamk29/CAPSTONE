import AdminLayout from "layouts/admin/Layout";
import PoliceLayout from "layouts/police/Layout";
import React from "react";
import { Container, Paper } from "@material-ui/core";
import UserLayout from "layouts/user/Layout";
import { useHistory } from "react-router-dom";
import Title from "components/common/Title";
import Button from "components/common/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const PageNotFoundError = ({ onClickHandle }) => {
  return (
    <Container maxWidth="sm" style={{ marginTop: 20 }}>
      <Paper variant="outlined" style={{ padding: 20 }}>
        <Title mBottom={5}>
          Sorry no page is found that you are looking for
        </Title>
        <Button
          color="secondary"
          size="small"
          onClick={onClickHandle}
          Icon={ArrowBackIcon}
        >
          Go Back
        </Button>
      </Paper>
    </Container>
  );
};

const PageNotFound = () => {
  let history = useHistory();
  const urlPath = window.location.pathname;
  urlPath.match("/admin/")
    ? localStorage.setItem("whose", "admin")
    : urlPath.match("/police/")
    ? localStorage.setItem("whose", "police")
    : localStorage.setItem("whose", "user");

  return (
    <div>
      {localStorage.getItem("whose") === "user" ? (
        <UserLayout>
          <PageNotFoundError onClickHandle={() => history.goBack()} />
        </UserLayout>
      ) : localStorage.getItem("whose") === "police" ? (
        <PoliceLayout>
          <PageNotFoundError onClickHandle={() => history.goBack()} />
        </PoliceLayout>
      ) : (
        localStorage.getItem("whose") === "admin" && (
          <AdminLayout>
            <PageNotFoundError onClickHandle={() => history.goBack()} />
          </AdminLayout>
        )
      )}
    </div>
  );
};
export default PageNotFound;
