import React from "react";
import {useState, useEffect} from 'react'; 
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, filterGamesByGenre, filterGamesByOrigin, orderByName, orderByRating } from "../actions";
import {Link} from 'react-router-dom'
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import styles from './styles/Home.module.css'

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
    function handleSortRating(e){
        e.preventDefault(); 
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado${e.target.value}`)
    }


    return (
        <div style={{background: 'black'}}>
            <div className={styles.div_superior_home}>
                <h1 className={styles.h1_titulo_home}> ULTRA WOLF </h1>
                <Link className={styles.creategames_home} to='/videogames'>Create Game</Link>
                <button className={styles.allgames_home}onClick={e => {handleClick(e)}}>
                    All games
                </button> 
            </div>
            <SearchBar/>
            <div className={styles.divppal_filter_home}>
                {/* <-----ALPHABET-FILTER-----> */}
                <select onChange={e => handleSort(e)} className={styles.filters_order_home}>
                    <option>ALPHABETIC</option>
                    <option value='Asc'>A - Z</option>
                    <option value='Des'>Z - A</option> 
                </select>

                {/* <-----GENRE-FILTER-----> */}
                <select onChange={e => handleFilterByGenre(e)} className={styles.filters_order_home}>
                    <option> GENRES</option>
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
                <select onChange={e => handleFilterByOrigin(e)} className={styles.filters_order_home}>
                    <option>ORIGIN</option>
                    <option value='All'>All Games</option>
                    <option value='Exist'>Existing Games</option>
                    <option value='Created'>Created Games</option>
                </select>
                {/* <-----RATING-FILTER-----> */} 
                <select onChange={e => handleSortRating(e)} className={styles.filters_order_home}>
                    <option>RATING</option>
                    <option value='Best'>Best Games</option>
                    <option value='Worst'>Worst Games</option> 
                </select>
            </div>
            <div className={styles.card_home}>
                {
                    (currentVideogames? currentVideogames.map( el =>{
                        return (
                            <div key={el.id} className={styles.onecard_home} >
                                <Link className={styles.linkcard_home} to={`/videogames/${el.id}`}>
                                    <Card key={el.id} name={el.name} background_image={el.background_image} genres={el.genres.join(', ')} rating={el.rating}/>
                                </Link>
                            </div>
                
                    )}) : null)
                }
            <>
            <div style={{backgroundColor:'black', width: "100%"}}>
                {currentVideogames.length < 1? (
                    <div style={{height:'50vh'}}>
                        <div className={styles.spinner}></div>
                    </div>
                ):
                <button
                className={styles.button_subir_home}
                onClick={() => window.scrollTo({top: 0, behavior:'smooth'})}
                > GO UP
                </button> 
            }
            </div>
            </>
         
            </div>
            <Paginado
            videogamesPerPage={videogamesPerPage}
            allVideogames={allVideogames.length}
            paginado={paginado} />
        </div>
    )

}