import mongoose from 'mongoose'

export default async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vrr_academy', { serverSelectionTimeoutMS: 10000 })
  console.log('MongoDB connected')
}
