const mongoose = require("mongoose")


const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minLength: 120
    },

    category: {
        type: String,
        required: true
    },

    yearReleased: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true,
        // unique: true
    },
    isMovie: {
        type: Boolean,
        required: true,
        default: false
    },
    cast: [
        {
            name: String,
            // required: true
        }
    ]


},
{timestamps: true}

)


module.exports = mongoose.model('Movies', movieSchema)