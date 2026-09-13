# 🚀 VRR Academy - Complete Setup Instructions

## ✅ What's Been Completed

### Phase 1: Project Setup ✓
- ✅ Created project folder structure
- ✅ Initialized frontend with React + Vite + Tailwind CSS
- ✅ Initialized backend with Node.js + Express
- ✅ Configured routing with React Router v6
- ✅ Set up MongoDB connection configuration
- ✅ Installed all dependencies
- ✅ Created environment files

### Phase 2: UI Components ✓
- ✅ Navbar with responsive mobile menu
- ✅ Hero section with gradient and animations
- ✅ Achievers/Success stories section
- ✅ Courses component (Foundation, JEE, NEET)
- ✅ Why Choose Us section
- ✅ Features showcase
- ✅ Testimonials section
- ✅ Contact form with API integration
- ✅ Footer with links and social media
- ✅ Global styles and animations

### Phase 3: Backend Development ✓
- ✅ Express server setup
- ✅ MongoDB connection configuration
- ✅ Enquiry model with validation
- ✅ API controllers (CRUD operations)
- ✅ API routes (POST, GET, PUT, DELETE)
- ✅ Input validation middleware
- ✅ Error handling middleware
- ✅ CORS configuration
- ✅ Utility functions for responses and logging

### Phase 4: Integration & Documentation ✓
- ✅ API utility functions (response helpers, logger)
- ✅ Comprehensive API documentation
- ✅ Development guide and workflow
- ✅ Environment configuration
- ✅ Git setup with initial commit

---

## 📋 Prerequisites

Before getting started, ensure you have:

