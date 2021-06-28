import { Grid, MenuItem, MenuList, Paper } from "@material-ui/core";
import React from "react";
import { NavLink, Route } from "react-router-dom";
import JobAdvertisementAdd from "../jobAdvertisement/JobAdvertisementAdd";
import SideMenu from "../../layouts/SideMenu";
import { ImBriefcase } from "react-icons/im";
import Home from "../../layouts/Home";

export default function EmployerPage() {
  return (
    <Paper style={{ backgroundColor: "black" }}>
      <MenuList>
        <MenuItem
          component={NavLink}
          to="/jobadvertadd"
          style={{
            color: "white",
          }}
        >
          <p>
            <ImBriefcase size="2em" /> İş İlanı Ekle
          </p>
        </MenuItem>
        <MenuItem
          component={NavLink}
          to="/updateCompany"
          style={{
            color: "white",
          }}
        >
          <p>
            <ImBriefcase size="2em" /> Şirket Bilgilerini Güncelle
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
            <ImBriefcase size="2em" /> Ana Sayfa
          </p>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
