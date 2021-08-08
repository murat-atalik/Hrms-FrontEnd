import React, { useEffect, useState } from "react";
import EmployerService from "../../services/employerService";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { Button, Grid } from "@material-ui/core";
import SideMenu from "../../layouts/SideMenu";
import SideMenuOnlyButton from "../../layouts/SideMenuOnlyButton";
import { AiFillCheckCircle, AiFillDelete } from "react-icons/ai";
import { useAlert } from "react-alert";

import CandidateSideMenu from "../candidate/CandidateSideMenu";
import CandidateSideMenuButton from "../candidate/CandidateSideMenuButton";
import EmployerSideMenu from "../employer/EmployerSideMenu";
import EmployerSideMenuButton from "../employer/EmployerSideMenuButton";
import StaffSideMenu from "../staff/StaffSideMenu";
import StaffSideMenuButton from "../staff/StaffSideMenuButton";
import { useSelector } from "react-redux";

export default function EmployerConfirm() {
  const { authItem } = useSelector((state) => state.auth);

  const alert = useAlert();
  const employerService = new EmployerService();
  const [employers, setEmployers] = useState([]);
  useEffect(() => {
    employerService
      .getUnConfirmed()
      .then((result) => setEmployers(result.data.data));
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleConfirm = (id) => {
    employerService.changeConfirmStatus(id).then((result) => {
      result.data.success
        ? alert.success("İŞ VEREN ONAYLANDI")
        : alert.error("HATA");
      employerService
        .getUnConfirmed()
        .then((result) => setEmployers(result.data.data));
    });
  };
  const handleDelete = (id) => {
    console.log(id);
    employerService.delete(id).then((result) => {
      result.data.success
        ? alert.success("İŞ VEREN SİLİNDİ")
        : alert.error("HATA");
      employerService
        .getUnConfirmed()
        .then((result) => setEmployers(result.data.data));
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
          {authItem[0].loggedIn && authItem[0].user.userType === "staff" ? (
            <StaffSideMenu />
          ) : authItem[0].loggedIn &&
            authItem[0].user.userType === "employer" ? (
            <EmployerSideMenu />
          ) : authItem[0].loggedIn &&
            authItem[0].user.userType === "candidate" ? (
            <CandidateSideMenu />
          ) : (
            <SideMenu />
          )}
        </Grid>
      </div>
      <div className={classes.sideMenuOnlyButton}>
        <Grid item xs={1}>
          {authItem[0].loggedIn && authItem[0].user.userType === "staff" ? (
            <StaffSideMenuButton />
          ) : authItem[0].loggedIn &&
            authItem[0].user.userType === "employer" ? (
            <EmployerSideMenuButton />
          ) : authItem[0].loggedIn &&
            authItem[0].user.userType === "candidate" ? (
            <CandidateSideMenuButton />
          ) : (
            <SideMenuOnlyButton />
          )}
        </Grid>
      </div>
      <Grid item xs={10} lg={8}>
        <TableContainer component={Paper} className={classes.container}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Şirket Adı</TableCell>
                <TableCell>Websitesi</TableCell>
                <TableCell>Mail adresi</TableCell>
                <TableCell>Telefon numarası</TableCell>
                <TableCell>Onayla</TableCell>
                <TableCell>Sil</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? employers.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : employers
              ).map((employer) => {
                return (
                  <TableRow hover key={employer.id}>
                    <TableCell>{employer.company?.companyName}</TableCell>
                    <TableCell>
                      <a
                        href={"https://" + employer.company?.webAddress}
                        target={"_blank"}
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        {employer.company?.webAddress}
                      </a>
                    </TableCell>
                    <TableCell>
                      <a
                        href={"mailto:" + employer.email}
                        target={"_blank"}
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        {employer.email}
                      </a>
                    </TableCell>
                    <TableCell>{employer.phoneNumber}</TableCell>

                    <TableCell>
                      <Button
                        onClick={() => {
                          handleConfirm(employer.id);
                        }}
                      >
                        <AiFillCheckCircle color="black" size="2em" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          handleDelete(employer.id);
                        }}
                      >
                        <AiFillDelete color="black" size="2em" />
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
            count={employers.length}
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
