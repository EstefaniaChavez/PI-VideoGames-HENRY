
const initialState = {
    videogames : [],
    allVideogames: [], 
}



function rootReducer(state = initialState, action) {
    switch(action.type){
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload,
            }
        case 'FILTER_BY_GENRE':
            const allVideogames = state.allVideogames
            console.log('videojuegos 0', allVideogames)
            const genreFiltered = action.payload === 'All' 
                                ? allVideogames 
                                : allVideogames.filter(e => e.genre.includes(action.payload))
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
        
        default:
            return state;
    }
}




export default rootReducer 