const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const { ensureAuth } = require('../middlewares/authMiddleware');

const multer = require('multer');

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
  fileFilter: (req, file, cb) => {
    // Allowed mime types: pdf, excel, csv, word
    // We'll allow:
    // application/pdf
    // application/vnd.ms-excel
    // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    // text/csv
    // application/msword
    // application/vnd.openxmlformats-officedocument.wordprocessingml.document

    const allowedMimes = [
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/bmp',
      'image/webp',
      'application/zip',
      'application/x-7z-compressed',
      'application/x-rar-compressed',
      'application/x-tar',
      'application/x-gtar',
      'application/x-bzip2',
      'application/x-gzip',
      'application/x-lzip',
      'application/x-xz',
      'application/x-compress',
      'application/x-lzma',
      'application/x-lzop',
      'application/x-snappy-framed',
      'text/plain'
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb('Invalid file type. Only PDF, Excel, CSV, and Word are allowed.');
    }
  }
});

// GET: Dashboard
router.get('/', ensureAuth, fileController.getDashboard);

// POST: Upload file
// For multiple uploads, rename 'file' to 'files' in the field name
router.post('/upload', ensureAuth,upload.array('files', 5), fileController.uploadFiles);
router.get('/download/:fileName', ensureAuth, fileController.downloadFile);
// New: Delete route
router.get('/delete/:fileName',ensureAuth, fileController.deleteFile);
router.get('/preview/:fileName', ensureAuth, fileController.previewFile);

module.exports = router;
