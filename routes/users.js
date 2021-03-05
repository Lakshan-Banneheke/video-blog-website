const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();
const passport = require("passport");
const auth = require('../config/auth');


router.get('/login', auth.checkAuthenticated, UserController.viewLogin);
router.post('/login',
    passport.authenticate("local",{
        successRedirect: "../",
        failureRedirect: "login",
        failureFlash: true
    })
);

router.get('/logout', auth.checkNotAuthenticated, UserController.logout);

router.get('/addEntry', UserController.addEntryView);
router.post('/addEntry', UserController.addEntry);

module.exports = router;