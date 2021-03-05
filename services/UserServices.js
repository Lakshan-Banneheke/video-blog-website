const User = require('../models/user');


class UserService {
    static async login({ username, password }) {
        //console.log("user service login called");
        const user = await User.getRegisteredUserByUsername(username);
        return user;
    }

    static async addEntry(values) {
        await User.addEntry(values);
    }
}

module.exports = UserService;