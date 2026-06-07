import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// POST /api/feedback — submit feedback
router.post('/', async (req, res) => {
  try {
    const { name, message, rating } = req.body;

    if (!name || !message || !rating) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }

    const feedback = new Feedback({ name, message, rating });
    await feedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// GET /api/feedback — get latest 6 approved feedbacks (public)
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .select('name message rating createdAt');
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

export default router;
