import React from "react";

const Weather = (props) => {
    const data = Object.values(props)
    return(
        <div>
            <h2>Weather in {data[0].name}</h2>
            <div>
                <b>temperature:</b> {Math.round((data[0].main.temp - 273.15)*10)/10} celsius
            </div>
            <div>
                <b>description:</b> {data[0].weather[0].description}
            </div>
            <div>
                <b>wind:</b> {data[0].wind.speed} m/s direction {data[0].wind.deg} deg
            </div>
        </div>     
    )
}

export default Weather

