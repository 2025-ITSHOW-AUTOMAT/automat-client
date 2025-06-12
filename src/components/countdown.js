import React, { useEffect, useState } from 'react';

function Countdown({ number }) {
    const [angle, setAngle] = useState(0);

    useEffect(() => {
        if (number === 0) {
            setAngle(0);
            return;
        }

        setAngle(0);
        const interval = setInterval(() => {
            setAngle((prev) => {
                const next = prev + 6;
                if (next >= 360) {
                    clearInterval(interval);
                    return 360;
                }
                return next;
            });
        }, 1000 / 60);

        return () => clearInterval(interval);
    }, [number]);

    const overlayStyle = {
        position: 'fixed',
        height: '50vh',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    };

    const numberStyle = {
        fontSize: '20vw',
        color: 'black',
        fontWeight: 500,
        zIndex: 10,
        position: 'relative',
        lineHeight: 1
    };

    const wipeStyle = {
        position: 'absolute',
        height: '50vh',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none'
    };

    return (
        <div style={overlayStyle}>
            <div style={numberStyle}>{number}</div>
            {number !== 0 && (
                <div 
                    style={{
                        ...wipeStyle,
                        background: `conic-gradient(
                            from 0deg at center,
                            transparent 0deg,
                            transparent ${angle}deg,
                            rgba(255,255,255,0.3) ${angle}deg,
                            rgba(255,255,255,0.3) 360deg
                        )`
                    }}
                />
            )}
        </div>
    );
}

export default Countdown;