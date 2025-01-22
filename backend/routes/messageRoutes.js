const express = require('express');
const { handleMessage } = require('../controllers/messageController');

const router = express.Router();

router.post('/chat', handleMessage);

module.exports = router;
