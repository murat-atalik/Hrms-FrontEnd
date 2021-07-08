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
import { FaFileAlt, FaUser } from "react-icons/fa";

import { ImProfile, ImBriefcase } from "react-icons/im";
export default function SideMenu() {
  const drawerWidth = 240;
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,

      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      zIndex: 100,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,

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
            <p>
              <FaFileAlt size="2em" /> İŞ İLANLARI
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/employers"
            style={{
              color: "white",
            }}
          >
            <p>
              <ImBriefcase size="2em" /> İŞ VERENLER
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/candidate"
            style={{
              color: "white",
            }}
          >
            <p>
              <FaUser size="2em" /> İŞ ARAYANLAR
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/cv"
            style={{
              color: "white",
            }}
          >
            <p>
              <ImProfile size="2em" /> ÖZGEÇMİŞLER
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/job"
            style={{
              color: "white",
            }}
          >
            <p>
              <FaFileAlt size="2em" /> İŞ POZİSYONLARI
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/jobadvertadd"
            style={{
              color: "white",
            }}
          >
            <p>
              <FaFileAlt size="2em" /> İş Verene Görünümü
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/cv-create"
            style={{
              color: "white",
            }}
          >
            <p>
              <FaFileAlt size="2em" /> İş Arayan Görünümü
            </p>
          </MenuItem>{" "}
          <MenuItem
            component={NavLink}
            to="/staff"
            style={{
              color: "white",
            }}
          >
            <p>
              <FaFileAlt size="2em" /> Yönetici Görünümü
            </p>
          </MenuItem>
          <Divider />
        </MenuList>
      </Drawer>
    </div>
  );
}
