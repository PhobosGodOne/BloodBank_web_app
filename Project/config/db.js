const mongoose = require('mongoose')


//connecting database which is MongoDB Atlas
const connectDB = async () => {

    try {

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false


        })

        console.log(`MongoDB Connected ${conn.connection.host}`)

    } catch (err) {
        console.error(error)
        process.exit
    }


}

module.exports = connectDB