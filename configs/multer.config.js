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
      next(new Error('Only image files are allowed!'));
    } else {
      next();
    }
  }
});
module.exports = upload;
