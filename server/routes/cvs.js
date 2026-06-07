import express from 'express';
import jwt from 'jsonwebtoken';
import CV from '../models/CV.js';

const router = express.Router();

// Middleware to authenticate JWT
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get all CVs for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const cvs = await CV.find({ user_id: req.user }).sort({ updatedAt: -1 });
    res.json({ success: true, data: cvs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Get a single CV
router.get('/:id', auth, async (req, res) => {
  try {
    const cv = await CV.findOne({ _id: req.params.id, user_id: req.user });
    if (!cv) return res.status(404).json({ success: false, message: 'CV not found' });
    res.json({ success: true, data: cv });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Create a new CV
router.post('/', auth, async (req, res) => {
  try {
    const { title, template } = req.body;
    const newCV = new CV({
      user_id: req.user,
      title: title || 'Untitled Resume',
      template: template || 'classic',
      personal: {},
      experience: [],
      education: [],
      skills: [],
      certifications: []
    });
    const savedCV = await newCV.save();
    res.status(201).json({ success: true, data: savedCV });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Update an existing CV (autosave)
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, template, personal, experience, education, skills, certifications } = req.body;
    const cv = await CV.findOne({ _id: req.params.id, user_id: req.user });
    if (!cv) return res.status(404).json({ success: false, message: 'CV not found' });

    if (title !== undefined) cv.title = title;
    if (template !== undefined) cv.template = template;
    if (personal !== undefined) cv.personal = personal;
    if (experience !== undefined) cv.experience = experience;
    if (education !== undefined) cv.education = education;
    if (skills !== undefined) cv.skills = skills;
    if (certifications !== undefined) cv.certifications = certifications;
    cv.updatedAt = Date.now();

    const updatedCV = await cv.save();
    res.json({ success: true, data: updatedCV });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Delete a CV
router.delete('/:id', auth, async (req, res) => {
  try {
    const cv = await CV.findOneAndDelete({ _id: req.params.id, user_id: req.user });
    if (!cv) return res.status(404).json({ success: false, message: 'CV not found' });
    res.json({ success: true, message: 'CV deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Duplicate a CV
router.post('/:id/duplicate', auth, async (req, res) => {
  try {
    const original = await CV.findOne({ _id: req.params.id, user_id: req.user });
    if (!original) return res.status(404).json({ success: false, message: 'CV not found' });

    const duplicate = new CV({
      user_id: req.user,
      title: `Copy of ${original.title}`,
      template: original.template,
      personal: original.personal,
      experience: original.experience,
      education: original.education,
      skills: original.skills,
      certifications: original.certifications,
    });
    const saved = await duplicate.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

export default router;
