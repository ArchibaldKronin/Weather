import React, { Children, useState } from "react";
import { DATE_TO_SHOW_WEATHER } from "../../constants/internalConstants";

export const Weather = (props) => {

    // const [dateToShow, setDateToShow] = useState(DATE_TO_SHOW_WEATHER.TODAY)

    return (
        <>
        <p>{props.children}</p>
        </>
    )
}