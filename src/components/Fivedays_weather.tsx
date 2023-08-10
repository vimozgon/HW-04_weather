import * as React from "react";
import  { useState } from "react";
import axios from "axios";
import "../styles/Widget.css";

function Fivedays(props) {
    return (
        <div className="widget">
            <div className="panel">
                <div className="date">
                    {props.day === 0 && "Сегодня"}
                    {props.day === 1 && "Завтра"}
                    {props.day === 2 && "После завтра"}
                    {((props.day < 5) && (props.day > 2)) && `Через ${props.day} дня` }
                </div>
                <div className="temp">
                   <img src={`https://openweathermap.org/img/wn/${props.icon}.png`} alt="" width="70"/>
                   {Math.round(props.temp)}&deg;
                </div>
            </div>
        </div>
    );
};

export default Fivedays;

