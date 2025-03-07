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
      'text/plain',
      "application/msword",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
    "application/vnd.ms-word.document.macroEnabled.12",
    "application/vnd.ms-word.template.macroEnabled.12",
    "application/vnd.ms-excel",
    "application/vnd.ms-excel",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
    "application/vnd.ms-excel.sheet.macroEnabled.12",
    "application/vnd.ms-excel.template.macroEnabled.12",
    "application/vnd.ms-excel.addin.macroEnabled.12",
    "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
    "application/vnd.ms-powerpoint",
    "application/vnd.ms-powerpoint",
    "application/vnd.ms-powerpoint",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.openxmlformats-officedocument.presentationml.template",
    "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
    "application/vnd.ms-powerpoint.addin.macroEnabled.12",
    "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
    "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
    "application/vnd.ms-powerpoint.slideshow.macroEnabled.12"
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb('Invalid file type. Only PDF, Excel, CSV, and Word are allowed.');
    }
  }
});

// GET: Dashboard
router.get('/', fileController.getDashboard);

// POST: Upload file
// For multiple uploads, rename 'file' to 'files' in the field name
router.post('/upload',upload.array('files', 5), fileController.uploadFiles);
router.get('/download/:fileName', fileController.downloadFile);
// New: Delete route
router.get('/delete/:fileName', fileController.deleteFile);
router.get('/preview/:fileName', fileController.previewFile);

module.exports = router;
