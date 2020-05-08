module.exports = (app) => {
    const partieController = require('../controllers/partieController');


    app.post('/', partieController.createGame);

    app.patch('/', partieController.updateGame);
    
    app.post('/player', partieController.createPlayer);

    app.patch('/player/:id', partieController.updatePlayer);

    app.post('/category', partieController.createCategory);

    app.get('/category', partieController.getCategories);

    app.get('/category/:id', partieController.getCategoryById);

    app.delete('/category/:id', partieController.deleteCategory);

    app.post('/movie', partieController.createMovie);

    app.get('/movie', partieController.getMovies);

    app.get('/movie/:id', partieController.getMovieById);

};