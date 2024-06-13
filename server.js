const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

const pdfSchema = new mongoose.Schema({
  title: String,
  pdf: String,
});

const Pdf = mongoose.model('Pdf', pdfSchema);

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.post('/api/pdfs/upload-files', async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file;
    const title = req.body.title;
    const uploadPath = __dirname + '/uploads/' + file.name;

    file.mv(uploadPath, async (err) => {
      if (err) return res.status(500).send(err);

      const newPdf = new Pdf({
        title: title,
        pdf: file.name,
      });

      await newPdf.save();
      res.send({ status: 'ok', data: newPdf });
    });
  } catch (err) {
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.get('/api/pdfs/get-files', (req, res) => {
  const directoryPath = path.join(__dirname, 'uploads');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan directory');
    }
    res.send(files);
  });
});

app.use('/files', express.static(__dirname + '/uploads'));

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
