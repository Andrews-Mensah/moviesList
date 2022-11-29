const express = require('express');
const { getAllMovies, addMovie, updateMovie, deleteMovie, getMovieById, searchMovieByName, getAllNonMovies } = require('../controllers/movies.controller');
const moviesRouter = express.Router();





moviesRouter.get("/all-movies", getAllMovies)
moviesRouter.get("/all-shows", getAllNonMovies)
moviesRouter.get("/get-movie/:id", getMovieById)
moviesRouter.post("/add-movie", addMovie)
moviesRouter.put("/update-movie/:id", updateMovie)
moviesRouter.delete("/delete-movie/:id", deleteMovie)
moviesRouter.get("/get-movie", searchMovieByName)













module.exports = moviesRouter;


