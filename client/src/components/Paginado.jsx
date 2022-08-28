import React from "react";

export default function Paginado({videogamesPerPage, allVideogames, paginado}){
    const pageNumbers = []; 

    for ( let i=0; i<=Math.ceil(allVideogames/videogamesPerPage); i++){
        pageNumbers.push(i); 
    }

    return (
        <nav>
            <ul>
                { pageNumbers && 
                pageNumbers.map( n => (
                    <li key={n}>
                        <a onClick={()=> paginado(n)}>{n}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}