import React, { useState } from "react";
import MiddleMenu from "./Sections/MiddleMenu";
import { Drawer, Button, Icon } from "antd";
import styles from "./MiddleBar.module.css";

function MiddleBar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className={styles.menu}>
      <div className="menu__container">
        <div className={styles.menuInside}>
          <MiddleMenu mode="horizontal" />
        </div>

        <Button
          className={styles.menu__mobile_button}
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className={styles.menu_drawer}
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <MiddleMenu mode="inline" />
        </Drawer>
      </div>
    </div>
  );
}

export default MiddleBar;
