import React from 'react';

const Die = ({num, isHeld, hold}) => {
    return (
        //if isHeld === true then add classname "held" 
        <div className={isHeld?"die held":"die"} onClick={hold}>
            <h1>{num}</h1>
        </div>
    );
}
export default Die;

