# Admissions frontend — Stitch implementation

The reference is the supplied `../code.html` and `../screen.png`. The explicit palette in the task takes precedence over older colours in `../DESIGN.md`. React, Vite, Tailwind, Axios and the About/Courses routes are retained. No backend application code was changed.

## Run

From frontend:
```sh
npm install
npm run dev
npm run lint
npm run build
npm run test:e2e
```

The development server uses port 5173 and proxies /api to the existing backend on port 5000. Start the backend with its configured MongoDB and JWT secret to use forms locally. For separate frontend/backend deployments, set VITE_API_URL to the backend URL including /api. If left unset, requests use same-origin /api (configure a reverse proxy in production).

Browser tests require backend dev dependencies installed (`cd backend && npm install`) and Google Chrome. Set PLAYWRIGHT_CHANNEL=msedge to use installed Microsoft Edge instead. The tests launch Vite on 5174 and the unchanged backend on 5099 with a disposable MongoDB; no production database or credentials are read. MongoDB binaries are cached under backend/node_modules/.cache. Test reports/screenshots are ignored by Git under frontend/test-results.

## Design and interactions

Implemented the exported header, hero, trust strip, repeated two-row feature marquees, editorial Why VRR section, pathway cards, five-stage learning system, five faculty cards, results panel, campus gallery/cards, admissions process, navy fee section, FAQ, contact/footer, and mobile contact bar.

All marquees have mirrored seamless movement, hover/focus pause, a pause button, hidden duplicate accessibility content, and static scrollable rows for reduced motion. Native modal dialogs make the background inert, support keyboard focus, Escape and backdrop dismissal, restore trigger focus, and lock background scrolling. Mobile dialogs use a bottom-sheet layout with viewport limits and safe-area padding.

The gold/serif headlines and navy/gold/warm-white palette follow the supplied export. Legacy About/Courses colour tokens map to this palette so those routes remain intact. Shared leadership text received only an escaped-quote lint fix.

## API contract

services/api.js exposes:
- submitLead → POST /leads
- submitFeeStructureRequest → POST /leads/fee-structure
- submitCampusVisitRequest → POST /leads/campus-visit
- submitCounsellingRequest → POST /leads/counselling

All paths are relative to the /api base URL. No public GET enquiry functions or legacy enquiry requests remain.

LeadForm builds only accepted public fields: studentName, parentName when supplied, phone, interestedStream, leadSource=website; targetExam for fee/counselling/admission, currentClass for counselling/admission, and requestType=admission for admission. Visit payloads use campusVisit.preferredDate/timeSlot and optional preferredCampus. Only studentName and phone are required by the backend. Fee forms therefore do not require currentClass. PCMC and PCME cannot select NEET in the UI.

Forms prevent duplicate in-flight submission, disable controls during submission, retain entries after errors, show field errors and an accessible summary, reset after success, and cancel pending requests on unmount. Success says the team will contact the applicant; it does not promise instant fees or confirm a visit slot.

## Supply verified assets

- `src/data/faculty.js`: add photo, bio, teachingFocus to the relevant record. Defaults are null; supplied properties take precedence. Example: `photo: '/images/faculty/keerthi-nv.jpg', bio: 'Verified biography supplied by management'`. Put the image in public/images/faculty. Null photos render initials; empty biography/focus sections are omitted.
- `src/config/site.js`: replace heroImage/heroImageAlt with approved VRR classroom photography. Current local SVG is explicitly a neutral placeholder.
- Set resultsImage to `'/images/results/2025-results.jpg'` after verifying the graphic/year. The existing VRR2.jpeg was retained, but not assigned to 2025 without confirmation.
- `src/components/home/CampusSection.jsx`: replace the gallery photo=null records with approved local photos for their labels. Current blocks explicitly say Photo coming soon and make no facility claims.
- Set site.collegeMapsUrl after confirming the Shanthi Niketan location. Until then its card says Confirm Location and leads to the admissions contact section instead of an invented map.
- Existing logo, phone, WhatsApp, email and VRR map/address are centralized in site.js. Google Fonts load Source Serif 4 and Plus Jakarta Sans; serif/system fallbacks are provided.

