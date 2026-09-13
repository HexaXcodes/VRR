import mongoose from 'mongoose'

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number'],
      trim: true,
    },
    class: {
      type: String,
      required: [true, 'Class is required'],
      enum: ['9', '10', '11', '12'],
    },
    course: {
      type: String,
      required: [true, 'Course is required'],
      enum: ['Foundation', 'JEE', 'NEET'],
    },
    message: {
      type: String,
      trim: true,
      maxlength: [500, 'Message cannot exceed 500 characters'],
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'enrolled', 'rejected'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
)

const Enquiry = mongoose.model('Enquiry', enquirySchema)

export default Enquiry