- **Node.js** v18+ ([Download](https://nodejs.org))
- **npm** (comes with Node.js)
- **MongoDB** (either local or MongoDB Atlas cloud)
- **Git** ([Download](https://git-scm.com))
- **VS Code** or any code editor

### Check Installation
```bash
node --version
npm --version
git --version
```

---

## 🔧 MongoDB Setup

### Option 1: Local MongoDB (Recommended for Development)

**Windows:**
1. Download MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. MongoDB runs as a service by default
4. Verify: Open Terminal and run `mongosh`

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### Option 2: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free tier available)
3. Create a new project
4. Create a cluster (M0 free tier)
5. Create a database user
6. Whitelist your IP (0.0.0.0/0 for development)
7. Copy connection string
8. Replace `MONGODB_URI` in `backend/.env` with your connection string

**Connection String Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/vrr_academy?retryWrites=true&w=majority
```

---

## 🚀 Running the Project

### Step 1: Start Backend Server

**Terminal 1:**
```bash
cd c:\Users\prash\OneDrive\Desktop\VRR_Academy\backend

# Install dependencies (if not already installed)
npm install

# Start the server
npm run dev
```

**Expected Output:**
```
✅ MongoDB connected successfully
🚀 Server is running on http://localhost:5000
```

### Step 2: Start Frontend Development Server

**Terminal 2:**
```bash
cd c:\Users\prash\OneDrive\Desktop\VRR_Academy\frontend

# Install dependencies (if not already installed)
npm install

# Start the dev server
npm run dev
```

**Expected Output:**
```
VITE v5.0.8  ready in 123 ms

➜  Local:   http://localhost:5173/
```

### Step 3: Access the Application

Open your browser and go to:
```
http://localhost:5173
```

You should see the VRR Academy website with:
- Navigation bar with smooth scrolling
- Hero section with gradient
- Courses information
- Achievements/Success stories
- Contact form
- And more...

---

## 🧪 Testing the API

### Option 1: Using Postman

1. Download Postman from https://www.postman.com/downloads/
2. Create new request
3. Test endpoints:

```
Base URL: http://localhost:5000/api

POST /enquiry - Submit enquiry
GET /enquiry - Get all enquiries
GET /enquiry/:id - Get specific enquiry
GET /health - Check server status
```

### Option 2: Using cURL (Terminal)

**Submit Enquiry:**
```bash
curl -X POST http://localhost:5000/api/enquiry \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Student",
    "phone": "9876543210",
    "class": "12",
    "course": "JEE",
    "message": "I want to join"
  }'
```

**Get All Enquiries:**
```bash
curl http://localhost:5000/api/enquiry
```

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

### Option 3: Using Browser

- Health Check: http://localhost:5000/api/health
- Get Enquiries: http://localhost:5000/api/enquiry

---

## 🎨 Frontend Features

### Responsive Design
- ✅ Mobile-first approach
- ✅ Breakpoints: sm, md, lg, xl
- ✅ Hamburger menu for mobile
- ✅ Adaptive layouts

### Animations
- ✅ Fade-in effects
- ✅ Hover animations
- ✅ Smooth scroll behavior
- ✅ Gradient backgrounds

### Components
1. **Navbar** - Fixed sticky navigation with smooth scrolling
2. **Hero** - Eye-catching hero section with CTA buttons
3. **Achievers** - Display of top student rankings
4. **Courses** - Course cards with details
5. **Features** - Feature highlights
6. **Testimonials** - Student and parent reviews
7. **Contact** - Enquiry form integrated with backend
8. **Footer** - Links, contact info, social media

---

## ⚙️ Project Structure

```
VRR_Academy/
├── frontend/
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Navigation component
│   │   │   ├── Hero.jsx        # Hero section
│   │   │   ├── Achievers.jsx   # Success stories
│   │   │   ├── Courses.jsx     # Course cards
│   │   │   ├── Features.jsx    # Features
│   │   │   ├── Testimonials.jsx # Reviews
│   │   │   ├── Contact.jsx     # Enquiry form
│   │   │   └── Footer.jsx      # Footer
│   │   ├── pages/
│   │   │   └── Home.jsx        # Home page
│   │   ├── services/
│   │   │   └── api.js          # API calls
│   │   ├── styles/
│   │   │   └── (tailwind css)
│   │   ├── App.jsx             # Main app
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env
│
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   └── enquiryController.js # Business logic
│   ├── models/
│   │   └── Enquiry.js          # Database schema
│   ├── routes/
│   │   └── enquiryRoutes.js    # API routes
│   ├── middleware/
│   │   └── validation.js       # Input validation
│   ├── utils/
│   │   ├── response.js         # Response helpers
│   │   └── logger.js           # Logging utility
│   ├── server.js               # Main server
│   ├── package.json
│   ├── .env
│   └── API_DOCS.md             # API documentation
│
├── README.md                   # Project README
├── DEVELOPMENT.md              # Development guide
└── SETUP_INSTRUCTIONS.md       # This file
```

---

## 🔑 Environment Variables

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

## 🐛 Troubleshooting

### Issue: MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solutions:**
- ✅ Start MongoDB: `mongod` (Windows) or `brew services start mongodb-community` (Mac)
- ✅ Or use MongoDB Atlas and update MONGODB_URI in .env

### Issue: Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solutions:**
- ✅ Change PORT in backend/.env (e.g., PORT=5001)
- ✅ Or kill process using the port

### Issue: CORS Error in Browser
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solutions:**
- ✅ Verify FRONTEND_URL in backend/.env matches your frontend URL
- ✅ Check origin header is correct

### Issue: Dependencies Not Installing
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Frontend Won't Start
```bash
# Clear Vite cache
rm -rf frontend/.vite
npm run dev
```

---

## 📱 Testing Contact Form

1. Go to http://localhost:5173
2. Scroll to "Contact Us" section
3. Fill the form:
   - Name: Any name
   - Phone: 10-digit number (e.g., 9876543210)
   - Class: Select from dropdown
   - Course: Select from dropdown
   - Message: Optional
4. Click "Submit Enquiry"
5. Should see success message

**Check Submitted Data:**
```bash
curl http://localhost:5000/api/enquiry
```

---

## 📦 Build for Production

### Frontend
```bash
cd frontend
npm run build

# This creates a 'dist' folder with optimized files
# Deploy to Vercel, Netlify, or any static hosting
```

### Backend
```bash
# Backend is already production-ready
# Deploy to Render, Railway, Heroku, or any Node.js hosting
```

---

## 🔗 API Endpoints Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/enquiry` | Submit enquiry |
| GET | `/api/enquiry` | Get all enquiries |
| GET | `/api/enquiry/:id` | Get specific enquiry |
| PUT | `/api/enquiry/:id` | Update enquiry |
| DELETE | `/api/enquiry/:id` | Delete enquiry |
| GET | `/api/health` | Server health check |

See `backend/API_DOCS.md` for complete API documentation.

---

## 📝 Git Workflow

```bash
# Check status
git status

# Add changes
git add .

# Commit
git commit -m "feat: Add new feature"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main
```

---

## 🎓 Tech Stack Summary

| Component | Technology |
|-----------|-----------|
| Frontend Framework | React 18 |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Backend Framework | Express.js |
| Database | MongoDB |
| Node Version | 18+ |
| Package Manager | npm |

---

## 📚 Useful Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Vite Documentation](https://vitejs.dev)
- [Axios Documentation](https://axios-http.com)

---

## ✨ Next Steps

### To Continue Development:

1. **Phase 5: Performance & SEO Optimization**
   - Add meta tags for SEO
   - Image optimization
   - Lazy loading
   - Code splitting

2. **Phase 6: Deployment**
   - Deploy frontend to Vercel
   - Deploy backend to Render
   - Setup MongoDB Atlas
   - Configure domain names

3. **Future Features**
   - User authentication
   - Admin dashboard
   - Student portal
   - Email notifications
   - Payment integration

---

## 🆘 Need Help?

- Check `DEVELOPMENT.md` for development guidelines
- Check `backend/API_DOCS.md` for API details
- Review component files for implementation examples
- Check browser console for frontend errors
- Check terminal for backend errors

---

## 📄 License

ISC

---

**Project Created:** January 2024  
**Current Version:** 1.0.0 (Phase 4 Complete)  
**Status:** ✅ Ready for Phase 5 & 6

---

**Good luck with your VRR Academy website! 🎉**
