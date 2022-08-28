const { Router } = require('express');
const { allGamesID, getAllGamesBySearch, gamesPost, deleteGame, patchGame} = require('../controllers/videogames_controller')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/', getAllGamesBySearch)
router.get('/:id', allGamesID)
router.post('/', gamesPost)
router.delete('/:id', deleteGame)
router.patch('/:id', patchGame)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;