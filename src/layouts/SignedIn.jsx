import { Menu, Button, MenuItem } from "@material-ui/core";
import React from "react";
import { NavLink, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { userLogout } from "../store/actions/authActions";

export default function SignedIn() {
  const dispatch = useDispatch();
  const { authItem } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = (user) => {
    dispatch(userLogout(user));
    history.push("/");
  };
  return (
    <div>
      <Button
        style={{ background: "grey", color: "white" }}
        onClick={handleClick}
      >
        Hesabım
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {authItem[0].loggedIn && authItem[0].user.userType === "staff" ? (
          <MenuItem
            component={NavLink}
            to="/staff-update"
            style={{
              color: "black",
            }}
          >
            Bilgilerimi Güncelle
          </MenuItem>
        ) : authItem[0].loggedIn && authItem[0].user.userType === "employer" ? (
          <MenuItem
            component={NavLink}
            to="/employer-update"
            style={{
              color: "black",
            }}
          >
            Bilgilerimi Güncelle
          </MenuItem>
        ) : authItem[0].loggedIn &&
          authItem[0].user.userType === "candidate" ? (
          <MenuItem
            component={NavLink}
            to="/candidate-update"
            style={{
              color: "black",
            }}
          >
            Bilgilerimi Güncelle
          </MenuItem>
        ) : (
          <div></div>
        )}

        <MenuItem
          component={NavLink}
          to="/changePassword"
          style={{
            color: "black",
          }}
        >
          Şifremi Değiştir
        </MenuItem>
        <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
      </Menu>
    </div>
  );
}
