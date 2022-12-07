const express = require('express');
const { getAllCasts, addCast, deleteCast, getCastOfParticularMovie } = require('../controllers/casts.controller');
const castsRouter = express.Router();





castsRouter.get("/all-casts", getAllCasts)
// moviesRouter.get("/all-shows", getAllNonMovies)
// moviesRouter.get("/get-movie/:id", getMovieById)
castsRouter.post("/add-cast", addCast)
// moviesRouter.put("/update-movie/:id", updateMovie)
castsRouter.delete("/delete-cast/:id", deleteCast)
castsRouter.get("/get-cast/:id", getCastOfParticularMovie)


module.exports = castsRouter;