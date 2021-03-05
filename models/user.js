const db = require('../config/db');

class User {
    static async getRegisteredUserByUsername(username) {
        const query=`SELECT * FROM user_profile WHERE username = $1`;
        const out = await db.query(query, [username]);
        return out.rows[0];
    }

    static async getRegisteredUserByID(id) {
        const query=`SELECT * FROM user_profile WHERE user_id = $1`;
        const out = await db.query(query, [id]);
        return out.rows[0];
    }

}

module.exports = User;