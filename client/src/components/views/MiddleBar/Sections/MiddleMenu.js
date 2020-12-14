import React from "react";
import { Menu } from "antd";
import styles from "./MiddleMenu.module.css";
const SubMenu = Menu.SubMenu;

const MenuItemGroup = Menu.ItemGroup;

function MiddleMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/">BEST</a>
      </Menu.Item>
      <Menu.Item key="BOOK">
        <a href="/">NEW~20%</a>
      </Menu.Item>
      <Menu.Item key="CS">
        <a href="/">CODISET</a>
      </Menu.Item>
      <SubMenu title={<span>TOP</span>}>
        {/* <MenuItemGroup title="SWEATSHIRT&HOODIE" />
        <MenuItemGroup title="KNIT" />
        <MenuItemGroup title="LONG SLEEVED" />
        <MenuItemGroup title="SLEEVELESS" />
        <MenuItemGroup title="SHORT SLEEVED" />
        <MenuItemGroup title="PRINTING" /> */}
        <Menu.Item key="setting:1">
          <a href="/">SWEATSHIRT</a>
        </Menu.Item>
        <Menu.Item key="setting:2">
          <a href="/">KNIT</a>
        </Menu.Item>
        <Menu.Item key="setting:3">
          <a href="/">LONG SLEEVED</a>
        </Menu.Item>
        <Menu.Item key="setting:4">
          <a href="/">SLEEVELESS</a>
        </Menu.Item>
        <Menu.Item key="setting:5">
          <a href="/">SHORT SLEEVED</a>
        </Menu.Item>
        <Menu.Item key="setting:6">
          <a href="/">PRINTING</a>
        </Menu.Item>
      </SubMenu>
      <SubMenu title={<span>PANTS</span>}>
        <Menu.Item key="setting:1">
          <a href="/">SLACKS</a>
        </Menu.Item>
        <Menu.Item key="setting:2">
          <a href="/">COTTON</a>
        </Menu.Item>
        <Menu.Item key="setting:3">
          <a href="/">JEANS</a>
        </Menu.Item>
        <Menu.Item key="setting:5">
          <a href="/">BANDING</a>
        </Menu.Item>
        <Menu.Item key="setting:6">
          <a href="/">SHORTS</a>
        </Menu.Item>
      </SubMenu>
      <SubMenu title={<span>SHIRTS</span>}>
        <Menu.Item key="setting:1">
          <a href="/">BASIC</a>
        </Menu.Item>
        <Menu.Item key="setting:2">
          <a href="/">DENIM SHIRTS</a>
        </Menu.Item>
        <Menu.Item key="setting:3">
          <a href="/">CHECK&PATTERNS</a>
        </Menu.Item>
        <Menu.Item key="setting:5">
          <a href="/">STRIPE</a>
        </Menu.Item>
        <Menu.Item key="setting:6">
          <a href="/">HENLE NECK&CHINA</a>
        </Menu.Item>
      </SubMenu>
      <SubMenu title={<span>OUTER</span>}>
        <Menu.Item key="setting:1">
          <a href="/">PADDING</a>
        </Menu.Item>
        <Menu.Item key="setting:2">
          <a href="/">COAT</a>
        </Menu.Item>
        <Menu.Item key="setting:3">
          <a href="/">SUIT&BLAZER</a>
        </Menu.Item>
        <Menu.Item key="setting:5">
          <a href="/">JACKETS</a>
        </Menu.Item>
        <Menu.Item key="setting:5">
          <a href="/">JACKETS/MA-1</a>
        </Menu.Item>
        <Menu.Item key="setting:6">
          <a href="/">CARDIGAN&VEST</a>
        </Menu.Item>
        <Menu.Item key="setting:6">
          <a href="/">HOODIE&ZIPUP</a>
        </Menu.Item>
      </SubMenu>
      <SubMenu title={<span>SHOES</span>}>
        <Menu.Item key="setting:1">
          <a href="/">SNEAKERS</a>
        </Menu.Item>
        <Menu.Item key="setting:2">
          <a href="/">LOAFER&SHOES</a>
        </Menu.Item>
        <Menu.Item key="setting:3">
          <a href="/">HEIGHT-HIGH SHOES</a>
        </Menu.Item>
        <Menu.Item key="setting:5">
          <a href="/">SLIPPER&FLIP-FLOP</a>
        </Menu.Item>
      </SubMenu>
      <SubMenu title={<span>BAG</span>}>
        <Menu.Item key="setting:1">
          <a href="/">BACKPACK</a>
        </Menu.Item>
        <Menu.Item key="setting:2">
          <a href="/">TOTE&SHOULDER</a>
        </Menu.Item>
        <Menu.Item key="setting:3">
          <a href="/">CROSS BAG</a>
        </Menu.Item>
        <Menu.Item key="setting:5">
          <a href="/">CLUTCH</a>
        </Menu.Item>
      </SubMenu>
      <SubMenu title={<span>ACC</span>}>
        <Menu.Item key="setting:1">
          <a href="/">SOCKS&NECKTIE</a>
        </Menu.Item>
        <Menu.Item key="setting:2">
          <a href="/">HAT</a>
        </Menu.Item>
        <Menu.Item key="setting:3">
          <a href="/">MUFFLER&GLOVES</a>
        </Menu.Item>
        <Menu.Item key="setting:5">
          <a href="/">EYEWEAR</a>
        </Menu.Item>
        <Menu.Item key="setting:5">
          <a href="/">BELT&WATCH</a>
        </Menu.Item>
        <Menu.Item key="setting:5">
          <a href="/">ETC</a>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="LIFE">
        <a href="/">LIFE</a>
      </Menu.Item>
      <Menu.Item key="BIG">
        <a href="/">BIG</a>
      </Menu.Item>
      <Menu.Item key="SAME">
        <a href="/">
          <span className={styles.Sameday}>SAME DAY SHIPPING</span>
        </a>
      </Menu.Item>
    </Menu>
  );
}

export default MiddleMenu;
