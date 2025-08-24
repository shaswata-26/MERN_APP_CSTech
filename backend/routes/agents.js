const express = require('express');
const { getAgents, createAgent, deleteAgent } = require('../controllers/agents');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, admin, getAgents)
  .post(protect, admin, createAgent);

router.route('/:id')
  .delete(protect, admin, deleteAgent);

module.exports = router;