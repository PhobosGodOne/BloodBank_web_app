const mongoose = require('mongoose')


//mongoDB schema for doctors
const doctorsSchema = new mongoose.Schema({

    email:{ type : String , require : true},
    password: {type : String , require:true},
    
})


module.exports = mongoose.model('doctors',doctorsSchema)





