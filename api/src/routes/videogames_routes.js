const { Router } = require('express');
const { getAllGames, allGamesID} = require('../controllers/videogames_controller')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/', getAllGames)
router.get('/:id', allGamesID)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;