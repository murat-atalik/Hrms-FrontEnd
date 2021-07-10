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
import { FaCogs } from "react-icons/fa";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import { MdLocationCity } from "react-icons/md";

export default function SideMenu() {
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
            to="/staff"
            style={{
              color: "white",
            }}
          >
            <FaCogs size="2em" />
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/jobadvert-confirm"
            style={{
              color: "white",
            }}
          >
            <ImBriefcase size="2em" />
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/register/staff"
            style={{
              color: "white",
            }}
          >
            <ImBriefcase size="2em" />
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/staff/update/25"
            style={{
              color: "white",
            }}
          >
            <ImBriefcase size="2em" />
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/company/update-confirm"
            style={{
              color: "white",
            }}
          >
            <ImBriefcase size="2em" />
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/add/jobPosition"
            style={{
              color: "white",
            }}
          >
            <ImBriefcase size="2em" />
          </MenuItem>

          <MenuItem
            component={NavLink}
            to="/add/city"
            style={{
              color: "white",
            }}
          >
            <MdLocationCity size="2em" />
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/jobadvertlist"
            style={{
              color: "white",
            }}
          >
            <ImBriefcase size="2em" />
          </MenuItem>
          <Divider />
        </MenuList>
      </Drawer>
    </div>
  );
}
