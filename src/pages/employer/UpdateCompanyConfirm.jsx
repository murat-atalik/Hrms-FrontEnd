import React, { useEffect, useState } from "react";

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

import UpdateCompanyService from "../../services/updateCompanyService";
import StaffSideMenu from "../staff/StaffSideMenu";
import StaffSideMenuButton from "../staff/StaffSideMenuButton";
import { Button } from "@material-ui/core";
import { useAlert } from "react-alert";
export default function UpdateCompanyConfirm() {
  const alert = useAlert();
  let updateCompanyService = new UpdateCompanyService();
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    updateCompanyService
      .getAll()
      .then((result) => setCompanies(result.data.data));
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, companies.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUpdate = (id) => {
    updateCompanyService
      .update(id)
      .then(() =>
        updateCompanyService
          .getAll()
          .then((result) => setCompanies(result.data.data))
      );
    alert.success("GÜNCELLENDİ");
  };
  const handleDelete = (id) => {
    updateCompanyService
      .delete(id)
      .then(() =>
        updateCompanyService
          .getAll()
          .then((result) => setCompanies(result.data.data))
      );
    alert.error("SİLİNDİ");
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    container: {
      minHeight: 600,
    },
    sideMenu: {
      padding: theme.spacing(1),
      [theme.breakpoints.down("lg")]: {
        display: "none",
      },
      [theme.breakpoints.up("lg")]: {
        display: "block",
      },
    },
    sideMenuOnlyButton: {
      padding: theme.spacing(1),
      [theme.breakpoints.down("lg")]: {
        display: "block",
      },
      [theme.breakpoints.up("lg")]: {
        display: "none",
      },
    },
  }));
  const classes = useStyles();
  return (
    <Grid
      space={2}
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
    >
      <div className={classes.sideMenu}>
        <Grid item lg={2}>
          <StaffSideMenu />
        </Grid>
      </div>
      <div className={classes.sideMenuOnlyButton}>
        <Grid item xs={1}>
          <StaffSideMenuButton />
        </Grid>
      </div>
      <Grid item xs={10} lg={8}>
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
