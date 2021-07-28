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

export default function EmployerSideMenu() {
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
              <FaFileAlt size="2em" /> Tüm İş İlanları
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
              <ImBriefcase size="2em" /> İş Verenler
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/jobadvert-status"
            style={{
              color: "white",
            }}
          >
            <p>
              <FaFileAlt size="2em" />
              Şirket İş İlanları
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
              <FaFileMedical size="2em" /> İş İlanı Ekle
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/company/update"
            style={{
              color: "white",
            }}
          >
            <p>
              <ImBriefcase size="2em" /> Şirket Bilgilerini Güncelle
            </p>
          </MenuItem>
        </MenuList>
      </Drawer>
    </div>
  );
}
