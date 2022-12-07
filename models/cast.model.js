const mongoose = require("mongoose")

const castSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    movie:{
            _id: false,
            type: mongoose.Schema.Types.ObjectID,
            reference: 'Movies',
            required: true
        }
    


},
{timestamps: true}

)
module.exports = mongoose.model('Casts', castSchema)