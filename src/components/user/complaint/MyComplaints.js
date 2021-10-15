import React, { useState, useEffect } from "react";
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
} from "@material-ui/core";
import InputField from "components/common/InputField";
import Button from "components/common/Button";
import Title from "components/common/Title";
import { getSingleData, getAllDataByColName } from "api";
import { cyan, green, red, teal } from "colors";

const useStyles = makeStyles({
  table: {
    minWidth: 750,
  },
});
const MyComplaints = () => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [page, setPage] = useState(0);
  const [complaints, setComplaints] = useState([]);

  const onChangeSearch = (e) => {
    setPage((prev) => (prev !== 0 ? 0 : prev));
    let searchTerm = e.target.value;
    if (searchTerm.length === 0) {
      getComplaintsByUserId();
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
  const getComplaintsByUserId = async () => {
    let userId = localStorage.getItem("userId");

    let response = await getAllDataByColName(
      "complaints",
      "userId",
      userId,
      "Sorry complaints are not register yet"
    );
    if (response.errorMessage) {
      if (response.errorMessage !== "Sorry complaints are not register yet") {
        alert(response.errorMessage);
      }
    } else {
      for (let i = 0; i < response.length; i++) {
        let res = await getSingleData("cityLocation", response[i].locationId);
        response[i].locationName = res.locationName;
        let resPolice = await getSingleData("police", response[i].policeId);
        response[i].officerName = resPolice.fullName;
        response[i].stationName = resPolice.stationName;
      }
      setComplaints(response);
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
    getComplaintsByUserId();
  }, []);

  return (
    <Container maxWidth="lg" style={{ marginTop: 20 }}>
      <Paper variant="outlined" style={{ padding: 20 }}>
        <Grid container className={classes.rootSearch}>
          <Grid item md={8}>
            <Title className={classes.title}>My Complaints</Title>
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
              <TableCell style={{ fontWeight: 600 }}>Officer Name</TableCell>
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
                        {list.officerName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {list.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {list.status === 0 ? (
                        <Button style={{ backgroundColor: cyan }}>
                          Received
                        </Button>
                      ) : list.status === 1 ? (
                        <Button style={{ backgroundColor: teal }}>
                          Processing
                        </Button>
                      ) : list.status === 2 ? (
                        <Button style={{ backgroundColor: green }}>
                          Resolved
                        </Button>
                      ) : (
                        list.status === 3 && (
                          <Button style={{ backgroundColor: red }}>
                            Rejected
                          </Button>
                        )
                      )}
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
export default React.memo(MyComplaints);
