const userValidator = require('./validators/userValidator');
const userService = require('../services/UserServices');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const checkFileType = require('../middleware/checkFileType');

const viewLogin = async (req, res) => {
    res.render('login');
}


const login = async (username, password, done) => {
    try{
        const {value, error} = await userValidator.login.validate({username:username, password: password});
        if (error) throw (error);
        const user = await userService.login(value);
        if (user != null) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    return done(null, user);
                } else {
                    //password is incorrect
                    return done(null, false, {message: "Password is incorrect"});
                }

                // bcrypt.compare(password, user.password, (err, isMatch) => {
                //     if (err) {
                //         throw err;
                //     }
                //     if (isMatch) {
                //         return done(null, user);
                //     } else {
                //         //password is incorrect
                //         return done(null, false, {message: "Password is incorrect"});
                //     }
                // });

        } else {
            // No user
            return done(null, false, {
                message: "No user with that username"
            });
        }

    } catch (err){
        console.log(err);
        return done(null, false, {
            message: "Login Error"
        });
    }

}

const logout = async (req, res) => {
    req.logout();
    req.flash("logoutMessage","Logged out successfully!");
    res.redirect("/users/login");
}

const addEntryView = (req, res) => {
    res.render('addEntry');
}

//set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage:storage,
    limits: {fileSize: 10000000},
    fileFilter : function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('coverImage');


const addEntry = (req, res) => {
    upload(req, res, async (err) => {
        if(err) {
            res.render('addEntry', {
                msg: err,
            });
        } else {
            let values = req.body;
            values['filename'] = req.file.filename;
            try{
                await userService.addEntry(values);
                res.render('addEntry', {
                    successmsg: 'Uploaded Succesfully'
                });
            } catch (e) {
                res.render('addEntry', {
                    msg: e,
                })
            }

        }
    })
}







module.exports = {
    viewLogin,
    login,
    logout,
    addEntryView,
    addEntry
}
