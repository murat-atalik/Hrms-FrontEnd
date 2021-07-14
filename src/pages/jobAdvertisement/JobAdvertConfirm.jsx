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
import FavoriteJobService from "../../services/favoriteJobService";
import { AiFillCheckCircle, AiFillDelete, AiFillHeart } from "react-icons/ai";
import { Button, CssBaseline, Hidden, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import StaffSideMenu from "../../pages/staff/StaffSideMenu";
import JobFilter from "./JobFilter";
import StaffSideMenuButton from "../../pages/staff/StaffSideMenuButton";
import { useAlert } from "react-alert";
export default function JobAdverConfirm() {
  const alert = useAlert();
  const [jobAdverts, setJobAdverts] = useState([]);
  const jobAdvertisementService = new JobAdvertisementService();
  useEffect(() => {
    jobAdvertisementService
      .getUnConfirmed()
      .then((result) => setJobAdverts(result.data.data));
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
  const handleConfirm = (values) => {
    jobAdvertisementService.changeConfirm(values).then((result) => {
      result.data.success
        ? alert.success("İŞ İLANI ONAYLANDI")
        : alert.error("HATA");
      jobAdvertisementService
        .getUnConfirmed()
        .then((result) => setJobAdverts(result.data.data));
    });
  };
  const handleDelete = (id) => {
    console.log(id);
    jobAdvertisementService.delete(id).then((result) => {
      result.data.success
        ? alert.success("İŞ İLANI SİLİNDİ")
        : alert.error("HATA");
      jobAdvertisementService
        .getUnConfirmed()
        .then((result) => setJobAdverts(result.data.data));
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
          <StaffSideMenu />
        </Grid>
      </div>
      <div className={classes.sideMenuOnlyButton}>
        <Grid item xs={1}>
          <StaffSideMenuButton />
        </Grid>
      </div>
      <Grid item xs={10} lg={8}>
        <CssBaseline />
        <Typography component="h1" variant="h4" style={{ marginBottom: "1em" }}>
          İş ilanı Onayla
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
                <TableCell>son Başvuru Tarihi</TableCell>
                <TableCell>Onayla</TableCell>
                <TableCell>Sil</TableCell>
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
                    <TableCell>{jobAdvert.workProgram?.programName}</TableCell>
                    <TableCell>{jobAdvert.city?.cityName}</TableCell>
                    <TableCell>{jobAdvert.jobPosition?.positionName}</TableCell>
                    <TableCell>{jobAdvert.workType?.workType}</TableCell>
                    <TableCell>
                      {jobAdvert.minSalary + "-" + jobAdvert.maxSalary}
                    </TableCell>
                    <TableCell>{jobAdvert?.applicationDeadline}</TableCell>

                    <TableCell>
                      <Button
                        onClick={() => {
                          handleConfirm(jobAdvert.id);
                        }}
                      >
                        <AiFillCheckCircle color="black" size="2em" />
                      </Button>
                    </TableCell>
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
      </Grid>
    </Grid>
  );
}
