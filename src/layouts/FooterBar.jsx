import React from "react";
import { Paper, Container, List, ListItem } from "@material-ui/core";
import { NavLink } from "react-router-dom";
export default function FooterBar() {
  return (
    <Paper
      style={{
        backgroundColor: "#1b1b1b",
        color: "white",
        padding: 10,
      }}
    >
      <Container>
        <List
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <ListItem component={NavLink} to="#" style={{ color: "whitesmoke" }}>
            Site Map
          </ListItem>
          <ListItem component={NavLink} to="#" style={{ color: "whitesmoke" }}>
            Contact Us
          </ListItem>
          <ListItem component={NavLink} to="#" style={{ color: "whitesmoke" }}>
            Terms and Conditions
          </ListItem>
          <ListItem component={NavLink} to="#" style={{ color: "whitesmoke" }}>
            Privacy Policy
          </ListItem>
        </List>
      </Container>
    </Paper>
  );
}
