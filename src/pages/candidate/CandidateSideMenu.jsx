import React from "react";
import { Paper, MenuList, MenuItem } from "@material-ui/core";
import { ImBriefcase } from "react-icons/im";
import { NavLink } from "react-router-dom";

export default function CandidateSideMenu() {
  return (
    <div>
      {" "}
      <Paper style={{ backgroundColor: "black" }}>
        <MenuList>
          <MenuItem
            component={NavLink}
            to="/cv-create"
            style={{
              color: "white",
            }}
          >
            <p>
              <ImBriefcase size="2em" /> Öz Geçmiş Oluştur
            </p>
          </MenuItem>

          <MenuItem
            component={NavLink}
            to="/cv-update"
            style={{
              color: "white",
            }}
          >
            <p>
              <ImBriefcase size="2em" /> Öz Geçmiş Güncelle
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
    </div>
  );
}
