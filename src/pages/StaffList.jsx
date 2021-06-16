import React, { useState, useEffect } from "react";

import StaffService from "../services/staffService";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";

export default function StaffList() {
  const [staffs, setStaffs] = useState([]);
  useEffect(() => {
    let staffService = new StaffService();
    staffService.getStaffs().then((result) => setStaffs(result.data.data));
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, staffs.length - page * rowsPerPage);

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
      maxHeight: 600,
    },
  });
  const classes = useStyles();
  return (
    <div>
      <TableContainer component={Paper} className={classes.container}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Adı</TableCell>
              <TableCell>Soyadı</TableCell>
              <TableCell>E-Posta adresi</TableCell>
              <TableCell>Yetki Seviyesi</TableCell>
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
                    >
                      {staff.email}
                    </a>
                  </TableCell>
                  <TableCell>{staff.role?.roleName}</TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Paper>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          component="div"
          count={staffs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
