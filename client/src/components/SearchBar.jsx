import React from "react";
import {useState} from 'react'; 
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../actions";
import styles from './styles/SearchBar.module.css'

export default function SearchBar(){
    const dispatch = useDispatch(); 
    const [name, setName] = useState(""); 

    function handleSearch(e){
        e.preventDefault();
        setName(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameVideogames(name))
        setName("")
    }
    return(
        <div className={styles.divppal_searchbar}>
            <input
                value={name}
                type = 'text'
                placeholder = 'Search...'
                onChange = {(e) => handleSearch(e)}
                className={styles.inputsearch_searchbar}
            />
            <button
                className={styles.buttonsearch_searchbar}
                type = 'submit' 
                onClick={(e) => handleSubmit(e)
            }>SEARCH</button>
        </div>
    )
}