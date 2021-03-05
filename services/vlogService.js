const Vlog = require('../models/vlog');

const addEntry = async (values) => {
    await Vlog.addEntry(values);
}

const getEntryByID = async (id) => {
    return await Vlog.getEntryByID(id);
}

const editEntry = async (values) => {
    await Vlog.editEntry(values);
}

module.exports = {
    addEntry,
    getEntryByID,
    editEntry
}