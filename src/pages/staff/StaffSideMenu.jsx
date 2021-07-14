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
import { RiAdminLine } from "react-icons/ri";
import { MdLocationCity, MdWork } from "react-icons/md";
import { FaUserTag } from "react-icons/fa";

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
            to="/staff"
            style={{
              color: "white",
            }}
          >
            <p>
              <RiAdminLine size="2em" color="white" /> Sistem Personelleri
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/jobadvert-confirm"
            style={{
              color: "white",
            }}
          >
            <p>
              <ImBriefcase size="2em" /> İş İlanı Onayla
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/register/staff"
            style={{
              color: "white",
            }}
          >
            <p>
              <ImBriefcase size="2em" /> Yeni Yönetici Kaydı
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/staff/update/25"
            style={{
              color: "white",
            }}
          >
            <p>
              <ImBriefcase size="2em" /> Bilgileri Güncelle
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/employer/confirm"
            style={{
              color: "white",
            }}
          >
            <p>
              <ImBriefcase size="2em" /> Kurumsal Hesap Onayla
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/company/update-confirm"
            style={{
              color: "white",
            }}
          >
            <p>
              <ImBriefcase size="2em" /> Kurumsal Hesap Güncelle
            </p>
          </MenuItem>
          <Divider />
          <MenuItem
            component={NavLink}
            to="/add/jobPosition"
            style={{
              color: "white",
            }}
          >
            <p>
              <ImBriefcase size="2em" /> İş Pozisyonu Ekle
            </p>
          </MenuItem>{" "}
          <MenuItem
            component={NavLink}
            to="/add/city"
            style={{
              color: "white",
            }}
          >
            <p>
              <MdLocationCity size="2em" /> Şehir Ekle
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/add/role"
            style={{
              color: "white",
            }}
          >
            <p>
              <FaUserTag size="2em" color="white" /> Rol Ekle
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/add/work-program"
            style={{
              color: "white",
            }}
          >
            <p>
              <MdWork size="2em" /> Çalışma Programı Ekle
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/add/work-type"
            style={{
              color: "white",
            }}
          >
            <p>
              <MdWork size="2em" /> Çalışma Biçimi Ekle
            </p>
          </MenuItem>
          <Divider />
          <MenuItem
            component={NavLink}
            to="/update/jobPosition"
            style={{
              color: "white",
            }}
          >
            <p>
              <ImBriefcase size="2em" /> İş Pozisyonu Güncelle
            </p>
          </MenuItem>{" "}
          <MenuItem
            component={NavLink}
            to="/update/city"
            style={{
              color: "white",
            }}
          >
            <p>
              <MdLocationCity size="2em" /> Şehir Güncelle
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/update/role"
            style={{
              color: "white",
            }}
          >
            <p>
              <FaUserTag size="2em" color="white" /> Rol Güncelle
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/update/work-program"
            style={{
              color: "white",
            }}
          >
            <p>
              <MdWork size="2em" /> Çalışma Programı Güncelle
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/update/work-type"
            style={{
              color: "white",
            }}
          >
            <p>
              <MdWork size="2em" /> Çalışma Biçimi Güncelle
            </p>
          </MenuItem>
          <Divider />
          <MenuItem
            component={NavLink}
            to="/jobadvertlist"
            style={{
              color: "white",
            }}
          >
            <p>
              <ImBriefcase size="2em" /> Ana Sayfa
            </p>
          </MenuItem>
          <Divider />
        </MenuList>
      </Drawer>
    </div>
  );
}
