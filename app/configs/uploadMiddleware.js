var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __path_uploads)
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024,
    },
    storage: storage
});

module.exports = upload