const axios = require('axios')
const { APIKEY } = process.env;
const { Genre } = require('../db'); 

//....................GENRE ROUTE....................// 

const getGenresFromDB = async (req, res) => {
    const dataExist = await Genre.findAll();
    if (!dataExist.length){
        const genreApi = await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`); 
        const genres = genreApi.data?.results.map((e) => e.name);
        
        const allGenres = new Set(genres); 
        console.log('ppppppppppp', allGenres)

        for (let genre of allGenres){
            console.log('hhhhhhhhh', genre)
            Genre.findOrCreate({
                where : { name : genre }
            })
        } 
        const allGenresDb = await Genre.findAll(); 
        res.status(200).send(allGenresDb); 
    } else {
        res.status(200).send(dataExist)
    }
}

module.exports = {
    getGenresFromDB
}