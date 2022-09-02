import React from "react";
import {Link} from 'react-router-dom'; 
import {useDispatch, useSelector} from 'react-redux';
import { getDetail, resetDetail } from "../actions";
import { useEffect } from "react";
import styles from './styles/VideogameDetail.module.css'

export default function Detail({id}){
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(getDetail(id)); 
        return function cleanup(){
            dispatch(resetDetail())
        }; 
    }, [dispatch])

    const videogameDetail = useSelector((state) => state.detail);
    console.log('->', Object.entries(videogameDetail));

    return (
    <div className={styles.divconteiner_videogamedetail}>
        <Link className={styles.link_home_videogamedetail} to='/home'>
            HOME
        </Link>
        {
            Object.entries(videogameDetail).length ?
            <div >
                <div className={styles.divppal_detail}>
                    <article className={styles.asidefirst_details}>
                        <h1 className={styles.h1_videogamedetail}>{videogameDetail.name}</h1>
                        <img className={styles.img_videogamedetail} src={videogameDetail.background_image} alt="There are not pictures for this game"/>
                        <div style={{display:'flex', alignContent:'center'}}>
                            <h3 className={styles.h2genre_details}>RATING:</h3>
                            <p className={styles.p_rating_details}>{videogameDetail.rating}</p>
                        </div>
                        <div style={{display:'flex', alignContent:'center'}}>
                            <h3 className={styles.h2genre_details}>PLATFORMS:</h3>
                            <p className={styles.p_plat_details}>{videogameDetail.platforms.join(', ')}</p>
                        </div>
                    </article>
                    <article className={styles.aside_details}>
                        <div style={{display:'flex', alignContent:'center'}}>
                            <h2 className={styles.h2genre_details}>GENRES:</h2>
                            <p className={styles.p_genres_details}>{videogameDetail.genres.join(', ')}</p>
                        </div>
                        <div style={{display:'flex', alignContent:'space-around', flexDirection:'column'}}>
                            <h2 className={styles.h2_desc_details} >DESCRIPTION:</h2>
                            <p className={styles.p_desc_details}>{videogameDetail.description }</p>
                        </div>
                    </article>
                </div>
                <h3 className={styles.h2_details}>RELEASED:{videogameDetail.released}</h3>
                <h3>RATING:{videogameDetail.rating}</h3>
                <h3>PLATFORMS:{videogameDetail.platforms.join(', ')}</h3>
                <h3 className={styles.h2_details}>NAME ORIGINAL:{videogameDetail.name_original}</h3>
            </div> : 
                <div className={styles.spinner}></div>
                // <p>LOADING...</p>
        }
    </div>
    )
}