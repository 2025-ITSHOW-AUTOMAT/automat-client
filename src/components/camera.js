import React, { forwardRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 1000,
    height: 1000,
    facingMode: "user",
};

const Camera = forwardRef((props, ref) => {
    return (
        <Webcam
            audio={false}
            ref={ref}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                width: "150px",
                height: "150px",
                borderRadius: "10px",
                boxShadow: "0 0 10px #ccc",
                transform: "scaleX(-1)",
                zIndex: 1000,
            }}
            {...props}
        />
    );
});

export default Camera;
