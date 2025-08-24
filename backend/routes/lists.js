const express = require('express');
const { uploadList, getLists, getListById } = require('../controllers/lists');
const { protect, admin } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.route('/')
  .get(protect, admin, getLists)
  .post(protect, admin, upload.single('file'), uploadList);

router.route('/:id')
  .get(protect, admin, getListById);

module.exports = router;