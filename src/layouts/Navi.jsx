import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Menu, Icon } from "semantic-ui-react";

export default function Navi() {
  return (
    <div>
      <Menu inverted fixed="top" size="large">
        <Container>
          <Menu.Item as={NavLink} to="/home">
            <Icon name="home" size="large" />
            Ana sayfa
          </Menu.Item>
          <Menu.Item>
            <Icon name="mail" size="large" />
            Mesajlar
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              {/* <Button.Group>
                <Button>Giriş yap</Button>
                <Button.Or text="" />
                <Button positive>Kayıt Ol</Button>
              </Button.Group>
            */}
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
