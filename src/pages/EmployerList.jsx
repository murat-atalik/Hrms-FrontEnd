import React, { useEffect, useState } from "react";
import { Icon, Menu, Table } from "semantic-ui-react";
import EmployerService from "../services/employerService";

export default function EmployeeList() {
  const [employers, setEmployers] = useState([]);
  useEffect(() => {
    let employerService = new EmployerService();
    employerService
      .getEmployer()
      .then((result) => setEmployers(result.data.data));
  }, []);
  return (
    <div>
      <Table selectable striped celled color="red">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
            <Table.HeaderCell>Websitesi</Table.HeaderCell>
            <Table.HeaderCell>Mail adresi</Table.HeaderCell>
            <Table.HeaderCell>Telefon numarası</Table.HeaderCell>
            <Table.HeaderCell>İncele</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {employers.map((employer) => {
            return (
              <Table.Row key={employer.id}>
                <Table.Cell>{employer.company?.companyName}</Table.Cell>
                <Table.Cell>
                  <a
                    href={"https://" + employer.company?.webAddress}
                    target={"_blank"}
                    rel="noopener noreferrer"
                  >
                    {employer.company?.webAddress}
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <a
                    href={"mailto:" + employer.email}
                    target={"_blank"}
                    rel="noopener noreferrer"
                  >
                    {employer.email}
                  </a>
                </Table.Cell>
                <Table.Cell>{employer.phoneNumber}</Table.Cell>
                <Table.Cell>
                  <a
                    href={"https://www.youtube.com"}
                    target={"_blank"}
                    rel="noopener noreferrer"
                  >
                    <Icon name="search" color="grey" dize="big" />
                  </a>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="5">
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
