import { Menu, Button, MenuItem, Avatar } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";

export default function SignedIn(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button>
        <Avatar
          spaced="right"
          src="https://avatarfiles.alphacoders.com/198/thumb-198784.png"
          onClick={handleClick}
        />
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem
          component={NavLink}
          to="/favoriteJobs"
          style={{
            color: "black",
          }}
        >
          <AiFillHeart color="red" size="1em" />
          Favoriler
        </MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={props.signOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
