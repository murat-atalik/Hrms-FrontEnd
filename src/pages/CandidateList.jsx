import React, { useState, useEffect } from "react";
import { Icon, Menu, Table } from "semantic-ui-react";
import CandidateService from "../services/candidateService";

export default function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    let candidateService = new CandidateService();
    candidateService
      .getCandidate()
      .then((result) => setCandidates(result.data.data));
  }, []);
  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Adı</Table.HeaderCell>
            <Table.HeaderCell>Soyadı</Table.HeaderCell>
            <Table.HeaderCell>Mail adresi</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {candidates.map((candidate) => {
            return (
              <Table.Row key={candidate.id}>
                <Table.Cell>{candidate.firstName}</Table.Cell>
                <Table.Cell>{candidate.lastName}</Table.Cell>
                <Table.Cell>
                  <a
                    href={"mailto:" + candidate.email}
                    target={"_blank"}
                    rel="noopener noreferrer"
                  >
                    {candidate.email}
                  </a>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
}
