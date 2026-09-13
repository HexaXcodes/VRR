import 'dotenv/config'
import mongoose from 'mongoose'
import connectDB from './config/db.js'
import { createApp } from './app.js'

try {
  const app = createApp()
  await connectDB()
  const server = app.listen(process.env.PORT || 5000, () => console.log(`VRR Academy API listening on ${server.address().port}`))
  server.on('error', () => { console.error('Unable to start HTTP server'); mongoose.disconnect().finally(() => process.exit(1)) })
  const shutdown = () => {
    const deadline = setTimeout(() => process.exit(1), 10000)
    deadline.unref()
    server.close(async () => { await mongoose.disconnect(); clearTimeout(deadline); process.exit(0) })
  }
  process.once('SIGTERM', shutdown)
  process.once('SIGINT', shutdown)
} catch (error) {
  if (error.code === 'INVALID_ENV') {
    console.error('Startup configuration error:', error.message)
  } else if (error.name === 'MongooseServerSelectionError') {
    console.error('Startup failed: cannot connect to MongoDB. Start your local MongoDB service or check MONGODB_URI and database network access.')
  } else {
    console.error('Startup failed:', error.name)
  }
  await mongoose.disconnect()
  process.exitCode = 1
}
