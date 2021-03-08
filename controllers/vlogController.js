const vlogService = require('../services/vlogService');
const multer = require('multer');
const path = require('path');
const checkFileType = require('../middleware/checkFileType');
const fs = require('fs');


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
    limits: {fileSize: 1000000},
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
            let bitmap = fs.readFileSync(req.file.path);
            let base64 = Buffer(bitmap).toString('base64');
            values['image'] = base64;
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
        //TODO delete old image from server if new image added

        upload(req, res, async (err) => {
            if (err) {
                const entry = await vlogService.getEntryByID(req.body.id);
                res.render('editEntry', {
                    msg: err,
                    entry
                });
            } else {
                let values = req.body;
                if (typeof req.file == 'undefined') {
                    values['filename'] = req.body.oldImage;
                } else {
                    // fs.unlinkSync(`uploads/${req.body.oldImage}`);
                    values['filename'] = req.file.filename;
                }
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
        });
}



module.exports = {
    addEntryView,
    addEntry,
    editEntryView,
    editEntry
}