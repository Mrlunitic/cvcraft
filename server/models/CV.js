import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  jobTitle: String,
  company: String,
  location: String,
  startDate: String,
  endDate: String,
  current: { type: Boolean, default: false },
  description: String
}, { _id: false });

const EducationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  location: String,
  startDate: String,
  endDate: String,
  gpa: String,
  description: String
}, { _id: false });

const CertificationSchema = new mongoose.Schema({
  name: String,
  issuingOrg: String,
  date: String,
  credentialId: String
}, { _id: false });

const PersonalSchema = new mongoose.Schema({
  fullName: String,
  jobTitle: String,
  email: String,
  phone: String,
  location: String,
  linkedin: String,
  github: String,
  summary: String
}, { _id: false });

const CVSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  template: { type: String, default: 'classic' },
  personal: { type: PersonalSchema, default: () => ({}) },
  experience: { type: [ExperienceSchema], default: [] },
  education: { type: [EducationSchema], default: [] },
  skills: { type: [String], default: [] },
  certifications: { type: [CertificationSchema], default: [] },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('CV', CVSchema);
