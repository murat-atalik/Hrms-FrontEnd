import React from "react";
import {
  MenuItem,
  MenuList,
  makeStyles,
  Drawer,
  Divider,
  CssBaseline,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { ImBriefcase } from "react-icons/im";
import { FaCogs, FaFileAlt, FaUserTag } from "react-icons/fa";
import { MdLocationCity, MdWork } from "react-icons/md";

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
          <Divider />
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
            to="/add/role"
            style={{
              color: "white",
            }}
          >
            <FaUserTag size="2em" color="white" />
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/add/work-program"
            style={{
              color: "white",
            }}
          >
            <MdWork size="2em" />
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/add/work-type"
            style={{
              color: "white",
            }}
          >
            <MdWork size="2em" />
          </MenuItem>
          <Divider />
          <MenuItem
            component={NavLink}
            to="/update/jobPosition"
            style={{
              color: "white",
            }}
          >
            <ImBriefcase size="2em" />
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/update/city"
            style={{
              color: "white",
            }}
          >
            <MdLocationCity size="2em" />
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/update/role"
            style={{
              color: "white",
            }}
          >
            <FaUserTag size="2em" color="white" />
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/update/work-program"
            style={{
              color: "white",
            }}
          >
            <MdWork size="2em" />
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/update/work-type"
            style={{
              color: "white",
            }}
          >
            <MdWork size="2em" />
          </MenuItem>
          <Divider />
        </MenuList>
      </Drawer>
    </div>
  );
}
