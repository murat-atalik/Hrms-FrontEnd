import React from "react";
import { Paper, MenuItem, MenuList } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { FaCogs, FaFileAlt, FaUser } from "react-icons/fa";

import { ImProfile, ImBriefcase } from "react-icons/im";
export default function SideMenu() {
  return (
    <div>
      <Paper
        style={{
          backgroundColor: "#1b1b1b",
        }}
      >
        <MenuList>
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
              <FaFileAlt size="2em" /> İŞ İLANI EKLE
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
              <FaFileAlt size="2em" /> İŞ İLANLARI
            </p>
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
}
