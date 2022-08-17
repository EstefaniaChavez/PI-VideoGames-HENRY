const axios = require('axios')
const { APIKEY } = process.env;
const { Videogame, Genre } = require('../db');

//....................PAG PPAL....................// 
//TRAER JUEGOS DE LA API: 
const getApiGames = async () => {
    const apiGames1 = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page5`)

    const apiGames2 = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page6`)

    const apiGames3 = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page7`)

    const apiGames4 = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page8`)

    const apiGames5 = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page9`)

    const apiTotalGames = apiGames1.data.results.concat(
        apiGames2.data.results,
        apiGames3.data.results,
        apiGames4.data.results,
        apiGames5.data.results
    )

    const apiGames = apiTotalGames.map((el) => {
        return {
            id: el.id,
            name: el.name,
            rating: el.rating,
            background_image: el.background_image,
            genre: el.genres.map((e) => e.name),
        }
    })
    return apiGames;
}

//JUEGOS TRAIDO DE LA DB: 
const getDbGames = async () => {
    const rawGamesDB = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
    return rawGamesDB.map((el) => {
        return {
            id: el.id,
            name: el.name,
            rating: el.rating,
            background_image: el.background_image,
            genre: el.genres.map((e) => { e.name }),
            createdInDb: el.createdInDb
        }
    })
}; 


//API-GAMES & DB-GAMES: 
const getAllGames = async (req, res) => {
    const gamesApi = await getApiGames();
    const gamesDB = await getDbGames();
    const allGames = gamesApi.concat(gamesDB)

    res.status(200).send(allGames)
}; 

//....................RUTA ID-GAMES....................// 
//BÚSQUEDA POR ID-APIGAMES: 
const idGame = async(id) => {
    try {
        const apiGamesURL = await axios.get(`https://api.rawg.io/api/games/${id}?key=${APIKEY}`); 
        const apiGames = {
            id: apiGamesURL.data.id, 
            name: apiGamesURL.data.name, 
            description: apiGamesURL.data.description.replace(/<[^>]*>?/g, ""), 
            released: apiGamesURL.data.released, 
            rating: apiGamesURL.data.rating, 
            background_image: apiGamesURL.data.background_image, 
            gerne: apiGamesURL.data.genres.map((e) => e.name), 
            platforms: 
                apiGamesURL.data.platfoms === null || apiGamesURL.data.platforms === 0
                ? "Platforms aren't specified." 
                : apiGamesURL.data.platforms.map((el) => el.platform.name), 
        }
        return apiGames;

    } catch(error) {
        console.log(error)
        return {} 
    }
}

//BÚSQUEDA POR ID-DBGAMES: 
const gameDBId = async (id) => {
    try{
        const game = await Videogame.findOne({
            where : {
                id: id,
            },
            include: Genre, 
        }); 
        const prevData = game.dataValues
            return {
                id: prevData.id, 
                name: prevData.name,
                description: prevData.description, 
                released: prevData.released, 
                rating: prevData.rating, 
                background_image: prevData.background_image, 
                genre: prevData.genres.map((e) => e.name), 
                platforms: prevData.platforms, 
                createdInDb: prevData.createdInDb
            }
        }catch (error){
            console.log(error)
            return {}
        }
}

// API-GAMES & DB-GAMES:  
const allGamesID = async (req, res) => {
    const id = req.params.id
    const gameApi = await idGame(id);
    const gameDB = await gameDBId(id);
    
    if (!gameApi && !gameDB){
        res.status(404).send('Game Not Found!')
    } else if (!gameApi){
        res.status(200).send(gameDB)
    } else {
        res.status(200).send(gameApi)
    }
} 

//....................GAMES BUSCADOS POR QUERY....................//
//BÚSQUEDA DB-GAMES: 
const getGamesDbBySearch = async (name) => {
    const auxDB = await getDbGames(); 
    const auxGames = auxDB.map((el) => {
        return {
            id: el.id,
            name: el.name,
            rating: el.rating,
            background_image: el.background_image,
            genre: el.genres.map((e) => { e.name }),
            createdInDb: el.createdInDb
        }
    })
    const gamesInDbName = auxGames.filter((e) => {
        e.name.toLowerCase().includes(name.toLowerCase)
    })
    return gamesInDbName; 
}

//BÚSQUEDA API-GAMES: 
const getGamesApiBySearch = async(name) => {
    const apiGamesResult = await axios.get(`https://api.rawg.io/api/games?search={game}?key=${APIKEY}`); 
    const apiGamesBySearch = await apiGamesResult.data?.results.map((e) => {
        return {
            id: e.id, 
            name: e.name, 
            rating: e.rating, 
            background_image: e.background_image, 
            genre: e.genres.map((el) => {el.name}), 
        }
    }) 
    const apiGamesBySearchLimit = apiGamesBySearch.slice(0, 15); 
    return apiGamesBySearchLimit; 
}

//API-GAMES & DB-GAMES: 





module.exports = {
    getAllGames,
    allGamesID
}