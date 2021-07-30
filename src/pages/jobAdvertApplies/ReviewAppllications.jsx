import React, { useState, useEffect } from "react";
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
  withStyles,
  MenuItem,
  ListItemText,
  Menu,
} from "@material-ui/core";
import { CgSearchLoading } from "react-icons/cg";
import { useAlert } from "react-alert";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import JobAdvertApplyService from "../../services/jobAdvertApplyService";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import EmployerSideMenuButton from "../employer/EmployerSideMenuButton";
import EmployerSideMenu from "../employer/EmployerSideMenu";
import PageNotFound from "../../layouts/404";
import {
  Cancel,
  CheckCircle,
  Edit,
  PauseCircleFilled,
} from "@material-ui/icons";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function ReviewApplications() {
  const alert = useAlert();
  const [pendingApplies, setPendingApplies] = useState([]);
  const [approvedApplies, setApprovedApplies] = useState([]);
  const [deniedApplies, setDeniedApplies] = useState([]);
  const [employerId, setEmployerId] = useState();
  const jobAdvertApplyService = new JobAdvertApplyService();
  const { authItem } = useSelector((state) => state.auth);
  let { id } = useParams();
  useEffect(() => {
    jobAdvertApplyService
      .getByJobAdvertId(id)
      .then((result) =>
        setEmployerId(result.data.data[0]?.jobAdvertisement?.employer?.id)
      );
    jobAdvertApplyService
      .getPending(id)
      .then((result) => setPendingApplies(result.data.data));
    jobAdvertApplyService
      .getApproved(id)
      .then((result) => setApprovedApplies(result.data.data));
    jobAdvertApplyService
      .getDenied(id)
      .then((result) => setDeniedApplies(result.data.data));
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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
  const handlePending = (value) => {
    console.log(value);
    jobAdvertApplyService.statusPending(value).then(() => {
      jobAdvertApplyService
        .getPending(id)
        .then((result) => setPendingApplies(result.data.data));
      jobAdvertApplyService
        .getApproved(id)
        .then((result) => setApprovedApplies(result.data.data));
      jobAdvertApplyService
        .getDenied(id)
        .then((result) => setDeniedApplies(result.data.data));

      alert.success("İŞ BAŞVURUSU BEKLEMEDE");
    });
    setAnchorEl(null);
  };
  const handleDenied = (value) => {
    console.log(value);
    jobAdvertApplyService.statusDenied(value).then(() => {
      jobAdvertApplyService
        .getPending(id)
        .then((result) => setPendingApplies(result.data.data));
      jobAdvertApplyService
        .getApproved(id)
        .then((result) => setApprovedApplies(result.data.data));
      jobAdvertApplyService
        .getDenied(id)
        .then((result) => setDeniedApplies(result.data.data));

      alert.success("İŞ BAŞVURUSU REDDEDİLDİ");
    });
    setAnchorEl(null);
  };
  const handleApproved = (value) => {
    console.log(value);
    jobAdvertApplyService.statusApproved(value).then(() => {
      jobAdvertApplyService
        .getPending(id)
        .then((result) => setPendingApplies(result.data.data));
      jobAdvertApplyService
        .getApproved(id)
        .then((result) => setApprovedApplies(result.data.data));
      jobAdvertApplyService
        .getDenied(id)
        .then((result) => setDeniedApplies(result.data.data));

      alert.success("İŞ BAŞVURUSU BEKLEMEDE");
    });
    setAnchorEl(null);
  };

  if (authItem[0].user.id == employerId) {
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
              Bekleyen Başvurular
            </Typography>
            {pendingApplies == undefined || pendingApplies.length <= 0 ? (
              <h4 style={{ marginLeft: "2.5em" }}>
                İş Başvurusu bulunmamaktadır.
              </h4>
            ) : (
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Ad Soyad</TableCell>
                    <TableCell>Github</TableCell>
                    <TableCell>LinkedIn</TableCell>
                    <TableCell>Ön Yazı</TableCell>
                    <TableCell>Yabancı Diller</TableCell>
                    <TableCell>Yetenekler</TableCell>
                    <TableCell>Deneyimler</TableCell>
                    <TableCell>Eğitim</TableCell>
                    <TableCell>İncele</TableCell>
                    <TableCell>Onayla</TableCell>
                    <TableCell>Reddetme</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {(rowsPerPage > 0
                    ? pendingApplies.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : pendingApplies
                  ).map((pendingApply) => {
                    return (
                      <TableRow hover key={pendingApply.id}>
                        <TableCell>
                          <Avatar
                            src={pendingApply?.curriculumVitae?.imageUrl}
                          />
                          {pendingApply?.curriculumVitae?.firstName +
                            "  " +
                            pendingApply?.curriculumVitae?.lastName}
                        </TableCell>
                        <TableCell>
                          <a
                            href={
                              "https://" + pendingApply?.curriculumVitae?.github
                            }
                            target={"_blank"}
                            rel="noopener noreferrer"
                          >
                            <FaGithub color="black" size="3em" />
                          </a>
                        </TableCell>
                        <TableCell>
                          <a
                            href={
                              "https://" +
                              pendingApply?.curriculumVitae?.linkedin
                            }
                            target={"_blank"}
                            rel="noopener noreferrer"
                          >
                            <FaLinkedin color="#0e76a8" size="3em" />
                          </a>
                        </TableCell>
                        <TableCell>
                          {pendingApply?.curriculumVitae?.coverLetter}
                        </TableCell>
                        <TableCell>
                          {pendingApply?.curriculumVitae?.languages.map(
                            (language) => (
                              <p key={language.id}>{language.language}</p>
                            )
                          )}
                        </TableCell>
                        <TableCell>
                          {pendingApply?.curriculumVitae?.abilities.map(
                            (tech) => (
                              <p key={tech.id}>{tech.abilityName}</p>
                            )
                          )}
                        </TableCell>
                        <TableCell>
                          {pendingApply?.curriculumVitae?.experiences.map(
                            (experience) => (
                              <p key={experience.id}>
                                {experience.businessName}
                              </p>
                            )
                          )}
                        </TableCell>
                        <TableCell>
                          {pendingApply?.curriculumVitae?.educations.map(
                            (eductaion) => (
                              <p key={eductaion.id}>{eductaion.schoolName}</p>
                            )
                          )}
                        </TableCell>
                        <TableCell>
                          <Link to={`/cv/${pendingApply?.curriculumVitae?.id}`}>
                            <CgSearchLoading color="black" size="3em" />
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Button
                            startIcon={
                              <CheckCircle
                                style={{ fontSize: "3em", color: "green" }}
                              />
                            }
                            onClick={() => handleApproved(pendingApply.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            startIcon={
                              <Cancel
                                style={{ fontSize: "3em", color: "red" }}
                              />
                            }
                            onClick={() => handleDenied(pendingApply.id)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          {pendingApplies !== undefined || pendingApplies.length > 0 ? (
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
                count={pendingApplies.length}
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
          ) : (
            <div></div>
          )}

          <TableContainer
            className={classes.container}
            component={Paper}
            style={{ padding: "1em", marginTop: "3em" }}
          >
            <Typography
              className={classes.title}
              variant="h4"
              id="tableTitle"
              component="div"
              style={{ marginLeft: "1em" }}
            >
              Onaylanan Başvurular
            </Typography>
            {approvedApplies == undefined || approvedApplies.length <= 0 ? (
              <h4 style={{ marginLeft: "2.5em" }}>
                Onaylanmış İş Başvurusu bulunmamaktadır.
              </h4>
            ) : (
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Ad Soyad</TableCell>
                    <TableCell>Github</TableCell>
                    <TableCell>LinkedIn</TableCell>
                    <TableCell>Ön Yazı</TableCell>
                    <TableCell>Yabancı Diller</TableCell>
                    <TableCell>Yetenekler</TableCell>
                    <TableCell>Deneyimler</TableCell>
                    <TableCell>Eğitim</TableCell>
                    <TableCell>İncele</TableCell>
                    <TableCell>Bekleme</TableCell>
                    <TableCell>Reddetme</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {(rowsPerPage > 0
                    ? approvedApplies.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : approvedApplies
                  ).map((approvedApply) => {
                    return (
                      <TableRow hover key={approvedApply.id}>
                        <TableCell>
                          <Avatar
                            src={approvedApply?.curriculumVitae?.imageUrl}
                          />
                          {approvedApply?.curriculumVitae?.firstName +
                            "  " +
                            approvedApply?.curriculumVitae?.lastName}
                        </TableCell>
                        <TableCell>
                          <a
                            href={
                              "https://" +
                              approvedApply?.curriculumVitae?.github
                            }
                            target={"_blank"}
                            rel="noopener noreferrer"
                          >
                            <FaGithub color="black" size="3em" />
                          </a>
                        </TableCell>
                        <TableCell>
                          <a
                            href={
                              "https://" +
                              approvedApply?.curriculumVitae?.linkedin
                            }
                            target={"_blank"}
                            rel="noopener noreferrer"
                          >
                            <FaLinkedin color="#0e76a8" size="3em" />
                          </a>
                        </TableCell>
                        <TableCell>
                          {approvedApply?.curriculumVitae?.coverLetter}
                        </TableCell>
                        <TableCell>
                          {approvedApply?.curriculumVitae?.languages.map(
                            (language) => (
                              <p key={language.id}>{language.language}</p>
                            )
                          )}
                        </TableCell>
                        <TableCell>
                          {approvedApply?.curriculumVitae?.abilities.map(
                            (tech) => (
                              <p key={tech.id}>{tech.abilityName}</p>
                            )
                          )}
                        </TableCell>
                        <TableCell>
                          {approvedApply?.curriculumVitae?.experiences.map(
                            (experience) => (
                              <p key={experience.id}>
                                {experience.businessName}
                              </p>
                            )
                          )}
                        </TableCell>
                        <TableCell>
                          {approvedApply?.curriculumVitae?.educations.map(
                            (eductaion) => (
                              <p key={eductaion.id}>{eductaion.schoolName}</p>
                            )
                          )}
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/cv/${approvedApply?.curriculumVitae?.id}`}
                          >
                            <CgSearchLoading color="black" size="3em" />
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Button
                            startIcon={
                              <PauseCircleFilled
                                style={{ fontSize: "3em", color: "yellow" }}
                              />
                            }
                            onClick={() => handlePending(approvedApply.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            startIcon={
                              <Cancel
                                style={{ fontSize: "3em", color: "red" }}
                              />
                            }
                            onClick={() => handleDenied(approvedApply.id)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          {approvedApplies !== undefined || approvedApplies.length > 0 ? (
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
                count={approvedApplies.length}
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
          ) : (
            <div></div>
          )}

          <TableContainer
            className={classes.container}
            component={Paper}
            style={{ padding: "1em", marginTop: "3em" }}
          >
            <Typography
              className={classes.title}
              variant="h4"
              id="tableTitle"
              component="div"
              style={{ marginLeft: "1em" }}
            >
              Reddedilen Başvurular
            </Typography>
            {deniedApplies == undefined || deniedApplies.length <= 0 ? (
              <h4 style={{ marginLeft: "2.5em" }}>
                Reddedilmiş İş Başvurusu bulunmamaktadır.
              </h4>
            ) : (
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Ad Soyad</TableCell>
                    <TableCell>Github</TableCell>
                    <TableCell>LinkedIn</TableCell>
                    <TableCell>Ön Yazı</TableCell>
                    <TableCell>Yabancı Diller</TableCell>
                    <TableCell>Yetenekler</TableCell>
                    <TableCell>Deneyimler</TableCell>
                    <TableCell>Eğitim</TableCell>
                    <TableCell>İncele</TableCell>
                    <TableCell>Onayla</TableCell>
                    <TableCell>Bekleme</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {(rowsPerPage > 0
                    ? deniedApplies.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : deniedApplies
                  ).map((deniedApply) => {
                    return (
                      <TableRow hover key={deniedApply.id}>
                        <TableCell>
                          <Avatar
                            src={deniedApply?.curriculumVitae?.imageUrl}
                          />
                          {deniedApply?.curriculumVitae?.firstName +
                            "  " +
                            deniedApply?.curriculumVitae?.lastName}
                        </TableCell>
                        <TableCell>
                          <a
                            href={
                              "https://" + deniedApply?.curriculumVitae?.github
                            }
                            target={"_blank"}
                            rel="noopener noreferrer"
                          >
                            <FaGithub color="black" size="3em" />
                          </a>
                        </TableCell>
                        <TableCell>
                          <a
                            href={
                              "https://" +
                              deniedApply?.curriculumVitae?.linkedin
                            }
                            target={"_blank"}
                            rel="noopener noreferrer"
                          >
                            <FaLinkedin color="#0e76a8" size="3em" />
                          </a>
                        </TableCell>
                        <TableCell>
                          {deniedApply?.curriculumVitae?.coverLetter}
                        </TableCell>
                        <TableCell>
                          {deniedApply?.curriculumVitae?.languages.map(
                            (language) => (
                              <p key={language.id}>{language.language}</p>
                            )
                          )}
                        </TableCell>
                        <TableCell>
                          {deniedApply?.curriculumVitae?.abilities.map(
                            (tech) => (
                              <p key={tech.id}>{tech.abilityName}</p>
                            )
                          )}
                        </TableCell>
                        <TableCell>
                          {deniedApply?.curriculumVitae?.experiences.map(
                            (experience) => (
                              <p key={experience.id}>
                                {experience.businessName}
                              </p>
                            )
                          )}
                        </TableCell>
                        <TableCell>
                          {deniedApply?.curriculumVitae?.educations.map(
                            (eductaion) => (
                              <p key={eductaion.id}>{eductaion.schoolName}</p>
                            )
                          )}
                        </TableCell>
                        <TableCell>
                          <Link to={`/cv/${deniedApply?.curriculumVitae?.id}`}>
                            <CgSearchLoading color="black" size="3em" />
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Button
                            startIcon={
                              <CheckCircle
                                style={{ fontSize: "3em", color: "green" }}
                              />
                            }
                            onClick={() => handleApproved(deniedApply.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            startIcon={
                              <PauseCircleFilled
                                style={{ fontSize: "3em", color: "yellow" }}
                              />
                            }
                            onClick={() => handlePending(deniedApply.id)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          {deniedApplies !== undefined || deniedApplies.length > 0 ? (
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
                count={deniedApplies.length}
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
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
    );
  } else {
    return <PageNotFound />;
  }
}
