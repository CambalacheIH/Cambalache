const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;

//cloudinary.image("product-photo/product-photo.png")
cloudinary.config({
  cloud_name: 'de8s9nyn0',
  api_key: CLOUDINARY_KEY, 
  api_secret: CLOUDINARY_SECRET
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'product-photo',
  allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
  filename: (req, file, next) => {
    next(undefined, 'product-photo');
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
