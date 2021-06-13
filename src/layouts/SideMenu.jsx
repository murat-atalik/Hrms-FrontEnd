import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";

export default function SideMenu() {
  return (
    <div>
      <Menu compact icon="labeled" inverted vertical>
        <Menu.Item as={NavLink} to="/employer">
          <Icon name="briefcase" />
          İş veren
        </Menu.Item>
        <Menu.Item as={NavLink} to="/candidate">
          <Icon name="users" />
          Çalışan
        </Menu.Item>
        <Menu.Item as={NavLink} to="/cv" name="Özgeçmişler">
          <Icon name="address book" />
          Özgeçmişler
        </Menu.Item>
        <Menu.Item as={NavLink} to="/job" name="İş pozisyonları">
          <Icon name="file alternate" />
          İş pozisyonları
        </Menu.Item>
        <Menu.Item as={NavLink} to="/staff" name="Sistem personelleri">
          <Icon name="cogs" />
          Sistem personelleri
        </Menu.Item>
      </Menu>
    </div>
  );
}
