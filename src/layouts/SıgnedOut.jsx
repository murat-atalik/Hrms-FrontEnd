import { ButtonGroup, MenuItem } from "@material-ui/core";
import React from "react";
import { Button, Menu } from "semantic-ui-react";

export default function SignedOut(props) {
  return (
    <div>
      <MenuItem>
        <Button variant="contained" color="grey" onClick={props.signIn}>
          Giriş yap
        </Button>

        <Button variant="contained" color="green" href="#contained-buttons">
          Kayıt Ol
        </Button>
      </MenuItem>
    </div>
  );
}
