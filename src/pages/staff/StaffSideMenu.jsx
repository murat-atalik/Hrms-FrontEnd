import { Grid, MenuItem, MenuList, Paper } from "@material-ui/core";
import React from "react";
import { NavLink, Route } from "react-router-dom";
import JobAdvertisementAdd from "../jobAdvertisement/JobAdvertisementAdd";
import SideMenu from "../../layouts/SideMenu";
import { ImBriefcase } from "react-icons/im";
import Home from "../../layouts/Home";
import { FaCogs } from "react-icons/fa";

export default function StaffSideMenu() {
  return (
    <Paper style={{ backgroundColor: "black" }}>
      <MenuList>
        <MenuItem
          component={NavLink}
          to="/staff"
          style={{
            color: "white",
          }}
        >
          <p>
            <FaCogs size="2em" /> Sistem Personelleri
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
            <ImBriefcase size="2em" /> İş İlanı Onayla
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
            <ImBriefcase size="2em" /> Şirket Bilgisi Güncelle
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
          to="/updateCompany"
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
