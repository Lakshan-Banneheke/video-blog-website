const vlogService = require('../services/vlogService');

const addEntryView = (req, res) => {
    console.log(req.params)
    res.render('addEntry', {
        successmsg: req.query.successmsg,
        errormsg: req.query.errormsg,
        title: req.query.title,
        description: req.query.description,
        link: req.query.link
    });
}

const addEntry = async (req, res) => {
            try{
                await vlogService.addEntry(req.body);
                res.redirect(`addEntry/?successmsg=Uploaded Succesfully`);
            } catch (e) {
                res.redirect(`addEntry/?errormsg=${e}&title=${req.body.title}&description=${req.body.description}&link=${req.body.link}`)
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