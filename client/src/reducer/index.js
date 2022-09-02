
const initialState = {
    videogames : [],
    allVideogames: [],
    genres: [],
    detail: {}, 
}



function rootReducer(state = initialState, action) {
    switch(action.type){
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload,
            }
        case 'GET_NAME_VIDEOGAMES':
            return{
                ...state, 
                videogames: action.payload
            }
        case 'POST_VIDEOGAMES':
            return {
                ...state,
            }
        case 'GET_GENRES':
            return{
                ...state,
                genres: action.payload
            }
        case 'FILTER_BY_GENRE':
            const allVideogames = state.allVideogames
            console.log('videojuegos 0', allVideogames)
            const genreFiltered = action.payload === 'All' 
                                ? allVideogames 
                                : allVideogames.filter(e => e.genres.includes(action.payload))
            return {
                ...state, 
                videogames: genreFiltered
            }
        case 'FILTER_BY_ORIGIN':
            const allVideogames2 = state.allVideogames; 
            console.log('videojuegos', allVideogames2)
            const originFilter = action.payload === 'Created' 
                                ? allVideogames2.filter(e => e.createdInDb)
                                : allVideogames2.filter(e => !e.createdInDb)
            console.log('filtro de origen', originFilter)
            return {
                ...state, 
                videogames: action.payload === 'All' ? state.allVideogames : originFilter
            }
        case 'ORDER_BY_NAME': 
        console.log('videojuegos', state.videogames)
            const sortedAdd = action.payload === 'Asc' 
                            ? state.videogames.sort(function(a,b){
                                if (a.name.toLowerCase() > b.name.toLowerCase()){
                                    return 1; 
                                }
                                if (b.name.toLowerCase() > a.name.toLowerCase()){
                                    return -1; 
                                }
                                return 0; 
                            })
                            : state.videogames.sort(function(a,b){
                                if (a.name.toLowerCase() > b.name.toLowerCase()){
                                    return -1
                                }
                                if (b.name.toLowerCase() > a.name.toLowerCase()){
                                    return 1; 
                                } 
                                return 0; 
                            })
                            return {
                                ...state, 
                                videogames: sortedAdd
                            }
        case 'ORDER_BY_RATING': 
        console.log('videojuegos', state.videogames)
            const sortAdd = action.payload === 'Worst' 
                            ? state.videogames.sort(function(a,b){
                                if (a.rating > b.rating){
                                    return 1; 
                                }
                                if (b.rating > a.rating){
                                    return -1; 
                                }
                                    return 0; 
                                })
                            : state.videogames.sort(function(a,b){
                                if (a.rating > b.rating){
                                    return -1
                                }
                                if (b.rating > a.rating){
                                    return 1; 
                                } 
                                    return 0; 
                                })
                                return {
                                    ...state, 
                                    videogames: sortAdd
                                }
        case 'GET_VIDEOGAMES_NAME':
            return{
                ...state,
                detail: action.payload
            }
        case 'RESET_DETAIL':
            return{
                ...state, 
                detail:{}
            }
        default:
            return state;
    }
}




export default rootReducer 