const db = require('../config/db');

const getAllVlogs = async () => {
    const query=`SELECT * FROM vlogs ORDER BY uploadTimestamp DESC`;
    const out = await db.query(query);
    return out.rows;
}

module.exports = {getAllVlogs};