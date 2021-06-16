import { Button, MenuItem } from "@material-ui/core";
import React from "react";

export default function SignedOut(props) {
  return (
    <div>
      <MenuItem>
        <Button
          variant="contained"
          color="inherit"
          onClick={props.signIn}
          style={{ backgroundColor: "green" }}
        >
          Giriş yap
        </Button>

        <Button variant="contained" color="primary" href="#contained-buttons">
          Kayıt Ol
        </Button>
      </MenuItem>
    </div>
  );
}
