import React from "react";
    
const Button = (props) => {
    return (     
        <button onClick={props.handleClick} value={props.country}> {props.text} </button>
    )
}
    
export default Button