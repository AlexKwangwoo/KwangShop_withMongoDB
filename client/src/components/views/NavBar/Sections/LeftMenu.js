import React from "react";
import { Menu } from "antd";
import "./LeftMenu.css";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    // <div className="LeftBox">
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item key="BOOK">
        <a href="/">+BOOKMARK</a>
      </Menu.Item>
      <Menu.Item key="CS">
        <a href="/">CS CENTER</a>
      </Menu.Item>
      <Menu.Item key="EVENT">
        <a href="/">EVENT</a>
      </Menu.Item>
      <Menu.Item key="REVIEW">
        <a href="/">REVIEW</a>
      </Menu.Item>
      <Menu.Item key="MEMBER">
        <a href="/">MEMBERSHIP</a>
      </Menu.Item>
      {/* <SubMenu title={<span>Blogs</span>}>
        <MenuItemGroup title="Item 1">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </MenuItemGroup>
      </SubMenu> */}
    </Menu>
    // </div>
  );
}

export default LeftMenu;
