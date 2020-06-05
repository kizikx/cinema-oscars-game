module.exports = (app) => {
    const gameController = require('../controllers/gameController');
    const playerController = require('../controllers/playerController');
    const movieController = require('../controllers/movieController');
    const voteController = require('../controllers/voteController');
    const oscarController = require('../controllers/oscarController');

    app.post('/game', gameController.createGame);

    app.get('/game', gameController.getGames);

    app.patch('/game/:gameId', gameController.updateGame);

    app.patch('/game/:gameId', gameController.addCategory);

    app.get('/game/:gameId', gameController.getGameById);
    
    app.post('/game/:gameId/player', playerController.createPlayer);

    app.get('/game/:gameId/player', playerController.getGamePlayers);

    app.patch('/game/:gameId/player/:id', playerController.updatePlayer);

    app.delete('/game/:gameId/player/:id', playerController.deletePlayer);

    app.post('/game/:gameId/movie', movieController.createMovie);

    app.get('/game/:gameId/movie', movieController.getMovies);

    app.get('/game/:gameId/movieGame', movieController.getMoviesByGame);

    app.get('/game/:gameId/movie/:movieId', movieController.getMovieById);

    app.post('/game/:gameId/vote', voteController.createVote);

    app.get('/game/:gameId/vote', voteController.getVotes);

    app.get('/game/:gameId/vote/:voteId', voteController.getVoteById);

    app.post('/game/:gameId/oscar', oscarController.createOscar);

    app.get('/game/:gameId/oscar', oscarController.getOscars);

    app.get('/game/:gameId/oscar/:oscarId', oscarController.getOscarById);

    app.patch('/game/:gameId/oscar/:oscarId', oscarController.addVote);
};