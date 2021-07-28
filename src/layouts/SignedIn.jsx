import { Menu, Button, MenuItem, Avatar, styled } from "@material-ui/core";
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import { userLogout } from "../store/actions/authActions";

export default function SignedIn(props) {
  const { authItem } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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
        {/* <MenuItem
          component={NavLink}
          to="/cv-candidate"
          style={{
            color: "black",
          }}
        >
          Bilgilerim
        </MenuItem> */}

        <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
      </Menu>
    </div>
  );
}
