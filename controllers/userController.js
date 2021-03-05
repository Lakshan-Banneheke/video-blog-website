const userValidator = require('./validators/userValidator');
const userService = require('../services/UserServices');
const bcrypt = require('bcrypt');


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

module.exports = {
    viewLogin,
    login,
    logout,
}
