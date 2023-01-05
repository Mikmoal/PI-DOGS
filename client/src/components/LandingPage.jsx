import React from "react";
import { Link } from "react-router-dom";
import enter from "../img/welcome.png";
import dogs from "../img/dogsapp.png";
import style from "../css/landing.module.scss";

export default function LandingPage() {

    return (
        <div className={style.fondo}>
            <div className={style.containerT} >
                <img src={dogs} className={style.img_Title} width="600vw" alt='dogsTitle' />
            </div>

            <div className={style.containerW} >
                <Link to={'/home'}>
                    <img src={enter} className={style.welcome} width="200vw" alt='welcome' />
                </Link>
            </div>
        </div>
    )
}