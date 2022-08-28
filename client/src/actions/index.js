import axios from 'axios'; 

export function getVideogames(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/videogames', {})
        return dispatch({
            type: 'GET_VIDEOGAMES', 
            payload: json.data
        })
    }
}

export function filterGamesByGenre(payload){
    return {
        type: 'FILTER_BY_GENRE',
        payload
    }
}

export function filterGamesByOrigin(payload){
    return{
        type: 'FILTER_BY_ORIGIN',
        payload
    }
}
export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}
