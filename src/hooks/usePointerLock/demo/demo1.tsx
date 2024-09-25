import usePointerLock from "..";
import { useState, useEffect } from "react";

const Demo1 = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const { isLocked, requestPointerLock, exitPointerLock } = usePointerLock({
        onLock: () => {
            console.log('Pointer Lock Change');
        },
        onError: () => {
            console.log('Pointer Lock Error');
        },
        onExit: () => {
            console.log('Pointer Lock Exit');
        },
        onMove: (_position) => {
            setPosition(_position);
        }
    });
   

    return (
        <div>
            <button onClick={() => requestPointerLock(document.body)}>Request Pointer Lock</button>
            <button onClick={exitPointerLock}>Exit Pointer Lock</button>
            <p>Pointer Lock is {isLocked ? 'enabled' : 'disabled'}.</p>
            <p>Position: {`X: ${position.x}, Y: ${position.y}`}</p>
            {isLocked && <div style={{ position: 'fixed', top: position.y, left: position.x, width: '10px', height: '10px', backgroundColor: 'red', borderRadius: '50%' }} />}
        </div>
    );
};

export default Demo1;