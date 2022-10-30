import React from 'react';

const Die = ({num, isHeld, hold}) => {
    return (
        <div className={isHeld?"die held":"die"} onClick={hold}>
            <h1>{num}</h1>
        </div>
    );
}
export default Die;

