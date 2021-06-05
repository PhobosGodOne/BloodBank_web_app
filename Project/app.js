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
app.use('/',require('./routes/index'))
app.use('/login',require('./routes/index'))
app.use('/adddonor',require('./routes/index'))
app.use('/editdonor',require('./routes/index'))
app.use('/deletedonor',require('./routes/index'))
app.use('/view',require('./routes/index'))


//Selecting port 8080 for google cloud
const PORT = 8080



app.listen(PORT , console.log(`SERVER RUNNING ON PORT http://${process.env.HOST}:${PORT}/login`))


