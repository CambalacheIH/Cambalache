const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, './public/photos');
  }
});

const upload = multer({ storage });
module.exports = upload;
