const { Router } = require('express');
const {getGenresFromDB} = require('../controllers/genres_controller')


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get('/', getGenresFromDB) 

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;