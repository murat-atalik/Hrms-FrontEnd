import { MenuItem, MenuList, Paper } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";

import { ImBriefcase } from "react-icons/im";

import { FaCogs } from "react-icons/fa";

export default function StaffSideMenu() {
  return (
    <Paper style={{ backgroundColor: "#263238" }}>
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
          to="/company/update-confirm"
          style={{
            color: "white",
          }}
        >
          <p>
            <ImBriefcase size="2em" /> Kurumsal Hesap Güncelleme
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
