const express = require('express')
var bodyParser = require('body-parser')
const router = express.Router()
const donor = require('../models/donor')
const doctor = require('../models/doctors')
var session = require('express-session')

const app = express()

app.use(session({
    secret: 'mysacrethome',
    resave: false,
    saveUninitialized: true
}))



//route that uses different handleb. layout 
router.get('/login', (req, res) => {

    res.render('login', { layout: 'login.hbs' })

})

//login page route
router.get('/', (req, res) => {

    res.render('login', { layout: 'login.hbs' })

})

//donors page rote
router.get('/donors', (req, res) => {


    if (req.session.name) {

        donor.find({}).lean().then(donors => {

            res.render('donors', { donors: donors })

        })
    }
    else {
        res.render('login', { layout: 'login.hbs', alert: 'Bu sayfaya erişmek için giriş yapmanız gereklidir.' })
    }
})

//adddonor page route
router.get('/adddonor', (req, res) => {


    if (req.session.name) {

        donor.find({}).lean().then(donors => {

            res.render('adddonor')

        })
    }
    else {
        res.render('login', { layout: 'login.hbs', alert: 'Bu sayfaya erişmek için giriş yapmanız gereklidir.' })
    }


})


//adding donor to db route
router.post('/adddonor/test', (req, res) => {
    donor.create(req.body)


    res.render('adddonor', { alert: 'Donor Created Succesfully' })
})

//editing donor infos
router.get('/editdonor/:id', (req, res) => {



    if (req.session.name) {

        donor.find({}).lean().then(donors => {

            donor.findOne({ ID_number: req.params.id }).lean().then(donor => {
                res.render('editdonor', { donor, donor })


            })

        })
    }
    else {
        res.render('login', { layout: 'login.hbs', alert: 'Bu sayfaya erişmek için giriş yapmanız gereklidir.' })
    }




})

// route to change donor infos
router.post('/editdonor/edit/:idno', (req, res) => {

    const donorinfo = donor.findOne({

        ID_number: req.params.idno
    }).lean()

    console.log(donorinfo['first_name'])


    donor.findOneAndUpdate({ ID_number: req.params.idno }, req.body, (err, data) => {
        if (err) console.log(err)
        else {
            res.render('editdonor', { alert: 'Donor Edited Succesfully' })
        }
    });


})

//route that deletes donors from db
router.get('/deletedonor/:id', (req, res) => {





    if (req.session.name) {

        donor.find({}).lean().then(donors => {

            donor.deleteOne({ ID_number: req.params.id }, function (err) {
                if (err) return handleError(err);
            });

            res.redirect('/donors')

        })
    }
    else {
        res.render('login', { layout: 'login.hbs', alert: 'Bu sayfaya erişmek için giriş yapmanız gereklidir.' })
    }



})

//route for view selected donor's information
router.get('/view/:id', (req, res) => {



    if (req.session.name) {

        donor.find({}).lean().then(donors => {

            donor.findOne({ ID_number: req.params.id }).lean().then(donorv => {

                res.render('view', { donorv, donorv })


            })

        })
    }
    else {
        res.render('login', { layout: 'login.hbs', alert: 'Bu sayfaya erişmek için giriş yapmanız gereklidir.' })
    }
})

//route for login
router.post('/login/try', (req, res) => {


    doctor.findOne({ $and: [{ email: req.body.email }, { password: req.body.password }] }).lean().then(doctor => {
        if (doctor) {

            req.session.name = req.body.email
            res.redirect('/donors')

        }
        else {
            res.render('login', { layout: 'login.hbs', alert: 'Doctor not found' })
        }

    })



})

router.get('/logout', (req, res) => {

    req.session.destroy()
    res.redirect('/login')

})






module.exports = router