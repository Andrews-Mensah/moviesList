const mongoose = require('mongoose');
const { sanitizeInput } = require('../helpers/required');
const Casts = require('../models/cast.model')
const Movie = require('../models/movie.model')



module.exports.getAllCasts= async (req, res, next)=>{
    let casts;

    try{
        casts = await Casts.find({
        // isMovie: {$eq: true}

        })
        return res.status(200).send({"Casts": casts})

    }
    catch (error){
        console.log("Error", error)
       return res.status(400).send({"Error": error})
    }
}

module.exports.addCast = async (req, res, next)=>{
    const requestBody = sanitizeInput(req.body);

    let cast;

    if(requestBody.firstName === null){
        return res.status(400).send({
            message: "First Name is required",
          });
    }

    if(requestBody.lastName === null){
        return res.status(400).send({
            message: "Last Name is required",
          });
    }

    if(requestBody.movie === null){
        return res.status(400).send({
            message: "Movie is required",
          });
    }


    try {

        cast = new Casts ({
            firstName: requestBody.firstName,
            lastName: requestBody.lastName,
            movie: requestBody.movie
        })
        cast = await cast.save()

        return res.status(201).json({ cast })

    }

    catch(error){

        console.log('Error', error)
        res.status(400).send({"Error": error})
    }
}

module.exports.deleteCast = async (req, res, next)=>{
    const castID = req.params.id;

    try {

        if(castID === null){
            res.status(400).send("Please add a cast ID")
        }


        await Casts.findByIdAndDelete(castID)

        return res.status(200).json({
            message: "Cast deleted",
        })

    }

    catch(error){
        console.log("Error", error)
        res.status(400).send({"Error": error})
    }


}

module.exports.getCastOfParticularMovie = async (req, res, next)=>{
    

    try {
        const movieID = req.params.id;

        console.log("hshshxhxshxxhxhxhxhxhxh",movieID)

        const movie = await Movie.find({
            _id: {$eq:movieID}
        })

        console.log("Movie", movie)
        

        if(movieID === null){
            res.status(400).send("Please add a movie ID")
        }

        if(!movie){
            console.log("bbjjcbsjcbscbscscschbskchbschbshchsk")
            res.status(400).send("Movie ID does not exist")
        }


        const casts = await Casts.find({
            movie: {$eq: movieID}
        })

        return res.status(200).send({"Cast": casts})

    }

    catch(error){
        console.log("Error1234", error)
        res.status(400).send({"Error": error})
    }


}