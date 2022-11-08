const axios = require('axios')
const { APIKEY } = process.env;
const { Videogame, Genre } = require('../db');

//....................PAG PPAL....................// 
//TRAER JUEGOS DE LA API: 
const getApiGames = async () => {
    try{
    const apiGames1 = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=1`)

    const apiGames2 = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=2`)

    const apiGames3 = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=7`)

    const apiGames4 = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=8`)

    const apiGames5 = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=9`)

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
            genres: el.genres.map((e) => e.name),
        }
    })
    return apiGames;
} catch(error){
    console.log(error)
}
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
            id: el.dataValues.id,
            name: el.dataValues.name,
            rating: el.dataValues.rating,
            background_image: el.dataValues.background_image,
            genres: el.dataValues.genres.map((e) => ( e.dataValues.name )),
            createdInDb: el.dataValues.createdInDb
        }
    })
}; 


//API-GAMES & DB-GAMES: 
const getAllGames = async (req, res) => {
    const gamesApi = await getApiGames();
    const gamesDB = await getDbGames();
    const allGames = gamesApi.concat(gamesDB)
    return allGames; 

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
            genres: apiGamesURL.data.genres.map((e) => e.name),
            // name_original: apiGamesURL.data.name_original,
            platforms: 
                apiGamesURL.data.platfoms === null || apiGamesURL.data.platforms === 0
                ? "Platforms aren't specified." 
                : apiGamesURL.data.platforms.map((el) => el.platform.name), 
        }
        console.log('aquiiiiii', apiGames)
        return apiGames;

    } catch(error) {
        console.log('Error ->',error)
        return false
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
                genres: prevData.genres.map((e) => e.name), 
                platforms: prevData.platforms, 
                createdInDb: prevData.createdInDb,

            }
        }catch (error){
            console.log('Error ->',error)
            return false
        }
}

// API-GAMES & DB-GAMES:  
const allGamesID = async (req, res) => {
    const id = req.params.id
    const gameApi = await idGame(id);
    const gameDB = await gameDBId(id);
    console.log('->', gameApi);
    console.log('->', gameDB);
    if (!gameApi && !gameDB){
        res.status(404).send('Game Not Found!') 
    } else if (!gameApi && gameDB){
        console.log('game db');
        res.status(200).send(gameDB)
    } else {
        console.log('game api');
        res.status(200).send(gameApi)
    }
} 

//....................GAMES BUSCADOS POR QUERY....................//
//BÚSQUEDA DB-GAMES: 
const getGamesDbBySearch = async (name) => {
    const auxDB = await getDbGames();
    console.log('aux db', auxDB)
    const gamesInDbName = auxDB.filter((e) => 
        e.name.toLowerCase().includes(name.toLowerCase())
    )
    return gamesInDbName; 
}

//BÚSQUEDA API-GAMES: 
const getGamesApiBySearch = async(name) => {
    const apiGamesResult = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${APIKEY}`);
    const apiGamesBySearch = await apiGamesResult.data?.results.map((e) => {
        return {
            id: e.id, 
            name: e.name, 
            rating: e.rating, 
            background_image: e.background_image, 
            genres: e.genres.map((el) => {el.name}), 
        }
    }) 
    const apiGamesBySearchLimit = apiGamesBySearch.slice(0, 15); 
    return apiGamesBySearchLimit; 
}

//API-GAMES & DB-GAMES: 
const getAllGamesBySearch = async(req, res) => {
    const name = req.query.name
    if(name){
        const gamesApiSearch = await getGamesApiBySearch(name);
        const gamesDBSearch = await getGamesDbBySearch(name); 
        const totalGamesSearch = gamesApiSearch.concat(gamesDBSearch); 
        if(totalGamesSearch.length){
            res.status(200).send(totalGamesSearch); 
        }
        else {
            res.status(404).send('Videogame not found!'); 
        }
    } 
    else {
        const totalGames = await getAllGames();
        // console.table(totalGames)
        res.status(200).send(totalGames); 
    }
}

//....................RUTA GAME-POST....................//
const gamesPost = async(req, res) => {
        const {
            name,
            description,
            released,
            rating,
            background_image,
            platforms,
            genres,
        } = req.body;
        try{
            console.log('Here', req.body);
            const gameCreate = await Videogame.create({
            name,
            description,
            released, 
            rating,
            background_image,
            platforms,
        })
        for(let g of genres){
            let genreDb = await Genre.findOne({
                where : {name: g}
            })
            gameCreate.addGenre(genreDb)
        }

        res.status(200).send('Videogame created successfylly.')
    }
    catch (error){
        res.status(400).send('Bad request.')
    }
} 

//....................RUTA GAME-DELETE....................//
const deleteGame = async(req,res) => {
    try{
        const id = req.params.id; 
        const gameExist = await Videogame.findOne({
            where: {id: id}
        })
        if (!gameExist){
            res.status(404).send("Videogame not found.")
        }
        else{
            await gameExist.destroy(); 
            res.status(200).send("Videogame deleted successfully.")
        }
    } catch(error){
        res.status(400).send("Bad request.")
    }
}

//....................RUTA GAME-PATCH....................//
const patchGame = async(req, res) => {
    try{
        const id = req.params.id; 
        const updateGame = req.body;
        const gameExist = await Videogame.findOne({
            where: {id: id}
        })
        if (!gameExist){
            res.status(404).send("Videogame not found.")
        }
        else {
            const aux = await gameExist.update(
                { name: updateGame.name }
                );
                console.log({ aux });
            res.status(200).send("Videogame modified successfully!")
        }
    } catch (error){
        console.log(error)
    }
}



module.exports = {
    // getAllGames,
    allGamesID,
    getAllGamesBySearch,
    gamesPost,
    deleteGame,
    patchGame

}