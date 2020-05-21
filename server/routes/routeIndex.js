module.exports = (app) => {
    const gameController = require('../controllers/gameController');
    const playerController = require('../controllers/playerController');
    const movieController = require('../controllers/movieController');

    app.post('/game', gameController.createGame);

    app.get('/game', gameController.getGames);

    app.patch('/game/:gameId', gameController.updateGame);

    app.get('/game/:gameId', gameController.getGameById);
    
    app.post('/game/:gameId/player', playerController.createPlayer);

    app.get('/game/:gameId/player', playerController.getGamePlayers);

    app.patch('/game/:gameId/player/:id', playerController.updatePlayer);

    app.delete('/game/:gameId/player/:id', playerController.deletePlayer);

    app.post('/game/:gameId/movie', movieController.createMovie);

    app.get('/game/:gameId/movie', movieController.getMovies);

    app.get('/game/:gameId/movie/:movieId', movieController.getMovieById);

    app.post('/game/:gameId/vote', movieController.createVote);

    app.get('/game/:gameId/vote', movieController.getVotes);

    app.get('/game/:gameId/vote/:voteId', movieController.getVoteById);
};