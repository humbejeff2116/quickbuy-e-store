

const multer = require('multer');
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('imagesrc');

const dataUri = req => {
    dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
} 
module.exports = { multerUploads,  dataUri };