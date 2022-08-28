import React from "react";
import {useState, useEffect} from 'react'; 
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, filterGamesByGenre, filterGamesByOrigin, orderByName } from "../actions";
import {Link} from 'react-router-dom'
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home(){

    const dispatch = useDispatch(); 
    const allVideogames = useSelector((state) => state.videogames)
    const [orden, setOrden] = useState('')

    //<-------- PAGINATE -------->
    const [currentPage, setCurrentPage]=useState(1); 
    const [videogamesPerPage, setVideogamesPerPage]= useState(15);
    const indexOfLastGame = currentPage * videogamesPerPage; 
    const indexOfFirstGame = indexOfLastGame - videogamesPerPage; 
    const currentVideogames = allVideogames.slice(indexOfFirstGame, indexOfLastGame); 
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber); 
    }
    
    useEffect(() => {
        dispatch(getVideogames()); 
    }, [])

    function handleClick(e){
        e.preventDefault(); 
        dispatch(getVideogames())
    }

    function handleFilterByGenre(e){
        dispatch(filterGamesByGenre(e.target.value))
    }
    function handleFilterByOrigin(e){
        dispatch(filterGamesByOrigin(e.target.value))
    }
    function handleSort(e){
        e.preventDefault(); 
        dispatch(orderByName(e.target.value))
        setCurrentPage(1); 
        setOrden(`Ordenado ${e.target.value}`)
    }


    return (
        <div>
            <Link to='/videogames'>Crear juegos</Link>
            <h1>AUN NO TENGO EL NOMBRE</h1>
            <button onClick={e => {handleClick(e)}}>
                All games
            </button> 
            <div>
                {/* <-----ALPHABET-FILTER-----> */}
                <select onChange={e => handleSort(e)}>
                    <option value='All'>ALL</option>
                    <option value='Asc'>ASCENDENTE</option>
                    <option value='Des'>DESCENDENTE</option> 
                </select>

                {/* <-----GENRE-FILTER-----> */}
                <select onChange={e => handleFilterByGenre(e)}>
                    <option value='All'>All</option>
                    <option value='Action'>Action</option>
                    <option value='Adventure'>Adventure</option>
                    <option value='Arcade'>Arcade</option>
                    <option value='Board Games'>Board Games</option>
                    <option value='Card'>Card</option>
                    <option value='Casual'>Casual</option>
                    <option value='Education'>Educational</option>
                    <option value='Family'>Family</option>
                    <option value='Fighting'>Fighting</option>
                    <option value='Indie'>Indie</option>
                    <option value='Massively Multiplayer'>Massively Multiplayer</option>
                    <option value='Platformer'>Platformer</option>
                    <option value='Puzzle'>Puzzle</option>
                    <option value='Racing'>Racing</option>
                    <option value='RPG'>RPG</option>
                    <option value='Shooter'>Shooter</option>
                    <option value='Simulation'>Simulation</option>
                    <option value='Sports'>Sports</option>
                    <option value='Strategy'>Strategy</option>
                </select>
                {/* <-----EXISTING-FILTER-----> */}
                <select onChange={e => handleFilterByOrigin(e)}>
                    <option value='All'>All Games</option>
                    <option value='Exist'>Existing Games</option>
                    <option value='Created'>Created Games</option>
                </select>
                {/* <-----RATING-FILTER-----> */} 
                <select>
                    <option value='All'>All</option>
                    <option value='Best'>Best Games</option>
                    <option value='Worst'>Worst Games</option> 
                </select>
            </div>
            {
                (currentVideogames? currentVideogames.map( el =>{
                    return (
                        <div>
                            <Card key={el.id} name={el.name} background_image={el.background_image} genre={el.genre} rating={el.rating}/>
                        </div>
                )}) : <p>Loading...</p> )
            }
            <Paginado
            videogamesPerPage={videogamesPerPage}
            allVideogames={allVideogames.length}
            paginado={paginado} />
        </div>
    )

}