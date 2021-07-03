import { MenuItem, MenuList, Paper } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";

import { ImBriefcase } from "react-icons/im";

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
          to="/company/update"
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
