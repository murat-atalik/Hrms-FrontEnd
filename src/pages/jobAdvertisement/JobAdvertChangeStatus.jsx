import React, { useEffect, useRef, useState } from "react";
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
import { AiFillDelete } from "react-icons/ai";
import { CgArrowsExchangeAltV, CgSearchLoading } from "react-icons/cg";
import { Button, CssBaseline, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import EmployerSideMenu from "../../pages/employer/EmployerSideMenu";
import EmployerSideMenuButton from "../../pages/employer/EmployerSideMenuButton";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function JobAdvertChangeStatus() {
  const { authItem } = useSelector((state) => state.auth);
  const alert = useAlert();
  const [jobAdvertsActive, setJobAdvertsActive] = useState([]);
  const [jobAdvertsPassive, setJobAdvertsPassive] = useState([]);
  const [jobAdvertsUnconfirmed, setJobAdvertsUnconfirmed] = useState([]);
  const jobAdvertisementService = new JobAdvertisementService();
  useEffect(() => {
    jobAdvertisementService
      .getByEmployerIdActive(authItem[0].user.id)
      .then((result) => setJobAdvertsActive(result.data.data));
  }, []);
  useEffect(() => {
    jobAdvertisementService
      .getByEmployerIdPassive(authItem[0].user.id)
      .then((result) => setJobAdvertsPassive(result.data.data));
  }, []);
  useEffect(() => {
    jobAdvertisementService
      .getByEmployerIdUnconfirmed(authItem[0].user.id)
      .then((result) => setJobAdvertsUnconfirmed(result.data.data));
  }, []);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
      minHeight: 400,
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

      paper: {
        minHeight: 100,
        marginBottom: "2em",
        padding: "1em",
      },
      title: {
        flex: "1 1 100%",
      },
    },
  }));
  const classes = useStyles();
  const handleStatus = (value) => {
    jobAdvertisementService.changeActive(value).then((result) => {
      result.data.success
        ? alert.success("İŞ İLANI DURUMU DEĞİŞTİ")
        : alert.error("HATA");
      jobAdvertisementService
        .getByEmployerIdActive(authItem[0].user.id)
        .then((result) => setJobAdvertsActive(result.data.data));
      jobAdvertisementService
        .getByEmployerIdPassive(authItem[0].user.id)
        .then((result) => setJobAdvertsPassive(result.data.data));
    });
  };
  const handleDelete = (value) => {
    console.log(value);
    jobAdvertisementService.delete(value).then((result) => {
      result.data.success
        ? alert.success("İŞ İLANI SİLİNDİ")
        : alert.error("HATA");
      jobAdvertisementService
        .getByEmployerIdUnconfirmed(authItem[0].user.id)
        .then((result) => setJobAdvertsUnconfirmed(result.data.data));
      jobAdvertisementService
        .getByEmployerIdActive(authItem[0].user.id)
        .then((result) => setJobAdvertsActive(result.data.data));
      jobAdvertisementService
        .getByEmployerIdPassive(authItem[0].user.id)
        .then((result) => setJobAdvertsPassive(result.data.data));
    });
  };

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
          <EmployerSideMenu />
        </Grid>
      </div>
      <div className={classes.sideMenuOnlyButton}>
        <Grid item xs={1}>
          <EmployerSideMenuButton />
        </Grid>
      </div>
      <Grid item xs={10} lg={8}>
        <Grid item xs={12}>
          <CssBaseline />
          <Typography
            component="h1"
            variant="h4"
            style={{ marginBottom: "1em" }}
          >
            Aktif İlanlar
          </Typography>
          <TableContainer component={Paper} className={classes.container}>
            <Table stickyHeader>
              <TableHead>
                <TableRow></TableRow>
                <TableRow>
                  <TableCell>Şirket Adı</TableCell>
                  <TableCell>Çalışma programı</TableCell>
                  <TableCell>Şehir</TableCell>
                  <TableCell>Pozisyon</TableCell>
                  <TableCell>Çalışma Türü</TableCell>
                  <TableCell>Maaş</TableCell>
                  <TableCell>Son Başvuru Tarihi</TableCell>
                  <TableCell>Durum Değiştir</TableCell>
                  <TableCell>İş Başvurularını İncele</TableCell>
                  {/* <TableCell>Sil</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? jobAdvertsActive.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : jobAdvertsActive
                ).map((jobAdvert) => {
                  return (
                    <TableRow hover key={jobAdvert.id}>
                      <TableCell>
                        {jobAdvert.employer.company.companyName}
                      </TableCell>
                      <TableCell>
                        {jobAdvert.workProgram?.programName}
                      </TableCell>
                      <TableCell>{jobAdvert.city?.cityName}</TableCell>
                      <TableCell>
                        {jobAdvert.jobPosition?.positionName}
                      </TableCell>
                      <TableCell>{jobAdvert.workType?.workType}</TableCell>
                      <TableCell>
                        {jobAdvert.minSalary + "-" + jobAdvert.maxSalary}
                      </TableCell>
                      <TableCell>{jobAdvert?.applicationDeadline}</TableCell>

                      <TableCell>
                        <Button
                          onClick={() => {
                            handleStatus(jobAdvert.id);
                          }}
                        >
                          <CgArrowsExchangeAltV color="black" size="2em" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Link to={`/review-applies/${jobAdvert?.id}`}>
                          <CgSearchLoading color="black" size="3em" />
                        </Link>
                      </TableCell>
                      {/* <TableCell>
                        <Button
                          onClick={() => {
                            handleDelete(jobAdvert.id);
                          }}
                        >
                          <AiFillDelete color="black" size="2em" />
                        </Button>
                      </TableCell> */}
                    </TableRow>
                  );
                })}
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
              count={jobAdvertsActive.length}
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
        <Grid item xs={12} style={{ marginTop: "4em" }}>
          <CssBaseline />
          <Typography
            component="h1"
            variant="h4"
            style={{ marginBottom: "1em" }}
          >
            Pasif İlanlar
          </Typography>
          <TableContainer component={Paper} className={classes.container}>
            <Table stickyHeader>
              <TableHead>
                <TableRow></TableRow>
                <TableRow>
                  <TableCell>Şirket Adı</TableCell>
                  <TableCell>Çalışma programı</TableCell>
                  <TableCell>Şehir</TableCell>
                  <TableCell>Pozisyon</TableCell>
                  <TableCell>Çalışma Türü</TableCell>
                  <TableCell>Maaş</TableCell>
                  <TableCell>Son Başvuru Tarihi</TableCell>
                  <TableCell>Durum değiştir</TableCell>
                  <TableCell>İş Başvurularını İncele</TableCell>
                  {/* <TableCell>Sil</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? jobAdvertsPassive.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : jobAdvertsPassive
                ).map((jobAdvert) => {
                  return (
                    <TableRow hover key={jobAdvert.id}>
                      <TableCell>
                        {jobAdvert.employer.company.companyName}
                      </TableCell>
                      <TableCell>
                        {jobAdvert.workProgram?.programName}
                      </TableCell>
                      <TableCell>{jobAdvert.city?.cityName}</TableCell>
                      <TableCell>
                        {jobAdvert.jobPosition?.positionName}
                      </TableCell>
                      <TableCell>{jobAdvert.workType?.workType}</TableCell>
                      <TableCell>
                        {jobAdvert.minSalary + "-" + jobAdvert.maxSalary}
                      </TableCell>
                      <TableCell>{jobAdvert?.applicationDeadline}</TableCell>

                      <TableCell>
                        <Button
                          onClick={() => {
                            handleStatus(jobAdvert.id);
                          }}
                        >
                          <CgArrowsExchangeAltV color="black" size="2em" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Link to={`/review-applies/${jobAdvert?.id}`}>
                          <CgSearchLoading color="black" size="3em" />
                        </Link>
                      </TableCell>
                      {/* <TableCell>
                        <Button
                          onClick={() => {
                            handleDelete(jobAdvert.id);
                          }}
                        >
                          <AiFillDelete color="black" size="2em" />
                        </Button>
                      </TableCell> */}
                    </TableRow>
                  );
                })}
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
              count={jobAdvertsPassive.length}
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
        <Grid item xs={12} style={{ marginTop: "4em" }}>
          <CssBaseline />
          <Typography
            component="h1"
            variant="h4"
            style={{ marginBottom: "1em" }}
          >
            Onay Bekleyen İlanlar
          </Typography>
          <TableContainer component={Paper} className={classes.container}>
            <Table stickyHeader>
              <TableHead>
                <TableRow></TableRow>
                <TableRow>
                  <TableCell>Şirket Adı</TableCell>
                  <TableCell>Çalışma programı</TableCell>
                  <TableCell>Şehir</TableCell>
                  <TableCell>Pozisyon</TableCell>
                  <TableCell>Çalışma Türü</TableCell>
                  <TableCell>Maaş</TableCell>
                  <TableCell>Son Başvuru Tarihi</TableCell>
                  <TableCell>Sil</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? jobAdvertsUnconfirmed.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : jobAdvertsUnconfirmed
                ).map((jobAdvert) => {
                  return (
                    <TableRow hover key={jobAdvert.id}>
                      <TableCell>
                        {jobAdvert.employer.company.companyName}
                      </TableCell>
                      <TableCell>
                        {jobAdvert.workProgram?.programName}
                      </TableCell>
                      <TableCell>{jobAdvert.city?.cityName}</TableCell>
                      <TableCell>
                        {jobAdvert.jobPosition?.positionName}
                      </TableCell>
                      <TableCell>{jobAdvert.workType?.workType}</TableCell>
                      <TableCell>
                        {jobAdvert.minSalary + "-" + jobAdvert.maxSalary}
                      </TableCell>
                      <TableCell>{jobAdvert?.applicationDeadline}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            handleDelete(jobAdvert.id);
                          }}
                        >
                          <AiFillDelete color="black" size="2em" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
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
              count={jobAdvertsUnconfirmed.length}
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
    </Grid>
  );
}
