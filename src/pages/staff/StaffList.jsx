import React, { useState, useEffect } from "react";

import StaffService from "../../services/staffService";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Grid, makeStyles } from "@material-ui/core";

import { FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import StaffSideMenu from "../staff/StaffSideMenu";
import StaffSideMenuButton from "../staff/StaffSideMenuButton";
export default function StaffList() {
  const [staffs, setStaffs] = useState([]);
  useEffect(() => {
    let staffService = new StaffService();
    staffService.getStaffs().then((result) => setStaffs(result.data.data));
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, staffs.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
                <TableCell>Adı</TableCell>
                <TableCell>Soyadı</TableCell>
                <TableCell>E-Posta adresi</TableCell>
                <TableCell>Yetki Seviyesi</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? staffs.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : staffs
              ).map((staff) => {
                return (
                  <TableRow key={staff.id}>
                    <TableCell>{staff.firstName}</TableCell>
                    <TableCell>{staff.lastName}</TableCell>
                    <TableCell>
                      <a
                        href={"mailto:" + staff.email}
                        target={"_blank"}
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        {staff.email}
                      </a>
                    </TableCell>
                    <TableCell>{staff.role?.roleName}</TableCell>
                    <TableCell>
                      <Link to={`/staff/update/${staff.id}`}>
                        <FaUserEdit color="black" size="3em" />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
              {/* {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )} */}
            </TableBody>
          </Table>
        </TableContainer>
        <Paper>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50, 100, { label: "All", value: -1 }]}
            component="div"
            count={staffs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
