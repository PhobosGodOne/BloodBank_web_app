const express = require('express')
const dotenv = require('dotenv')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
var bodyParser = require('body-parser')
const doctor = require('./models/doctors')


dotenv.config({ path:'./config/config.env'})



const app = express()


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//adding body-parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

connectDB()

//routes
app.use('/',require('./routes/app'))
app.use('/login',require('./routes/app'))
app.use('/adddonor',require('./routes/app'))
app.use('/editdonor',require('./routes/app'))
app.use('/deletedonor',require('./routes/app'))
app.use('/view',require('./routes/app'))


const PORT = 8080

/* doctor.create({
    email : 'hhbelet@gmail.com',
    password : '123456'Function failed on loading user code. This is likely due to a bug in the user code.

}) */






app.listen(PORT , console.log(`SERVER RUNNING ON PORT http://${process.env.HOST}:${PORT}/login`))


