import React from "react";
import styles from './styles/Paginado.module.css'

export default function Paginado({videogamesPerPage, allVideogames, paginado}){
    const pageNumbers = []; 

    for ( let i=0; i<Math.ceil(allVideogames/videogamesPerPage); i++){
        pageNumbers.push(i + 1); 
    }

    return (
        <ul className={styles.ul_paginado}>
            {pageNumbers &&
                pageNumbers.map(n => (
                    <li key={n}>
                        <button className={styles.li_paginado} onClick={() => paginado(n)}>{n}</button>
                    </li>
                ))}
        </ul>
    )
}