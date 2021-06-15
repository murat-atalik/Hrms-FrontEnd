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
          padding: "1em",
        }}
      >
        <MenuList>
          <MenuItem
            component={NavLink}
            to="/employer"
            style={{
              color: "white",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <p>
              <ImBriefcase size="2em" /> <br /> İŞ VERENLER
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/candidate"
            style={{
              color: "white",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <p>
              <FaUser size="2em" /> <br /> İŞ ARAYANLAR
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/cv"
            style={{
              color: "white",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <p>
              <ImProfile size="2em" /> <br /> ÖZGEÇMİŞLER
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/job"
            style={{
              color: "white",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <p>
              <FaFileAlt size="2em" /> <br /> İŞ POZİSYONLARI
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/staff"
            style={{
              color: "white",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <p>
              <FaCogs size="2em" /> <br /> SİSTEM PERSONELLERİ
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/jobadvert"
            style={{
              color: "white",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <p>
              <FaFileAlt size="2em" /> <br /> İŞ İLANI Ekle
            </p>
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/jobadvertlist"
            style={{
              color: "white",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <p>
              <FaFileAlt size="2em" /> <br /> İŞ İLANI Listele
            </p>
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
}
