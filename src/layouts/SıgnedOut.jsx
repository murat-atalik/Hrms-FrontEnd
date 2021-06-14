import React from "react";
import { Button, Menu } from "semantic-ui-react";

export default function SignedOut(props) {
  return (
    <div>
      <Menu.Item>
        <Button.Group>
          <Button onClick={props.signIn}>Giriş yap</Button>
          <Button.Or text="" />
          <Button positive>Kayıt Ol</Button>
        </Button.Group>
      </Menu.Item>
    </div>
  );
}
