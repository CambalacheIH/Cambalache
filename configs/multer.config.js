const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, './public/photos');
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, next) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      next(null, false, new Error('Only image files are allowed!'));
    } else {
      next(null, true);
    }
  }
});
module.exports = upload;
