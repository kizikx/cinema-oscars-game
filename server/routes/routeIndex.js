module.exports = (app) => {
    const gameController = require('../controllers/gameController');
    const playerController = require('../controllers/playerController');
    const categoryController = require('../controllers/categoryController');
    const movieController = require('../controllers/movieController');

    app.post('/game', gameController.createGame);

    app.get('/game', gameController.getGame);

    app.patch('/game/:id', gameController.updateGame);

    app.get('/game/:id', gameController.getGameById);
    /*
    app.post('/player', playerController.createPlayer);

    app.patch('/player/:id', playerController.updatePlayer);

    app.post('/category', categoryController.createCategory);

    app.get('/category', categoryController.getCategories);

    app.get('/category/:id', categoryController.getCategoryById);

    app.delete('/category/:id', categoryController.deleteCategory);

    app.post('/movie', movieController.createMovie);

    app.get('/movie', movieController.getMovies);

    app.get('/movie/:id', movieController.getMovieById);*/

};