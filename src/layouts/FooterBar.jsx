import React from "react";
import { Container, List, Segment } from "semantic-ui-react";

export default function FooterBar() {
  return (
    <div>
      <Segment
        inverted
        vertical
        style={{ margin: "1em 0em 0em", padding: "1em 0em" }}
        verticalAlign="bottom"
      >
        <Container textAlign="center">
          <List horizontal inverted divided link size="small">
            <List.Item as="a" href="#">
              Site Map
            </List.Item>
            <List.Item as="a" href="#">
              Contact Us
            </List.Item>
            <List.Item as="a" href="#">
              Terms and Conditions
            </List.Item>
            <List.Item as="a" href="#">
              Privacy Policy
            </List.Item>
          </List>
        </Container>
      </Segment>
    </div>
  );
}
