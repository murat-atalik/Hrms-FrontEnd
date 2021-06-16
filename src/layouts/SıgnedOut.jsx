import { Button, MenuItem } from "@material-ui/core";
import React from "react";

export default function SignedOut(props) {
  return (
    <div>
      <MenuItem>
        <Button variant="contained" color="primary" onClick={props.signIn}>
          Giriş yap
        </Button>

        <Button variant="contained" color="secondary" href="#contained-buttons">
          Kayıt Ol
        </Button>
      </MenuItem>
    </div>
  );
}
