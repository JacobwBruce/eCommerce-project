import express from 'express';
import multer from 'multer';
import path from 'path';
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'uploads/');
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

function checkFileType(file: Express.Multer.File, callback: multer.FileFilterCallback) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return callback(null, true);
    } else {
        callback(new Error('Images only!'));
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, callback) {
        checkFileType(file, callback);
    },
});

router.post('/', upload.single('image'), (req: express.Request, res: express.Response) => {
    res.send(`/${req.file.path}`);
});

export default router;
