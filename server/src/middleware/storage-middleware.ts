

import * as multer from 'multer';
import * as path from 'path';

const diskStorage = multer.diskStorage(
  {
    destination: (req, file,cb) => {
      const directory = path.join(__dirname, '../images');
      console.log('directory', directory);

      cb(null, directory);
    },
    filename: (req, file, cb) => {
      const mimeType = file.mimetype.split('/');
      const fileType = mimeType[1];
      const fileName = file.originalname + '.' + fileType;
      cb(null, fileName);
    }
  }
)

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
  allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
}

export const storageMiddleware = multer({ storage: diskStorage, fileFilter: fileFilter }).single('image');

