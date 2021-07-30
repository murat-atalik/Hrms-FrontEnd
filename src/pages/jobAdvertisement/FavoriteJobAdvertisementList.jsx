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
import FavoriteJobService from "../../services/favoriteJobService";
import { Button, Grid } from "@material-ui/core";
import SideMenu from "../../layouts/SideMenu";
import SideMenuOnlyButton from "../../layouts/SideMenuOnlyButton";
import { AiFillDelete } from "react-icons/ai";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import CandidateSideMenuButton from "../candidate/CandidateSideMenuButton";
import CandidateSideMenu from "../candidate/CandidateSideMenu";
import { useSelector } from "react-redux";

export default function FavoriteJobAdvertisementList() {
  const { authItem } = useSelector((state) => state.auth);

  const history = useHistory();
  const alert = useAlert();
  const [jobAdverts, setJobAdverts] = useState([]);
  let favoriteJobService = new FavoriteJobService();
  useEffect(() => {
    favoriteJobService
      .getAllByCandidateId(authItem[0].user.id)
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
  const deleteFavorite = (id) => {
    favoriteJobService.delete(id).then(() => {
      alert.error("FAVORİ SİLİNDİ");
      favoriteJobService
        .getAllByCandidateId(authItem[0].user.id)
        .then((result) => setJobAdverts(result.data.data));
    });
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
          <CandidateSideMenu />
        </Grid>
      </div>
      <div className={classes.sideMenuOnlyButton}>
        <Grid item xs={1}>
          <CandidateSideMenuButton />
        </Grid>
      </div>
      <Grid item xs={10} lg={8}>
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
                  <TableCell></TableCell>
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
                      <TableCell>
                        <Button
                          type="button"
                          onClick={() => deleteFavorite(jobAdvert.id)}
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
