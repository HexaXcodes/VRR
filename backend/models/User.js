import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true, maxlength: 254, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ['admin', 'counsellor'], required: true },
  isActive: { type: Boolean, default: true }, lastLogin: Date,
}, { timestamps: true, toJSON: { transform: (_doc, value) => { delete value.passwordHash; return value } } })
export default mongoose.model('User', schema)
