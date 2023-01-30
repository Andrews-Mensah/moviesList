const mongoose = require('mongoose');
const { sanitizeInput } = require('../helpers/required');
const rentUser = require('../models/rentUsers.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



module.exports.getUserCasts= async (req, res, next)=>{
    let users;

    try{
        users = await Users.find({
        // isMovie: {$eq: true}

        })
        return res.status(200).send({"Users": users})

    }
    catch (error){
        console.log("Error", error)
       return res.status(400).send({"Error": error})
    }
}

module.exports.signup = async (req, res, next)=>{

    try {

        const{firstName, lastName, email, password} = req.body;

        if(!firstName || !lastName || !email || !password){
            res.json({
                status: 'error',
                error: "Fields cannot be empty"
            })
        }

        // if(firstName !== typeof 'string' || lastName !== typeof 'string' || email !== typeof 'string'){
        //     res.json({
        //         status: 'error',
        //         error: "Invalid fields"
        //     })
        // }

        if(password.length < 8){
            res.json({status: 'error', error: "Password cannot be less than 8 characters"})
        }

        const hPassword = await bcrypt.hash(password, 10)

        const user = await rentUser.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hPassword
        })

        console.log(user)

        const data = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            _id: user.id,
        }

        res.json({
            status: 200,
            data: data
        })
    
    }
    catch(error){
        console.log(JSON.stringify(error))

        if(error.code === 11000){
            res.json({status: 'error', error: 'Email already in use'})
        }

        throw error;
    }
}

module.exports.login = async(req, res, next)=>{
    const {email, password} = req.body;

    const user = await rentUser.findOne({email}).lean()

    console.log("uuuuuu", user)

    if(!user){
        res.json({
            status: 'error',
            error: `User does not exists`
        })
    }

    if(await bcrypt.compare(password, user.password)){

        const token = jwt.sign({id: user._id, email: user.email }, process.env.JWT_SECRET)

        const data = {
            token,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            _id: user.id
        }

        res.json({
            status: 200,
            data: data
        })
    }

    res.json({
        status: 'error',
        error: `User with email ${user.email} does not exists`
    })

}

// module.exports.deleteCast = async (req, res, next)=>{
//     const castID = req.params.id;

//     try {

//         if(castID === null){
//             res.status(400).send("Please add a cast ID")
//         }


//         await Casts.findByIdAndDelete(castID)

//         return res.status(200).json({
//             message: "Cast deleted",
//         })

//     }

//     catch(error){
//         console.log("Error", error)
//         res.status(400).send({"Error": error})
//     }


// }

// module.exports.getCastOfParticularMovie = async (req, res, next)=>{
    

//     try {
//         const movieID = req.params.id;

//         console.log("hshshxhxshxxhxhxhxhxhxh",movieID)

//         const movie = await Movie.find({
//             _id: {$eq:movieID}
//         })

//         console.log("Movie", movie)
        

//         if(movieID === null){
//             res.status(400).send("Please add a movie ID")
//         }

//         if(!movie){
//             console.log("bbjjcbsjcbscbscscschbskchbschbshchsk")
//             res.status(400).send("Movie ID does not exist")
//         }


//         const casts = await Casts.find({
//             movie: {$eq: movieID}
//         })

//         return res.status(200).send({"Cast": casts})

//     }

//     catch(error){
//         console.log("Error1234", error)
//         res.status(400).send({"Error": error})
//     }


// }