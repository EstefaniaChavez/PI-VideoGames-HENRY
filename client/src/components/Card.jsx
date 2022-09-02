import React from "react";
import styles from "./styles/Card.module.css"


//VER SI SE PUEDE AGREGAR LAS PLATAFORMAS A LAS CARTAS. 

export default function Card({name, background_image, rating, genres}){
    return (
        <article className={styles.divppal_card}>
            <img className={styles.img_card} src={background_image} alt='IMG NOT FOUND' />
            <h3 className={styles.h3_card}>{name}</h3>
            <h5 className={styles.h5_genres_card}>{genres}</h5>
            <h5 className={styles.h5_rating_card}>{rating}</h5>
        </article>
    )
}