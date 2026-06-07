import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  message: { type: String, required: true, trim: true, maxlength: 500 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Feedback', feedbackSchema);
