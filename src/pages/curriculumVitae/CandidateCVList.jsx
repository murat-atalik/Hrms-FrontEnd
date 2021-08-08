import React, { useState, useEffect } from "react";
import CurriculumVitaeService from "../../services/curriculumVitaeService";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TablePagination,
  Paper,
  Avatar,
  makeStyles,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import { CgSearchLoading } from "react-icons/cg";
import { AiFillCheckCircle, AiFillDelete } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { useAlert } from "react-alert";
import CandidateSideMenu from "../candidate/CandidateSideMenu";
import CandidateSideMenuButton from "../candidate/CandidateSideMenuButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CurriculumVitaeList() {
  const alert = useAlert();
  const [curriculumVitaeActive, setCurriculumVitaesActive] = useState();
  const [curriculumVitaesPassive, setCurriculumVitaesPassive] = useState([]);
  const cvService = new CurriculumVitaeService();
  const { authItem } = useSelector((state) => state.auth);

  useEffect(() => {
    cvService
      .getByCandidateIdActive(authItem[0].user.id)
      .then((result) => setCurriculumVitaesActive(result.data.data));
    cvService
      .getByCandidateIdPassive(authItem[0].user.id)
      .then((result) => setCurriculumVitaesPassive(result.data.data));
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
    paper: {
      minHeight: 100,
      marginBottom: "2em",
      padding: "1em",
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
    title: {
      flex: "1 1 100%",
    },
  }));
  const classes = useStyles();
  const handleDelete = (id) => {
    cvService.delete(id).then(() => {
      cvService
        .getByCandidateIdActive(authItem[0].user.id)
        .then((result) => setCurriculumVitaesActive(result.data.data));
      cvService
        .getByCandidateIdPassive(authItem[0].user.id)
        .then((result) => setCurriculumVitaesPassive(result.data.data));
      alert.success("ÖZGEÇMİŞ SİLİNDİ");
    });
  };
  const handleStatus = (id) => {
    cvService.changeStatus(id).then(() => {
      cvService
        .getByCandidateIdActive(authItem[0].user.id)
        .then((result) => setCurriculumVitaesActive(result.data.data));
      cvService
        .getByCandidateIdPassive(authItem[0].user.id)
        .then((result) => setCurriculumVitaesPassive(result.data.data));
      alert.success("ÖZGEÇMİŞ AKTİF");
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
          <CandidateSideMenu />
        </Grid>
      </div>
      <div className={classes.sideMenuOnlyButton}>
        <Grid item xs={1}>
          <CandidateSideMenuButton />
        </Grid>
      </div>
      <Grid item xs={10} lg={8}>
        <Paper square className={classes.paper}>
          <Typography
            className={classes.title}
            variant="h4"
            id="tableTitle"
            component="div"
            style={{ marginLeft: "1em" }}
          >
            Aktif Özgeçmiş
          </Typography>
          {curriculumVitaeActive !== null ? (
            <Grid space={2} container direction="row" alignItems="flex-start">
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Ad Soyad</TableCell>
                      <TableCell>Ön Yazı</TableCell>
                      <TableCell>Güncelle</TableCell>
                      <TableCell>İncele</TableCell>
                      <TableCell>Sil</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow hover key={curriculumVitaeActive?.id}>
                      <TableCell>
                        <Avatar src={curriculumVitaeActive?.imageUrl} />
                        {curriculumVitaeActive?.firstName +
                          "  " +
                          curriculumVitaeActive?.lastName}
                      </TableCell>
                      <TableCell>
                        {curriculumVitaeActive?.coverLetter}
                      </TableCell>

                      <TableCell>
                        <Link to={`/cv-update/${curriculumVitaeActive?.id}`}>
                          <GrUpdate color="black" size="2em" />
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/cv/${curriculumVitaeActive?.id}`}>
                          <CgSearchLoading color="black" size="3em" />
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            handleDelete(curriculumVitaeActive.id);
                          }}
                        >
                          <AiFillDelete color="black" size="2em" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          ) : (
            <h4 style={{ marginLeft: "2.5em" }}>
              Aktif Özgeçmiş bulunmamaktadır.
            </h4>
          )}
        </Paper>
        <TableContainer
          className={classes.container}
          component={Paper}
          style={{ padding: "1em" }}
        >
          <Typography
            className={classes.title}
            variant="h4"
            id="tableTitle"
            component="div"
            style={{ marginLeft: "1em" }}
          >
            Özgeçmişler
          </Typography>
          {curriculumVitaesPassive.length <= 0 ? (
            <h4 style={{ marginLeft: "2.5em" }}>Özgeçmiş bulunmamaktadır.</h4>
          ) : (
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Ad Soyad</TableCell>
                  <TableCell>Ön Yazı</TableCell>
                  <TableCell>Güncelle</TableCell>
                  <TableCell>İncele</TableCell>
                  <TableCell>Aktive Et</TableCell>
                  <TableCell>Sil</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {(rowsPerPage > 0
                  ? curriculumVitaesPassive.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : curriculumVitaesPassive
                ).map((cv) => {
                  return (
                    <TableRow hover key={cv.id}>
                      <TableCell>
                        <Avatar src={cv.imageUrl} />
                        {cv?.firstName + "  " + cv?.lastName}
                      </TableCell>
                      <TableCell>{cv.coverLetter}</TableCell>

                      <TableCell>
                        <Link to={`/cv-update/${cv?.id}`}>
                          <GrUpdate color="black" size="2em" />
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/cv/${cv.id}`}>
                          <CgSearchLoading color="black" size="3em" />
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            handleStatus(cv.id);
                          }}
                        >
                          <AiFillCheckCircle color="black" size="2em" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            handleDelete(cv.id);
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
          )}
        </TableContainer>
        <Paper>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50, 100, { label: "All", value: -1 }]}
            component="div"
            count={curriculumVitaesPassive.length}
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