## Cleanup and limitations

Removed only unused former homepage components and their unused image/performance helpers after checking all source imports. Kept AcademicLeadership, About, VRRCourses, and all existing public images.

There were no backend contract mismatches requiring backend changes. The starting lint configuration referenced an uninstalled React Refresh plugin; installed the compatible 0.4.x version. Playwright was added only as a development dependency.

The previous frontend dependency audit reported 15 advisories; this task does not perform a framework/dependency migration. Configure real backend hosting and verified institutional assets before publishing.

## Final verification

- `npm run lint`: passed, zero errors or warnings.
- `npm run build`: passed (119 modules).
- `npm run test:e2e`: 12 passed in 23.2 seconds using headless Chrome.
- Responsive checks and screenshots: 375, 430, 768, 1024, 1440 pixels; no horizontal overflow or browser console errors, desktop hero first line remains single-line.
- Real backend submissions returned 201 for all four lead flows. Negative response tests simulate validation, rate-limit, and network failures to verify UI recovery.
- Faculty modal focus, Escape/backdrop dismissal, reduced motion, marquee pause, navigation, and retained About/Courses routes passed.
- Git status reports this project as untracked within the parent repository, so there is no tracked baseline diff. No commits were made.

## Files created

- `frontend/src/config/site.js`
- `frontend/src/data/faculty.js`
- `frontend/src/components/Icon.jsx`
- `frontend/src/components/WhatsAppCTA.jsx`
- `frontend/src/components/Modal.jsx`
- `frontend/public/images/campus-placeholder.svg`
- `frontend/src/components/forms/LeadForm.jsx`
- `frontend/src/components/forms/CampusVisitModal.jsx`
- `frontend/src/components/forms/CounsellingModal.jsx`
- `frontend/src/components/forms/AdmissionEnquiryModal.jsx`
- `frontend/src/components/home/HeroSection.jsx`
- `frontend/src/components/home/TrustStrip.jsx`
- `frontend/src/components/home/FeatureMarquee.jsx`
- `frontend/src/components/home/WhyVRR.jsx`
- `frontend/src/components/home/Pathways.jsx`
- `frontend/src/components/home/LearningSystem.jsx`
- `frontend/src/components/home/FacultyProfileModal.jsx`
- `frontend/src/components/home/FacultySection.jsx`
- `frontend/src/components/home/ResultsSection.jsx`
- `frontend/src/components/home/CampusSection.jsx`
- `frontend/src/components/home/AdmissionsProcess.jsx`
- `frontend/src/components/home/FeeEnquirySection.jsx`
- `frontend/src/components/home/FAQSection.jsx`
- `frontend/src/components/home/ContactSection.jsx`
- `frontend/src/components/home/MobileCTA.jsx`
- `frontend/playwright.config.js`
- `frontend/tests/api-server.mjs`
- `frontend/tests/home.spec.js`
- `frontend/FRONTEND_IMPLEMENTATION.md`

## Files modified

- `frontend/src/services/api.js`
- `frontend/tailwind.config.js`
- `frontend/src/index.css`
- `frontend/src/components/Navbar.jsx`
- `frontend/src/components/Footer.jsx`
- `frontend/src/pages/Home.jsx`
- `frontend/src/App.jsx`
- `frontend/package.json`
- `frontend/package-lock.json`
- `frontend/index.html`
- `frontend/src/utils/seo.js`
- `frontend/src/components/AcademicLeadership.jsx`
- `frontend/.gitignore`
- `frontend/.eslintrc.json`

## Files removed

- `frontend/src/components/Hero.jsx`
- `frontend/src/components/Achievers.jsx`
- `frontend/src/components/Courses.jsx`
- `frontend/src/components/IntegratedProgram.jsx`
- `frontend/src/components/WhyChooseUs.jsx`
- `frontend/src/components/Features.jsx`
- `frontend/src/components/Testimonials.jsx`
- `frontend/src/components/Contact.jsx`
- `frontend/src/components/AdmissionsProcess.jsx`
- `frontend/src/components/AdmissionsCTA.jsx`
- `frontend/src/components/LazyImage.jsx`
- `frontend/src/utils/performance.js`
