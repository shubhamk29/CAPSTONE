import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  makeStyles,
  TablePagination,
  TableFooter,
  Container,
  Grid,
  Select,
  MenuItem,
  OutlinedInput,
} from "@material-ui/core";
import InputField from "components/common/InputField";
import Title from "components/common/Title";
import { getSingleData, getAllDataByColName, updateData } from "api";

const useStyles = makeStyles({
  table: {
    minWidth: 750,
  },
  smallSelectInput: {
    padding: "10.5px 14px",
  },
});
const ReceivedComplaints = () => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [page, setPage] = useState(0);
  const [complaints, setComplaints] = useState([]);

  const onChangeSearch = (e) => {
    setPage((prev) => (prev !== 0 ? 0 : prev));
    let searchTerm = e.target.value;
    if (searchTerm.length === 0) {
      getComplaintsByPoliceId();
    } else {
      if (searchTerm.length >= 3) {
        const res = complaints.filter((obj) =>
          Object.values(obj).some((val) =>
            val.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
        setComplaints(res);
      }
    }
  };
  const getComplaintsByPoliceId = async () => {
    let policeId = localStorage.getItem("policeId");
    let response = await getAllDataByColName(
      "complaints",
      "policeId",
      policeId,
      "Sorry complaints are not registered yet"
    );
    if (response.errorMessage) {
      if (response.errorMessage !== "Sorry complaints are not registered yet") {
        alert(response.errorMessage);
      }
    } else {
      for (let i = 0; i < response.length; i++) {
        let res = await getSingleData("cityLocation", response[i].locationId);
        response[i].locationName = res.locationName;
        let resPolice = await getSingleData("police", response[i].policeId);
        response[i].stationName = resPolice.stationName;
      }
      setComplaints(response);
    }
  };
  const onChangeStatus = async (id, fullName, email, status) => {
    console.log(fullName);
    const r = window.confirm("Do you really want process their complaint");

    if (r === true) {
      let message;
      if (status !== 0) {
        if (status === 1) {
          message = `Hi ${fullName} we are just processing your request, we hope that your complaint will be solved`;
        }
        if (status === 2) {
          message = `Hi ${fullName} we are pleased to inform that, your complaint has been re-solved`;
        }
        if (status === 3) {
          message = `Hi ${fullName} we are informing you that our complaint has been rejected`;
        }
        await onEditStatus(id, fullName, email, message, status);
      } else {
        alert("Hi, you can't set application status as a received");
      }
    } else {
      alert("Cancelled");
    }
  };

  const onEditStatus = async (id, fullName, email, message, status) => {
    let response = await updateData("complaints", id, { status });
    if (response?.errorMessage) {
      alert(response?.errorMessage);
    } else {
      if (response.success) {
        getComplaintsByPoliceId();
        let policeFullName = localStorage.getItem("policeFullName");
        const templateParams = {
          userFullName: fullName,
          policeFullName: policeFullName,
          userEmail: email,
          message: message,
          dashboardLink:
            "https://bengaluru-crime-authority-app.herokuapp.com/login",
        };
        let response = await emailjs.send(
          "service_frzhp2e",
          "template_cpr5bku",
          templateParams,
          "user_KABEgrmocz13tmxIMJi3Z"
        );
        // if(response.sta)
        console.log(response);
        alert("Status is updated successfully");
      }
    }
  };
  const onPageChange = (event, nextPage) => {
    setPage(nextPage);
  };
  const onRowsPerPageChange = (e) => {
    setRowsPerPage(e.target.value);
  };

  useEffect(() => {
    //setcomplaints(complaints);
    getComplaintsByPoliceId();
  }, []);

  return (
    <Container maxWidth="lg" style={{ marginTop: 20 }}>
      <Paper variant="outlined" style={{ padding: 20 }}>
        <Grid container className={classes.rootSearch}>
          <Grid item md={8}>
            <Title className={classes.title}>Received Complaints</Title>
          </Grid>
          <Grid item xs={12} md={4}>
            <InputField
              size="small"
              placeholder="Search...."
              onChange={onChangeSearch}
            />
          </Grid>
        </Grid>
      </Paper>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 600 }}>Complaint Id</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Full Name</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Contact Number</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Aadhar Number</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Location</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Station</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Description</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {complaints.length > 0 ? (
              complaints
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((list, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Typography variant="body2">{list.id}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{list.fullName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{list.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{list.phone}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {list.aadharNumber}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">
                        {list.locationName}
                        {/* {getLocation(list.locationId)} */}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">
                        {list.stationName}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">
                        {list.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <TableCell component="div">
                        <div>
                          <Select
                            value={list.status}
                            // onChange={handleChange}
                            label="Status"
                            variant="outlined"
                            onChange={(e) =>
                              onChangeStatus(
                                list.id,
                                list.fullName,
                                list.email,
                                e.target.value
                              )
                            }
                            input={
                              <OutlinedInput
                                classes={{ input: classes.smallSelectInput }}
                              />
                            }
                          >
                            <MenuItem value={0}>Received</MenuItem>
                            <MenuItem value={1}>Process</MenuItem>
                            <MenuItem value={2}>Resolve</MenuItem>
                            <MenuItem value={3}>Reject</MenuItem>
                          </Select>
                        </div>
                      </TableCell>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={10}>Sorry dat is not available</TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                page={page}
                rowsPerPageOptions={[
                  3,
                  10,
                  25,
                  {
                    label: "All",
                    value: complaints.length ? complaints.length : 1,
                  },
                ]}
                count={complaints.length}
                rowsPerPage={rowsPerPage}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};
export default React.memo(ReceivedComplaints);
