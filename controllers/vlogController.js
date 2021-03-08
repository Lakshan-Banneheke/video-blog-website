const vlogService = require('../services/vlogService');

const addEntryView = (req, res) => {
    res.render('addEntry');
}

const addEntry = async (req, res) => {
            try{
                await vlogService.addEntry(values);
                res.render('addEntry', {
                    successmsg: 'Uploaded Succesfully'
                });
            } catch (e) {
                res.render('addEntry', {
                    msg: e,
                })
            }

}

const editEntryView = async (req, res) => {
    const entry = await vlogService.getEntryByID(req.params.id);
    res.render('editEntry', {entry});
}


const editEntry = async (req, res) => {
        try {
            await vlogService.editEntry(req.body);
            const entry = await vlogService.getEntryByID(req.body.id);
            res.render(`editEntry`, {
                successmsg: 'Edited Succesfully',
                entry
            });
        } catch (e) {
            const entry = await vlogService.getEntryByID(req.body.id);
            res.render(`editEntry`, {
                msg: e,
                entry
            })
        }
}

const deleteEntry = async (req, res) => {
    try {
        await vlogService.deleteEntry(req.body.id);
        res.redirect('/');
    } catch (e) {
        const entry = await vlogService.getEntryByID(req.body.id);
        res.render(`editEntry`, {
            msg: e,
            entry
        })
    }
}


module.exports = {
    addEntryView,
    addEntry,
    editEntryView,
    editEntry,
    deleteEntry
}