import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(req, file, callback) {
      const filehash = crypto.randomBytes(10).toString('hex');
      const filename = `${filehash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
