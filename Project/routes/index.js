const express = require('express')
var bodyParser = require('body-parser')
const router = express.Router()
const donor = require('../models/donor')
const doctor = require('../models/doctors')



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
    donor.find({}).lean().then(donors => {

        res.render('donors', { donors: donors })

    })

})

//adddonor page route
router.get('/adddonor', (req, res) => {

    res.render('adddonor')

})


//adding donor to db route
router.post('/adddonor/test', (req, res) => {
    donor.create(req.body)


    res.render('adddonor', { alert: 'Donor Created Succesfully' })
})

//editing donor infos
router.get('/editdonor/:id', (req, res) => {

    donor.findOne({ ID_number: req.params.id }).lean().then(donor => {
        res.render('editdonor', { donor, donor })


    })

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



    donor.deleteOne({ ID_number: req.params.id }, function (err) {
        if (err) return handleError(err);
    });

    res.redirect('/donors')

})

//route for view selected donor's information
router.get('/view/:id', (req, res) => {

    donor.findOne({ ID_number: req.params.id }).lean().then(donorv => {
        console.log(donorv)
        res.render('view', { donorv,donorv})


    })
})

//route for login
router.post('/login/try', (req, res) => {


    doctor.findOne({ $and: [{ email: req.body.email }, { password: req.body.password }] }).lean().then(doctor => {
        if (doctor) {
            res.redirect('/donors')

        }
        else {
            res.render('login',{ layout: 'login.hbs' ,alert: 'Doctor not found'})
        }

    })



})






module.exports = router