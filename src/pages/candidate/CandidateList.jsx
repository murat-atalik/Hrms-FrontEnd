import React, { useState, useEffect } from "react";
import CandidateService from "../../services/candidateService";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  makeStyles,
  Grid,
} from "@material-ui/core";
import SideMenu from "../../layouts/SideMenu";
import SideMenuOnlyButton from "../../layouts/SideMenuOnlyButton";
export default function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    let candidateService = new CandidateService();
    candidateService
      .getCandidate()
      .then((result) => setCandidates(result.data.data));
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
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <Grid
        space={2}
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        <div className={classes.sideMenu}>
          <Grid item lg={2}>
            <SideMenu />
          </Grid>
        </div>
        <div className={classes.sideMenuOnlyButton}>
          <Grid item xs={1}>
            <SideMenuOnlyButton />
          </Grid>
        </div>
        <Grid item xs={10} lg={8}>
          <TableContainer component={Paper} className={classes.container}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Adı</TableCell>
                  <TableCell>Soyadı</TableCell>
                  <TableCell>Mail adresi</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {(rowsPerPage > 0
                  ? candidates.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : candidates
                ).map((candidate) => {
                  return (
                    <TableRow hover key={candidate.id}>
                      <TableCell>{candidate.firstName}</TableCell>
                      <TableCell>{candidate.lastName}</TableCell>
                      <TableCell>
                        <a
                          href={"mailto:" + candidate.email}
                          target={"_blank"}
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                        >
                          {candidate.email}
                        </a>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {/* {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={3} />
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
              count={candidates.length}
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
    </div>
  );
}
