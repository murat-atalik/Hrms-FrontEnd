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
import JobAdvertisementService from "../services/jobAdvertisementService";

export default function JobAdvertisementList() {
  const [jobAdverts, setJobAdverts] = useState([]);
  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getJobAdvert()
      .then((result) => setJobAdverts(result.data.data));
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, jobAdverts.length - page * rowsPerPage);

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
              <TableCell>Çalışma programı</TableCell>
              <TableCell>Şehir</TableCell>
              <TableCell>Pozisyon</TableCell>
              <TableCell>Çalışma Türü</TableCell>
              <TableCell>Maaş</TableCell>
              <TableCell>Açık Pozisyon</TableCell>
              <TableCell>son Başvuru</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? jobAdverts.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : jobAdverts
            ).map((jobAdvert) => {
              return (
                <TableRow hover key={jobAdvert.id}>
                  <TableCell>
                    {jobAdvert.employer.company.companyName}
                  </TableCell>
                  <TableCell>
                    <a
                      href={"https://" + jobAdvert.employer.company?.webAddress}
                      target={"_blank"}
                      rel="noopener noreferrer"
                    >
                      {jobAdvert.employer.company?.webAddress}
                    </a>
                  </TableCell>
                  <TableCell>{jobAdvert.workProgram?.programName}</TableCell>
                  <TableCell>{jobAdvert.city?.cityName}</TableCell>
                  <TableCell>{jobAdvert.jobPosition?.positionName}</TableCell>
                  <TableCell>{jobAdvert.typeOfWork.workType}</TableCell>
                  <TableCell>
                    {jobAdvert.minSalary + "-" + jobAdvert.maxSalary}
                  </TableCell>
                  <TableCell>{jobAdvert.openPosition}</TableCell>{" "}
                  <TableCell>{jobAdvert.applicationDeadline}</TableCell>
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
          count={jobAdverts.length}
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
