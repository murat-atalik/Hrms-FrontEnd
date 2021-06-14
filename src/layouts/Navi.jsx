import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Container, Menu, Icon } from "semantic-ui-react";
import SignedIn from "./SignedIn";
import SignedOut from "./SıgnedOut";

export default function Navi() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const history = useHistory();
  function handleSignOut() {
    setIsAuthenticated(false);
    history.push("/");
  }
  function handleSignIn() {
    setIsAuthenticated(true);
  }
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
              {isAuthenticated ? (
                <SignedIn signOut={handleSignOut} />
              ) : (
                <SignedOut signIn={handleSignIn} />
              )}
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
