import React, { useEffect, useState } from "react";
import EmployerService from "../services/employerService";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { CgSearchLoading } from "react-icons/cg";

export default function EmployeeList() {
  const [employers, setEmployers] = useState([]);
  useEffect(() => {
    let employerService = new EmployerService();
    employerService
      .getEmployer()
      .then((result) => setEmployers(result.data.data));
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, employers.length - page * rowsPerPage);

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
              <TableCell>Şirket Adı</TableCell>
              <TableCell>Websitesi</TableCell>
              <TableCell>Mail adresi</TableCell>
              <TableCell>Telefon numarası</TableCell>
              <TableCell>İncele</TableCell>
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
                    >
                      {employer.company?.webAddress}
                    </a>
                  </TableCell>
                  <TableCell>
                    <a
                      href={"mailto:" + employer.email}
                      target={"_blank"}
                      rel="noopener noreferrer"
                    >
                      {employer.email}
                    </a>
                  </TableCell>
                  <TableCell>{employer.phoneNumber}</TableCell>
                  <TableCell>
                    <a
                      href={"https://www.youtube.com"}
                      target={"_blank"}
                      rel="noopener noreferrer"
                    >
                      <CgSearchLoading color="black" size="3em" />
                    </a>
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Paper>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
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
    </div>
  );
}
