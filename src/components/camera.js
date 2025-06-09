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
            screenshotFormat="image/png"
            videoConstraints={videoConstraints}
            style={{
                position: "fixed",
                bottom: "5vw",
                right: "5vw",
                width: "30vw",
                height: "30vw",
                borderRadius: "3vw",
                boxShadow: "0 0 3vw #ccc",
                transform: "scaleX(-1)",
                zIndex: 1000,
            }}
            {...props}
        />
    );
});

export default Camera;
