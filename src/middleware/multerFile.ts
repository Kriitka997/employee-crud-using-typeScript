import multer from "multer";
import path from 'path';

// destination function to store employee profile picture
const fileStorage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, path.join('src/uploads/'));
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// function for check file type.
const uploadFile = (req: any, file: any, cb: any) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

export default multer({ storage: fileStorage, fileFilter: uploadFile });