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
import { ImHome } from "react-icons/im";

export default function CandidateSideMenu() {
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
            to="/cv-candidate"
            style={{
              color: "white",
            }}
          >
            <p>
              <RiFileUserLine size="2em" /> Öz Geçmişlerim
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
              <RiFileAddLine size="2em" /> Öz Geçmiş Oluştur
            </p>
          </MenuItem>

          <MenuItem
            component={NavLink}
            to="/jobadvertlist"
            style={{
              color: "white",
            }}
          >
            <p>
              <ImHome size="2em" /> Ana Sayfa
            </p>
          </MenuItem>
        </MenuList>{" "}
      </Drawer>
    </div>
  );
}
