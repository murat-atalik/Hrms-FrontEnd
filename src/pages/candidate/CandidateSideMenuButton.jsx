import React from "react";
import {
  Paper,
  MenuItem,
  MenuList,
  makeStyles,
  Drawer,
  Divider,
  CssBaseline,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { RiFileUserLine, RiFileAddLine } from "react-icons/ri";
import { ImBriefcase, ImHome } from "react-icons/im";
import { FaFileAlt } from "react-icons/fa";

export default function CandidateSideMenuButton() {
  const drawerWidth = 240;
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    appBar: {
      width: `calc(100% - ${65}px)`,

      marginLeft: drawerWidth,
    },
    drawer: {
      width: "65px",
      zIndex: 100,
      flexShrink: 0,
    },
    drawerPaper: {
      width: "65px",

      backgroundColor: "#607d8b",
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: "black",
      padding: theme.spacing(3),
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <MenuList>
          <MenuItem
            component={NavLink}
            to="/jobadvertlist"
            style={{
              color: "white",
            }}
          >
            <FaFileAlt size="2em" />
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/favoriteJobs"
            style={{
              color: "white",
            }}
          >
            <FaFileAlt size="2em" />
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/employers"
            style={{
              color: "white",
            }}
          >
            <ImBriefcase size="2em" />
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/cv-candidate"
            style={{
              color: "white",
            }}
          >
            <RiFileUserLine size="2em" />
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/cv-create"
            style={{
              color: "white",
            }}
          >
            <RiFileAddLine size="2em" />
          </MenuItem>
        </MenuList>
      </Drawer>
    </div>
  );
}
