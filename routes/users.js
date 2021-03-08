const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();
const passport = require("passport");
const auth = require('../config/auth');
const VlogController = require('../controllers/vlogController');


router.get('/login', auth.checkAuthenticated, UserController.viewLogin);
router.post('/login',
    passport.authenticate("local",{
        successRedirect: "../",
        failureRedirect: "login",
        failureFlash: true
    })
);

router.get('/logout', auth.checkNotAuthenticated, UserController.logout);

router.get('/addEntry', auth.checkNotAuthenticated, VlogController.addEntryView);
router.post('/addEntry', auth.checkNotAuthenticated, VlogController.addEntry);

router.get('/editEntry/:id', auth.checkNotAuthenticated, VlogController.editEntryView);
router.post('/editEntry', auth.checkNotAuthenticated, VlogController.editEntry);
router.delete('/editEntry', auth.checkNotAuthenticated, VlogController.deleteEntry);

module.exports = router;