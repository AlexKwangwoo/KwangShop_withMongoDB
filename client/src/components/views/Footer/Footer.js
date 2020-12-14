import React from "react";
import { Icon } from "antd";
import styles from "./Footer.module.css";
import Card from "../../ImageData/Card.PNG";

function Footer() {
  return (
    <div className={styles.Box}>
      <div className={styles.Foot}>
        <div className={styles.One}>
          <h5 className={styles.tSmall}>CUSTOMER CENTER</h5>
          <h1>bnc3049@gmail.com</h1>
          <h5 className={styles.hSmall}>MON-FRI : AM 10:00 ~ PM 05:00</h5>
          <h5 className={styles.hSmall}>LUNCH: PM 01:00 ~ PM 02:00</h5>
          <h5 className={styles.hSmall}>SAT, SUN, HOLIDAY OFF</h5>
          <img className={styles.card} src={Card} />
        </div>
        <div className={styles.Two}>
          <h5 className={styles.tSmall2}>QUICK MENU</h5>
          <h5 className={styles.hSmall2}>COMPANY</h5>
          <h5 className={styles.hSmall2}>AGREEMENT</h5>
          <h5 className={styles.hSmall2}>PRIVACY POLICY</h5>
          <h5 className={styles.hSmall2}>GUIDE</h5>
          <h5 className={styles.hSmall2}>EVENT</h5>
        </div>
        <div className={styles.Three}>
          <h5 className={styles.tSmall3}>ABOUT US</h5>
          <h5 className={styles.hSmall3}>KWANGSHOP</h5>
          <h5 className={styles.hSmall3}>CEO : KWANGWOO BACK</h5>
          <h5 className={styles.hSmall3}>
            Business license number : 139-89-2223333
          </h5>
          <h5 className={styles.hSmall3}>
            Address : KWANGSHOP, 6th floor, 1401 122Ave, SW, Calgary, CANADA,
            T2P-0N2
          </h5>
          <h5 className={styles.hSmall3}>
            Communication sales business report: 2011–KwangCompany–126
          </h5>
          <h5 className={styles.hSmall3}>
            Personal Information Protection Officer of Privacy : Irene [Check
            business information]
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Footer;
