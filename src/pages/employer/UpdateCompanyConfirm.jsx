import React, { useEffect, useState } from "react";
import EmployerService from "../../services/employerService";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Grid,
  makeStyles,
} from "@material-ui/core";

import { GiConfirmed } from "react-icons/gi";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

import UpdateCompanyService from "../../services/updateCompanyService";
import StaffSideMenu from "../staff/StaffSideMenu";
import { Button } from "@material-ui/core";

export default function UpdateCompanyConfirm() {
  let updateCompanyService = new UpdateCompanyService();
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    updateCompanyService
      .getAll()
      .then((result) => setCompanies(result.data.data));
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, companies.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      minHeight: 600,
    },
  });
  const handleUpdate = (id) => {
    updateCompanyService
      .update(id)
      .then((result) => alert(result.data.message));
  };
  const handleDelete = (id) => {
    updateCompanyService
      .delete(id)
      .then((result) => alert(result.data.message));
  };
  const classes = useStyles();
  return (
    <Grid
      space={1}
      container
      direction="row"
      justify="space-between"
      alignItems="flex-start"
    >
      <Grid item xs={2}>
        <StaffSideMenu />
      </Grid>
      <Grid item xs={9}>
        <TableContainer component={Paper} className={classes.container}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Eski Şirket Adı</TableCell>
                <TableCell>Yeni Şirket Adı</TableCell>
                <TableCell>Eski Websitesi</TableCell>
                <TableCell>Yeni Websitesi</TableCell>

                <TableCell>Onayla</TableCell>
                <TableCell>Sil</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? companies.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : companies
              ).map((company) => {
                return (
                  <TableRow hover key={company.id}>
                    <TableCell>{company.oldCompanyName}</TableCell>
                    <TableCell>{company.newCompanyName}</TableCell>

                    <TableCell>
                      <a
                        href={"https://" + company.oldWebAddress}
                        target={"_blank"}
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        {company.oldWebAddress}
                      </a>
                    </TableCell>

                    <TableCell>
                      <a
                        href={"https://" + company.newWebAddress}
                        target={"_blank"}
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        {company.newWebAddress}
                      </a>
                    </TableCell>

                    <TableCell>
                      <Button onClick={() => handleUpdate(company.id)}>
                        <GiConfirmed color="green" size="2em" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleDelete(company.id)}>
                        <MdDeleteForever color="red" size="2em" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {/* {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )} */}
            </TableBody>
          </Table>
        </TableContainer>
        <Paper>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50, 100, { label: "All", value: -1 }]}
            component="div"
            count={companies.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: { "aria-label": "rows per page" },
              native: true,
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
