import React from "react";
import {Link} from "react-router-dom" 
import styles from '../components/styles/LandingPage.module.css'
import image from '../images/escudo_1.jpg'


export default function LandingPage(){
    return (
        <div className={styles.divppal_landing}>
            <div>
                <img className={styles.img_landing} src={image}/>
            </div>
            <article className={styles.divlink_landing}>
                <Link to="/home" className={styles.link_landing}>
                    START
                </Link> 
            </article>
        </div>
    )
}