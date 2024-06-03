const express = require('express');
const router = express.Router();
const { getTickets, getTicket, createTicket, deleteTicket, updateTicket } = require('../controllers/ticketController');
const protect = require('../middleware/authMiddleware');

// Re-route into note router
const noteRouter = require('./noteRoutes');
router.use('/:ticketId/notes', noteRouter);

router.get('/', protect, getTickets);

router.post('/', protect, createTicket);

router.get('/:id', protect, getTicket);

router.delete('/:id', protect, deleteTicket);

router.put('/:id', protect, updateTicket);

module.exports = router;
