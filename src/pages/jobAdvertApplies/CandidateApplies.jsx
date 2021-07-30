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
  makeStyles,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import { CgSearchLoading } from "react-icons/cg";
import { AiFillDelete } from "react-icons/ai";

import { useAlert } from "react-alert";
import CandidateSideMenu from "../candidate/CandidateSideMenu";
import CandidateSideMenuButton from "../candidate/CandidateSideMenuButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import JobAdvertApplyService from "../../services/jobAdvertApplyService";

export default function CandidateApplies() {
  const alert = useAlert();
  const [applies, setApplies] = useState([]);
  const jobAdvertApplyService = new JobAdvertApplyService();
  const { authItem } = useSelector((state) => state.auth);
  useEffect(() => {
    jobAdvertApplyService
      .getByCandidateId(authItem[0].user.id)
      .then((result) => setApplies(result.data.data));
  });

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
    jobAdvertApplyService.delete(id).then(() => {
      jobAdvertApplyService
        .getByCandidateId(authItem[0].user.id)
        .then((result) => setApplies(result.data.data));

      alert.success("İŞ BAŞVURUSU SİLİNDİ");
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
            İş Başvuruları
          </Typography>
          {applies === undefined || applies.length <= 0 ? (
            <h4 style={{ marginLeft: "2.5em" }}>
              İş Başvurusu bulunmamaktadır.
            </h4>
          ) : (
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Şirket Adı</TableCell>
                  <TableCell>İş Açıklaması</TableCell>
                  <TableCell>İş Pozisyonu</TableCell>
                  <TableCell>Durum</TableCell>
                  <TableCell>İncele</TableCell>
                  <TableCell>Sil</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {(rowsPerPage > 0
                  ? applies.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : applies
                ).map((apply) => {
                  return (
                    <TableRow hover key={apply.id}>
                      <TableCell>
                        {apply.jobAdvertisement?.employer?.company?.companyName}
                      </TableCell>
                      <TableCell>
                        {apply.jobAdvertisement?.jobDescription}
                      </TableCell>
                      <TableCell>
                        {apply.jobAdvertisement?.jobPosition?.positionName}
                      </TableCell>
                      <TableCell>{apply?.status}</TableCell>
                      <TableCell>
                        <Link
                          to={`/jobadvert-details/${apply?.jobAdvertisement?.id}`}
                        >
                          <CgSearchLoading color="black" size="3em" />
                        </Link>
                      </TableCell>

                      <TableCell>
                        <Button
                          onClick={() => {
                            handleDelete(apply?.id);
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
          )}
        </TableContainer>
        {applies !== undefined || applies.length > 0 ? (
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
              count={applies.length}
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
}
