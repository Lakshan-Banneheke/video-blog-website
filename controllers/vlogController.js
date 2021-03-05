const vlogService = require('../services/vlogService');
const multer = require('multer');
const path = require('path');
const checkFileType = require('../middleware/checkFileType');

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
    })
}

const editEntryView = async (req, res) => {
    const entry = await vlogService.getEntryByID(req.params.id);
    res.render('editEntry', {entry});
}


const editEntry = async (req, res) => {
    console.log(req.body);
    if (typeof req.file == 'undefined') {
        let values = req.body;
        values['filename'] = req.body.oldImage;
        try{
            await vlogService.editEntry(values);
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
    } else {
        console.log(req.file);
        //TODO delete old image from server if new image added
        // fs.unlinkSync(`images/${req.params.folder}/${req.params.id}.png`);
        upload(req, res, async (err) => {
            if (err) {
                const entry = await vlogService.getEntryByID(req.body.id);
                res.render('editEntry', {
                    msg: err,
                    entry
                });
            } else {
                let values = req.body;
                values['filename'] = req.file.filename;
                try {
                    await vlogService.editEntry(values);
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
        })
    }
}



module.exports = {
    addEntryView,
    addEntry,
    editEntryView,
    editEntry
}