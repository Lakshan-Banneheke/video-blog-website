const path = require('path');

const checkFileType = (file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname){
        return cb(null, true);
    } else {
        return cb('Error: Images only');
    }
}

module.exports = checkFileType;