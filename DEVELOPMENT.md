# VRR Academy - Development Guide

## Quick Start

### Prerequisites
- Node.js v18+ 
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Git

### Installation

#### 1. Clone and Setup
```bash
cd VRR_Academy
npm install
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Frontend runs on: `http://localhost:5173`

#### 3. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
Backend runs on: `http://localhost:5000`

#### 4. MongoDB Setup
Option A: Local MongoDB
```bash
# Start MongoDB service
mongod
```

Option B: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in `backend/.env`

---

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=VRR Academy
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/vrr_academy
FRONTEND_URL=http://localhost:5173
```

---

## Project Structure

```
vrr-academy/
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── styles/          # CSS files
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind CSS config
│   └── package.json
│
├── backend/
│   ├── config/              # DB configuration
│   ├── controllers/         # Business logic
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── utils/               # Helper utilities
│   ├── server.js            # Main server file
│   ├── .env                 # Environment variables
│   └── package.json
│
└── README.md
```

---

## Git Workflow

### Branch Names
- `main` - Production ready code
- `develop` - Development branch
- `feature/*` - New features
- `fix/*` - Bug fixes

### Commit Format
```
feat: Add new feature
fix: Fix bug
style: Update styling
refactor: Refactor code
docs: Update documentation
```

### Example Workflow
```bash
git checkout develop
git checkout -b feature/add-user-auth
# Make changes...
git add .
git commit -m "feat: Add user authentication"
git push origin feature/add-user-auth
# Create Pull Request
```

---

## Testing API

### Using Postman
1. Import endpoints from `backend/API_DOCS.md`
2. Set Base URL: `http://localhost:5000/api`
3. Test each endpoint

### Using cURL
```bash
# Submit enquiry
curl -X POST http://localhost:5000/api/enquiry \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "9876543210",
    "class": "12",
    "course": "JEE"
  }'

# Get all enquiries
curl http://localhost:5000/api/enquiry

# Health check
curl http://localhost:5000/api/health
```

---

## Common Issues

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** 
- Start MongoDB: `mongod`
- Or update MONGODB_URI to MongoDB Atlas connection string

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:** 
- Change PORT in `.env`
- Or kill process: `lsof -ti:5000 | xargs kill -9`

### CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:** 
- Check FRONTEND_URL in `backend/.env`
- Ensure frontend URL matches request origin

### Dependencies Issue
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Available Scripts

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview build
npm run lint     # Run ESLint
```

### Backend
```bash
npm run dev      # Start server with nodemon
npm start        # Start server
npm test         # Run tests (when available)
```

---

## Code Style Guidelines

### Frontend (React)
- Use functional components
- Use hooks for state management
- Prop validation with TypeScript (future)
- Consistent component structure:
  ```jsx
  export default function ComponentName() {
    // State
    // Effects
    // Handlers
    // Render
    return (...)
  }
  ```

### Backend (Node.js)
- Use async/await
- Consistent error handling
- Middleware order matters
- MVC architecture
- Clean separation of concerns

---

## Database Schema

### Enquiry Collection
```javascript
{
  _id: ObjectId,
  name: String,
  phone: String (10 digits),
  class: String (9, 10, 11, 12),
  course: String (Foundation, JEE, NEET),
  message: String,
  status: String (new, contacted, enrolled, rejected),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Performance Tips

### Frontend
- Use React.lazy() for code splitting
- Optimize images with proper formats
- Use Tailwind CSS effectively
- Implement infinite scroll or pagination

### Backend
- Index frequently queried fields in MongoDB
- Implement pagination for large datasets
- Use caching for static data
- Monitor database query performance

---

## Deployment

### Frontend (Vercel)
```bash
npm run build
# Push to GitHub
# Connect repository to Vercel
# Auto-deploy on push to main
```

### Backend (Render or Railway)
```bash
# Push code to GitHub
# Connect repository
# Set environment variables
# Deploy
```

### Database (MongoDB Atlas)
- Already in cloud
- Add IP to whitelist
- Create database user

---

## Next Steps (Future Phases)

- [ ] Phase 4: API Integration & Testing
- [ ] Phase 5: Performance & SEO Optimization
- [ ] Phase 6: Deployment
- [ ] Add authentication
- [ ] Add admin dashboard
- [ ] Email notifications
- [ ] Payment integration
- [ ] Student portal

---

## Support & Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Vite Documentation](https://vitejs.dev)

---

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Commit with proper message
5. Create Pull Request
6. Code review & merge

---

## License

ISC

---

**Last Updated:** January 2024
**Version:** 1.0.0
