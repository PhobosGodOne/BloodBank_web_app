const mongoose = require('mongoose')


//mongoDB schema for donors
const donorSchema = new mongoose.Schema({

    first_name:{ type : String , require : true},
    last_name:{ type : String , require : true},
    ID_number:{type : String , require: true },
    email:{ type : String , require : true},
    phone: {type : String , require:true},
    blood_group : {type : String , require:true},
    adress : {type : String , require:true},
    information : {type : String , require:true}
    
})

module.exports = mongoose.model('donors',donorSchema)