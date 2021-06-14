import React, { useState, useEffect } from "react";
import { Icon, Menu, Table } from "semantic-ui-react";
import StaffService from "../services/staffService";

export default function StaffList() {
  const [staffs, setStaffs] = useState([]);
  useEffect(() => {
    let staffService = new StaffService();
    staffService.getStaffs().then((result) => setStaffs(result.data.data));
  }, []);
  return (
    <div>
      <Table striped celled color="black">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Adı</Table.HeaderCell>
            <Table.HeaderCell>Soyadı</Table.HeaderCell>
            <Table.HeaderCell>E-Posta adresi</Table.HeaderCell>
            <Table.HeaderCell>Yetki Seviyesi</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {staffs.map((staff) => {
            return (
              <Table.Row key={staff.id}>
                <Table.Cell>{staff.firstName}</Table.Cell>
                <Table.Cell>{staff.lastName}</Table.Cell>
                <Table.Cell>
                  <a
                    href={"mailto:" + staff.email}
                    target={"_blank"}
                    rel="noopener noreferrer"
                  >
                    {staff.email}
                  </a>
                </Table.Cell>
                <Table.Cell>{staff.role?.roleName}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
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
