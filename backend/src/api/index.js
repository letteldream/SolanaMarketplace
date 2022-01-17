const express = require('express');

const users = require('./users');
const upload = require('./upload');

const router = express.Router();

router.get('/', (req, res) => {console.log("testing now")
  res.json({
    message: 'This is backend right?'
  });
});

router.use('/users', users);
router.use('/upload', upload);

module.exports = router;