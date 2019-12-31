const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'images')
        // cb(null, path.join(__dirname,'../images'))
    },
    filename(req, file, cb) {
        // cb(null, Date.now() + path.extname(file.originalname))
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg']

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({
    // storage: storage,
    storage, // сокращенные
    // fileFilter: fileFilter,
    fileFilter, // сокращенные
})
