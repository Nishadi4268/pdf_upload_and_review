const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const router = express.Router();

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.post('/upload-files', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded' });
  }
  res.send({
    status: 'ok',
    data: {
      title: req.body.title,
      pdf: req.file.filename
    }
  });
});

router.get('/get-files', (req, res) => {
  // Your code to fetch files from your database or file system
});

module.exports = router;
