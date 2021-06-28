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
} from "@material-ui/core";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { CgSearchLoading } from "react-icons/cg";
import SideMenu from "../../layouts/SideMenu";
export default function CurriculumVitaeList() {
  const [curriculumVitaes, setCurriculumVitaes] = useState([]);
  useEffect(() => {
    let cvService = new CurriculumVitaeService();
    cvService.getCv().then((result) => setCurriculumVitaes(result.data.data));
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, curriculumVitaes.length - page * rowsPerPage);

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
        <TableContainer className={classes.container} component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Ad Soyad</TableCell>
                <TableCell>cover letter</TableCell>

                <TableCell>Yabancı Diller</TableCell>
                <TableCell>Yetenekler</TableCell>
                <TableCell>experience</TableCell>
                <TableCell>educations</TableCell>
                <TableCell>Github</TableCell>
                <TableCell>LinkedIn</TableCell>
                <TableCell>İncele</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? curriculumVitaes.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : curriculumVitaes
              ).map((cv) => {
                return (
                  <TableRow hover key={cv.id}>
                    <TableCell>
                      <Avatar src={cv.imageUrl} />
                      {cv.candidate?.firstName + "  " + cv.candidate?.lastName}
                    </TableCell>
                    <TableCell>{cv.coverLetter}</TableCell>
                    <TableCell>
                      {cv.languages.map((language) => (
                        <p key={language.id}>{language.language}</p>
                      ))}
                    </TableCell>
                    <TableCell>
                      {cv.abilities.map((tech) => (
                        <p key={tech.id}>{tech.abilityName}</p>
                      ))}
                    </TableCell>
                    <TableCell>
                      {cv.experiences.map((experience) => (
                        <p key={experience.id}>{experience.businessName}</p>
                      ))}
                    </TableCell>
                    <TableCell>
                      {cv.educations.map((eductaion) => (
                        <p key={eductaion.id}>{eductaion.schoolName}</p>
                      ))}
                    </TableCell>
                    <TableCell>
                      <a
                        href={"https://" + cv.github}
                        target={"_blank"}
                        rel="noopener noreferrer"
                      >
                        <FaGithub color="black" size="3em" />
                      </a>
                    </TableCell>
                    <TableCell>
                      <a
                        href={"https://" + cv.linkedin}
                        target={"_blank"}
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin color="#0e76a8" size="3em" />
                      </a>
                    </TableCell>
                    <TableCell>
                      <a
                        href={"https://" + cv.linkedin}
                        target={"_blank"}
                        rel="noopener noreferrer"
                      >
                        <CgSearchLoading color="black" size="3em" />
                      </a>
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
            count={curriculumVitaes.length}
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
