import React from "react";
import { useState, useEffect } from 'react';
import {postVideogame, getGenres} from '../actions/index'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useHistory } from "react-router-dom";
import styles from './styles/VideogameCreated.module.css'

export default function VideogameCreate(){
    const dispatch = useDispatch();
    const history = useHistory(); 
    const genres = useSelector((state) => state.genres);
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        platforms: [],
        genres: [],
        background_image: "",
    })
    function validate(input){
        let errors = {}; 
        if (!input.name){
            errors.name = 'The field name cannot be empty.' 
        }
        //VER SI SE AGREGA UNA FECHA DE CREACION ALEATORIA 
        else if(!input.released){
            errors.released = 'The field released cannot be empty.'
        }
        //AGREGAR UN RATING PREDETERMINADO
        else if(!input.rating){
            errors.rating = 'The field rating cannot be empty.' 
        }
        else if(!input.description){
            errors.description = 'The field description cannot be empty.'
        }
        //AGREGAR UNA IMAGEN 
        else if(!input.image){
            errors.image = 'If the field is empty, a default image will be selected.'
        }
        else if(!input.genres){
            errors.genres = 'You must select at least one genre.'
        }
        else if(!input.platforms){
            errors.platforms = 'You must select at least one platform.'
        }
        return errors
    }

    useEffect(() => {
        dispatch(getGenres()); 
    }, [])

    function handleChange(e){
        setInput({
            ...input, 
        [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }
    function handleSelect(e){
        console.log('genres', genres)
        setInput({
            ...input, 
            genres:[...input.genres, e.target.value]
        })
    }
    function handleSelectPlat(e){
        setInput({
            ...input, 
            platforms:[...input.platforms, e.target.value]
        })
    }
    function handleDeleteGenres(e){
        const inputF = input.genres.filter(g => g !== e)
        setInput({
            ...input,
            genres: inputF
        })
    }
    function handleDeletePlatforms(ev){
        const inputFilter = input.platforms.filter(p => p !== ev)
        setInput({
            ...input, 
            platforms: inputFilter
        })
    }


    function handleSubmit(e){
        e.preventDefault();

        if(!input.name){
            return alert('Enter game name');
        }else if(!input.released){
            return alert('Enter a released date');
        }else if(!input.rating) {
            return alert('Enter a rating from 0 to 5 (Integer or Float)');
        }else if(!input.description) {
            return alert('');
        }else if(!input.genres.length){
            return alert('Select at least 1 genres');
        }else if(!input.platforms.length){
            return alert('Select at least 1 platform');}
        
        dispatch(postVideogame(input))
        setInput({
            name: "",
            description: "",
            released: "",
            rating: "",
            platforms: [],
            genres: [],
            background_image: "",
        })
        alert('Videogame created succesfully!')
        history.push('/home')
    }

    // REALIZAR UN ALERTA DE QUE SE CREO EL PERSONAJE. 
    // AGREGAR ESPACIO A LOS GÉNEROS Y PLATAFORMAS. 
    
    return(
        <div>
            <Link className={styles.link_home_videogamecreate}to="/home">HOME</Link>
            <h1 className={styles.h1_videogamecreate}>Videogame Creation!</h1>
            <form className={styles.form_videogamecreate}onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.divcreate_videogamecreate}>
                    <label className={styles.label_videogamecreate}>NAME:</label>
                    <input
                        className={styles.inputcreate_videogamecreate}
                        type= 'text'
                        value={input.name}
                        name= 'name'
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.name && (
                        <p className={styles.errors_videogamecreate}>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label className={styles.label_videogamecreate}>DESCRIPTION:</label>
                    <input
                        className={styles.inputcreate_videogamecreate}
                        type= 'text'
                        value={input.description}
                        name= 'description'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label className={styles.label_videogamecreate}>RELEASED:</label>
                    <input
                        className={styles.inputcreate_videogamecreate}
                        type= 'date'
                        value={input.released}
                        name= 'released'
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.released && (
                        <p className={styles.errors_videogamecreate}>{errors.released}</p>
                    )}
                </div>
                <div>
                    <label className={styles.label_videogamecreate}>RATING:</label>
                    <input
                        className={styles.inputcreate_videogamecreate}
                        type= 'number'
                        min='1'
                        max='5'
                        value={input.rating}
                        name= 'rating'
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.rating && (
                        <p className={styles.errors_videogamecreate}>{errors.rating}</p>
                    )}
                </div>
                <div>
                    <label className={styles.label_videogamecreate}>IMAGE:</label>
                    <input
                        className={styles.inputcreate_videogamecreate}
                        type= 'text'
                        value={input.background_image}
                        name= 'background_image'
                        onChange={(e) => handleChange(e)}
                    />
                    {/* {errors.image && (
                        <p>{errors.image}</p>
                    )} */}
                </div>
                <div>
                    <label className={styles.label_videogamecreate}>PLATFORMS:</label>
                    <select className={styles.inputcreate_videogamecreate} onChange={(e) => handleSelectPlat(e)}>
                        <option></option>
                        <option>PC</option>
                        <option>Play Station 3</option>
                        <option>Play Station 4</option>
                        <option>Play Station 5</option>
                        <option>Xbox One</option>
                        <option>Xbox Series S/X</option>
                        <option>Xbox 360</option>
                        <option>iOS</option>
                        <option>Android</option>
                        <option>macOS</option>
                        <option>Linux</option>
                        <option>Nintendo Switch</option>
                        <option>Nintendo 3DS</option>
                        <option>Nintendo DS</option>
                        <option>Nintendo DSi</option>
                    </select>
                    <div style={{display:'flex'}}>{input.platforms.map(el => (
                            <div className={styles.div_inputs_videogamecreate}>
                                <h4 className={styles.h4_input_videogamecreate}>{el}</h4>
                                <button 
                                    className={styles.button_input_videogamecreate} 
                                    onClick={() => handleDeletePlatforms(el)}
                                >X</button>
                            </div>))}
                    </div>
                    {errors.platforms && (
                        <p className={styles.errors_videogamecreate}>{errors.platforms}</p>
                    )}

                </div>
                <div>
                    <label className={styles.label_videogamecreate}>GENRES:</label>
                    <select className={styles.inputcreate_videogamecreate} onChange={(e) => handleSelect(e)}>
                        {genres.map((g) => (
                            <option value={g.name}>{g.name}</option>
                        ))}
                    </select>
                    <div style={{display:'flex'}}>{input.genres.map(el => (
                            <div className={styles.div_inputs_videogamecreate}>
                                <h4 className={styles.h4_input_videogamecreate}>{el}</h4>
                                <button 
                                    className={styles.button_input_videogamecreate} 
                                    onClick={() => handleDeleteGenres(el)}
                                >X</button>
                            </div>))}
                    </div>
                    {errors.genres && (
                        <p className={styles.errors_videogamecreate}>{errors.genres}</p>
                    )}
                </div>
                <button
                    className={styles.button_videogamescreate}
                    type='submit'
                >
                CREATE VIDEOGAME</button>
            </form>
        </div>
    )}