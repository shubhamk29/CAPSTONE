/* eslint-disable react-hooks/exhaustive-deps */
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
  Grid,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Title from "components/common/Title";
import InputField from "components/common/InputField";

import { deleteData } from "api";

const useStyles = makeStyles({
  table: {
    minWidth: 750,
  },
});
const LocationTable = ({
  locationsList,
  getLocationsList,
  handleEditLocation,
}) => {
  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);

  const handleDeleteLocation = async (id) => {
    let response = await deleteData("cityLocation", id);
    if (response?.errorMessage) {
      alert("Something went wrong" + response.errorMessage);
    }
    if (response.success) {
      alert("Location is successfully deleted");
      let result = locationsList?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
      if (result.length === 1 && locationsList.length > 1) {
        setPage((currentPage) => currentPage - 1);
      }
      getLocationsList();
    }
  };

  const handleEditLocationDetail = async (id) => {
    handleEditLocation(id);
  };
  const onChangeSearch = (e) => {
    setPage((prev) => (prev !== 0 ? 0 : prev));
    let searchTerm = e.target.value;
    if (searchTerm.length === 0) {
      setData(locationsList);
    } else {
      if (searchTerm.length >= 3) {
        const res = locationsList.filter((obj) =>
          Object.values(obj).some((val) =>
            val.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
        setData(res);
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
    setData(locationsList);
  }, [locationsList]);

  return (
    <div>
      <div>
        <Grid container className={classes.rootSearch}>
          <Grid item md={8}>
            <Title className={classes.title}>Location List</Title>
          </Grid>
          <Grid item xs={12} md={4}>
            <InputField
              size="small"
              placeholder="Search...."
              onChange={onChangeSearch}
            />
          </Grid>
        </Grid>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 600 }}>Location Id</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Location Name</TableCell>
              <TableCell style={{ fontWeight: 600 }}>City Id</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Edit</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((list, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Typography variant="body2" align="justify">
                        {list.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" align="justify">
                        {list.locationName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" align="justify">
                        {list.cityId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <EditIcon
                        color="primary"
                        onClick={() => handleEditLocationDetail(list.id)}
                        style={{ cursor: "hand" }}
                      />
                    </TableCell>
                    <TableCell>
                      <DeleteIcon
                        color="secondary"
                        onClick={() => handleDeleteLocation(list.id)}
                        style={{ cursor: "hand" }}
                      />
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>Sorry data is not available</TableCell>
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
                    value: data.length ? data.length : 1,
                  },
                ]}
                count={data.length}
                rowsPerPage={rowsPerPage}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};
export default React.memo(LocationTable);
