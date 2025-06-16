import React from "react";
import "../styles/frame.module.css";
import Button from "./button";

const Frame = ({ children }) => {
    return(
      <div className='frame-container'>
        <div className='frame-background'>
            <div className='frame-screen'>
                {children}
            </div>
        </div>
        <div className="button-grid home-button">
          <Button type="home" />
        </div>
        <div className="button-grid card-button">
          <Button type="card" />
        </div>
        <div className="button-grid touch-button">
          <Button type="touch" />
        </div>
        <div className="button-grid email-button">
          <Button type="email" />
        </div>
      </div>  
    );
}

export default Frame;