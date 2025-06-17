import React, { useEffect, useState } from "react";

const TypingDots = ({
        text = "로딩중",
        interval = 500,
        maxDots = 3,
        style = {}
    }) => {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const timer = setInterval(() => {
            setDots(prev => (prev.length >= maxDots ? "" : prev + "."));
        }, interval);

        return () => clearInterval(timer);
    }, [interval, maxDots]);

    return (
        <p style={{
            fontFamily: "Pretendard",
            fontSize: "2.5vw",
            textAlign: "center",
            ...style,
        }}>
            {text}{dots}
        </p>
    );
};

export default TypingDots;
