const db = require('../config/db');

const getAllVlogs = async () => {
    const query=`SELECT * FROM vlogs ORDER BY uploadTimestamp DESC`;
    const out = await db.query(query);
    return out.rows;
}

const addEntry = async(values) => {
    const query=`INSERT INTO vlogs(title, description, link, image) VALUES($1, $2, $3, $4)`;
    await db.query(query, [values.title, values.description, values.link, values.filename]);
}

const getEntryByID = async(id) => {
    const query=`SELECT * FROM vlogs WHERE vlog_id = $1`;
    const out = await db.query(query, [id]);
    return out.rows[0];
}

const editEntry = async(values) => {
    const query=`UPDATE vlogs SET title=$1, description=$2, link=$3, image=$4 WHERE vlog_id=$5`;
    await db.query(query, [values.title, values.description, values.link, values.filename, values.id]);
}



module.exports = {
    getAllVlogs,
    addEntry,
    getEntryByID,
    editEntry
};