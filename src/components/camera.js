import React, { forwardRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    aspectRatio: 1.3333,
    facingMode: "user",
};

const Camera = ({webcamRef}) => {
    return (
        <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            videoConstraints={videoConstraints}
            style={{
                width: "100%",
                height: "100%",
                objectFit: 'cover'
            }}
        />
    );
};

export default Camera;
