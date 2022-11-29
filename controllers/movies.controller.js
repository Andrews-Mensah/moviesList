const mongoose = require('mongoose');
const { sanitizeInput } = require('../helpers/required');
const Movies = require('../models/movie.model')


module.exports.getAllMovies = async (req, res, next)=>{
    let movies;

    try{
        movies = await Movies.find({
        isMovie: {$eq: true}

        })
        return res.status(200).send({"Movies": movies})

    }
    catch (error){
        console.log("Error", error)
       return res.status(400).send({"Error": error})
    }
}

module.exports.getAllNonMovies = async (req, res, next)=>{
    let movies;

    try{
        movies = await Movies.find({
        isMovie: {$ne: true}

        

        })
        return res.status(200).send({"Movies": movies})

    }
    catch (error){
        console.log("Error", error)
       return res.status(400).send({"Error": error})
    }
}

module.exports.getMovieById = async (req, res, next)=>{

    const movieID = req.params.id;
    let movie;

    try{
        movie = await Movies.findById(movieID)
        return res.status(200).send({"Movie": movie})

    }
    catch (error){
        console.log("Error", error)
       return res.status(400).send({"Error": error})
    }
}


module.exports.addMovie = async (req, res, next)=>{
    const requestBody = sanitizeInput(req.body);

    let movie;

    if(requestBody.title === null){
        return res.status(400).send({
            message: "Title is required",
          });
    }

    if(requestBody.description === null){
        return res.status(400).send({
            message: "Description is required",
          });
    }

    if(requestBody.thumbnail === null){
        return res.status(400).send({
            message: "Thumbnail is required",
          });
    }

    if(requestBody.category === null){
        return res.status(400).send({
            message: "Category is required",
          });
    }

    if(requestBody.yearReleased === null){
        return res.status(400).send({
            message: "Year that movie was released is required",
          });
    }

    try {

        movie = new Movies ({
            title: requestBody.title,
            description: requestBody.description,
            thumbnail: requestBody.thumbnail,
            category: requestBody.category,
            yearReleased: requestBody.yearReleased,
            cast: requestBody.cast
        })

        movie = await movie.save()

        return res.status(201).json({ movie })

    }

    catch(error){

        console.log('Error', error)
        res.status(400).send({"Error": error})
    }
}

module.exports.updateMovie = async (req, res, next)=>{
    const movieID = req.params.id;
    const requestBody = sanitizeInput(req.body);

    try {

        if(movieID === null){
            res.status(400).send("Please add a movie ID")
        }

       const movie = ({
            title: requestBody.title,
            description: requestBody.description,
            thumbnail: requestBody.thumbnail,
            category: requestBody.category,
            yearReleased: requestBody.yearReleased,
            isMovie: requestBody.isMovie
        })

        await Movies.findByIdAndUpdate(movieID, movie)

        return res.status(200).json({
            message: "Movie updated",
        })

    }

    catch(error){
        console.log("Error", error)
        res.status(400).send({"Error": error})
    }


}


module.exports.deleteMovie = async (req, res, next)=>{
    const movieID = req.params.id;

    try {

        if(movieID === null){
            res.status(400).send("Please add a movie ID")
        }


        await Movies.findByIdAndDelete(movieID)

        return res.status(200).json({
            message: "Movie deleted",
        })

    }

    catch(error){
        console.log("Error", error)
        res.status(400).send({"Error": error})
    }


}

module.exports.searchMovieByName = async (req, res, next)=>{

    try{

    const sort = req.query.sortBy || undefined;
    const page = parseInt(req.query.page, 10)|| 25;
    const perPage = req.query.perPage || null;
    const keyword = req.query.keyword || undefined;
    console.log('Keyword', keyword)


   const movie = await Movies.find(
    {$text: {$search: keyword}}
    // {
    //     $or:[{
    //         name: keyword
    //     },
    //     {
    //         category: keyword
    //     },
    
    // ]
    // }
    
    
    )
   res.status(200).send({movie})
    }

    catch(error){
        console.log("ERROR", error)
        res.status(400).send({"Error": error})
    }
}




