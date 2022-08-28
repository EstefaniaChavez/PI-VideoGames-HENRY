import React from "react";


//VER SI SE PUEDE AGREGAR LAS PLATAFORMAS A LAS CARTAS. 

export default function Card({name, background_image, rating, genre}){
    return (
        <div>
            <h3>{name}</h3>
            <h5>{rating}</h5>
            <h5>{genre}</h5>
            <img src={background_image} alt='IMG NOT FOUND' />
        </div>
    )
}