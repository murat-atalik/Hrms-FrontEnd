import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import JobAdvertisementService from "../../services/jobAdvertisementService";
import FavoriteJobService from "../../services/favoriteJobService";
import { Grid } from "@material-ui/core";
import SideMenu from "../../layouts/SideMenu";

export default function FavoriteJobAdvertisementList() {
  const [jobAdverts, setJobAdverts] = useState([]);
  useEffect(() => {
    let favoriteJobService = new FavoriteJobService();
    favoriteJobService
      .getAllByCandidateId(3)
      .then((result) => setJobAdverts(result.data.data));
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
      minHeight: 600,
    },
  });
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
        <SideMenu />
      </Grid>
      <Grid item xs={9}>
        <Paper>
          <TableContainer component={Paper} className={classes.container}>
            <h1>Favoriler</h1>
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
                        {
                          jobAdvert.jobAdvertisement.employer.company
                            .companyName
                        }
                      </TableCell>
                      <TableCell>
                        <a
                          href={
                            "https://" +
                            jobAdvert.jobAdvertisement.employer.company
                              ?.webAddress
                          }
                          target={"_blank"}
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                        >
                          {
                            jobAdvert.jobAdvertisement.employer.company
                              ?.webAddress
                          }
                        </a>
                      </TableCell>
                      <TableCell>
                        {jobAdvert.jobAdvertisement?.workProgram?.programName}
                      </TableCell>
                      <TableCell>
                        {jobAdvert.jobAdvertisement?.city?.cityName}
                      </TableCell>
                      <TableCell>
                        {jobAdvert.jobAdvertisement?.jobPosition?.positionName}
                      </TableCell>
                      <TableCell>
                        {jobAdvert.jobAdvertisement?.typeOfWork?.workType}
                      </TableCell>
                      <TableCell>
                        {jobAdvert.jobAdvertisement.minSalary +
                          "-" +
                          jobAdvert.jobAdvertisement.maxSalary}
                      </TableCell>
                      <TableCell>
                        {jobAdvert.jobAdvertisement?.openPosition}
                      </TableCell>
                      <TableCell>
                        {jobAdvert.jobAdvertisement?.applicationDeadline}
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
              rowsPerPageOptions={[
                10,
                20,
                50,
                100,
                { label: "All", value: -1 },
              ]}
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
        </Paper>
      </Grid>
    </Grid>
  );
}
