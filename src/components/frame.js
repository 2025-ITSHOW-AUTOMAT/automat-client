import React from "react";
import styles from "../styles/frame.module.css";
import Button from "./button";

const Frame = ({ children }) => {
    return(
      <div className={styles.frameContainer}>
        <div className={styles.frameBackground}>
            <div className={styles.frameScreen}>
                {children}
            </div>
        </div>
        <div className={`${styles.buttonGrid} ${styles.homeButton}`}>
          <Button type="home" />
        </div>
        <div className={`${styles.buttonGrid} ${styles.cardButton}`}>
          <Button type="card" />
        </div>
        <div className={`${styles.buttonGrid} ${styles.touchButton}`}>
          <Button type="touch" />
        </div>
        <div className={`${styles.buttonGrid} ${styles.emailButton}`}>
          <Button type="email" />
        </div>
      </div>  
    );
}

export default Frame;