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
export function getNameVideogames(name){
    return async function (dispatch){
        try{
            let json = await axios.get("http://localhost:3001/videogames?name=" + name)
            return dispatch({
                type: 'GET_NAME_VIDEOGAMES',
                payload: json.data
            })
        } catch(error){
            console.log(error) 
        }
    }
}
export function getGenres(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/genres',{})
        return dispatch({
            type: 'GET_GENRES',
            payload: json.data
        })
    }
}
export function postVideogame(payload){
    return async function(dispatch){
        const data = await axios.post('http://localhost:3001/videogames', payload);
        return data; 
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

export function orderByRating(payload){
    return{
        type: 'ORDER_BY_RATING',
        payload
    }
}

export function getDetail(id){
    return async function(dispatch){
    try{
        var json = await axios.get('http://localhost:3001/videogames/' + id); 
        console.log('aquiiiiiiiiiiiiiiiii', json.data)
        return dispatch({
            type: 'GET_VIDEOGAMES_NAME',
            payload: json.data
        })
    } catch(error){
        console.log(error)
    }}
}
export function resetDetail(){
    return{
        type: 'RESET_DETAIL',
    }
}
