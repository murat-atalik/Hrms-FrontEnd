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
import { AiFillHeart } from "react-icons/ai";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import SideMenu from "../../layouts/SideMenu";
import SideMenuOnlyButton from "../../layouts/SideMenuOnlyButton";
import CandidateSideMenu from "../candidate/CandidateSideMenu";
import CandidateSideMenuButton from "../candidate/CandidateSideMenuButton";
import EmployerSideMenu from "../employer/EmployerSideMenu";
import EmployerSideMenuButton from "../employer/EmployerSideMenuButton";
import StaffSideMenu from "../staff/StaffSideMenu";
import StaffSideMenuButton from "../staff/StaffSideMenuButton";
import JobFilter from "./JobFilter";

import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { CgSearchLoading } from "react-icons/cg";
import { useSelector } from "react-redux";
export default function JobAdvertisementList() {
  const alert = useAlert();
  const { authItem } = useSelector((state) => state.auth);
  const [jobAdverts, setJobAdverts] = useState([]);

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getJobAdvert()
      .then((result) => setJobAdverts(result.data.data));
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, jobAdverts.length - page * rowsPerPage);

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
        <JobFilter setJobAdverts={setJobAdverts} />

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
                <TableCell>İncele</TableCell>
                {authItem[0].user.userType === "candidate" ? (
                  <TableCell>Favori</TableCell>
                ) : null}
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
                      <Link to={`/jobadvert-details/${jobAdvert.id}`}>
                        <CgSearchLoading color="black" size="3em" />
                      </Link>
                    </TableCell>

                    {authItem[0].user.userType === "candidate" ? (
                      <TableCell>
                        <Button
                          type="button"
                          onClick={() => {
                            let values = {
                              candidateId: 3,
                              jobAdvertisementId: jobAdvert.id,
                            };

                            let favoriteJobService = new FavoriteJobService();
                            favoriteJobService.add(values).then((result) => {
                              result.data.success
                                ? alert.success("FAVORİLERE EKLENDİ")
                                : alert.error("HATA");
                            });
                          }}
                        >
                          <AiFillHeart color="black" size="3em" />
                        </Button>
                      </TableCell>
                    ) : null}
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
