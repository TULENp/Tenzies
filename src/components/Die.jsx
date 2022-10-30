import React from 'react';

const Die = (props) => {

    //const [num, usHeld] = props;
    return (
        <div className={props.isHeld?"held":"die"}>
            <h1>{props.num}</h1>
        </div>
    );
}
export default Die;

