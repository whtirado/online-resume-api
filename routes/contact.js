const express = require('express');
const router = express.Router();
const contactCtrl = require('../controllers/contact');

router.post('/list', contactCtrl.getMessages);
router.post('/new', contactCtrl.submitMessage);
router.delete('/:id', contactCtrl.deleteMessage);

module.exports = router;
