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
    // minWidth: 750,
  },
});
const PoliceTable = ({ policeList, getPoliceList, handleEditPolice }) => {
  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);

  const handleDeleteLocation = async (id) => {
    let response = await deleteData("police", id);
    if (response?.errorMessage) {
      alert("Something went wrong" + response.errorMessage);
    }
    if (response.success) {
      alert("Police detail is successfully deleted");
      let result = policeList?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
      if (result.length === 1 && policeList.length > 1) {
        setPage((currentPage) => currentPage - 1);
      }
      getPoliceList();
    }
  };

  const handleEditPoliceDetail = async (id) => {
    handleEditPolice(id);
  };
  const onChangeSearch = (e) => {
    setPage((prev) => (prev !== 0 ? 0 : prev));
    let searchTerm = e.target.value;
    if (searchTerm.length === 0) {
      setData(policeList);
    } else {
      if (searchTerm.length >= 3) {
        const res = policeList.filter((obj) =>
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
    setData(policeList);
  }, [policeList]);

  return (
    <div>
      <div>
        <Grid container className={classes.rootSearch}>
          <Grid item md={8}>
            <Title className={classes.title}>Police List</Title>
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
              <TableCell style={{ fontWeight: 600 }}>Police Id</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Username</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Phone</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Password</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Station</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Location Id</TableCell>
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
                        {list.fullName}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" align="justify">
                        {list.username}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" align="justify">
                        {list.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" align="justify">
                        {list.phone}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" align="justify">
                        {list.password}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" align="justify">
                        {list.stationName}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" align="justify">
                        {list.locationId}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <EditIcon
                        color="primary"
                        onClick={() => handleEditPoliceDetail(list.id)}
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
                <TableCell colSpan={10}>Sorry data is not available</TableCell>
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
export default React.memo(PoliceTable);
