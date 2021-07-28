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

import { ImBriefcase } from "react-icons/im";
import { FaFileAlt, FaFileMedical } from "react-icons/fa";

export default function EmployerSideMenuButton() {
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
          to="/employers"
          style={{
            color: "white",
          }}
        >
          <ImBriefcase size="2em" />
        </MenuItem>
        <MenuItem
          component={NavLink}
          to="/jobAdvert-status"
          style={{
            color: "white",
          }}
        >
          <FaFileAlt size="2em" />
        </MenuItem>
        <MenuList>
          <MenuItem
            component={NavLink}
            to="/jobadvertadd"
            style={{
              color: "white",
            }}
          >
            <FaFileMedical size="2em" />
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/company/update"
            style={{
              color: "white",
            }}
          >
            <ImBriefcase size="2em" />
          </MenuItem>
        </MenuList>
      </Drawer>
    </div>
  );
}
