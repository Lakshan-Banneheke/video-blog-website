const db = require('../config/db');

const getAllVlogs = async () => {
    const query=`SELECT * FROM vlogs ORDER BY uploadTimestamp DESC`;
    const out = await db.query(query);
    console.log(out.rows[0]);
    return out.rows;
}

const addEntry = async(values) => {
    console.log(values.image);
    const query=`INSERT INTO vlogs(title, description, link) VALUES($1, $2, $3)`;
    await db.query(query, [values.title, values.description, values.link]);
}

const getEntryByID = async(id) => {
    const query=`SELECT * FROM vlogs WHERE vlog_id = $1`;
    const out = await db.query(query, [id]);
    return out.rows[0];
}

const editEntry = async(values) => {
    const query=`UPDATE vlogs SET title=$1, description=$2, link=$3, WHERE vlog_id=$4`;
    await db.query(query, [values.title, values.description, values.link, values.id]);
}

const deleteEntry = async(id) => {
    const query=`DELET FROM vlogs WHERE vlog_id=$1`;
    await db.query(query, [id]);
}

module.exports = {
    getAllVlogs,
    addEntry,
    getEntryByID,
    editEntry,
    deleteEntry
};