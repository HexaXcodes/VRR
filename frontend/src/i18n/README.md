# Frontend languages

English (`en`), Kannada (`kn`) and Hindi (`hi`) are bundled through i18next and react-i18next. The navbar selector changes the language immediately. `vrr-language` in localStorage persists the choice; missing, invalid or unavailable storage defaults to English. Browser language is deliberately not detected. The active language updates `<html lang>`.

Use meaningful nested resource keys with `useTranslation()` in components. Translate complete sentences with interpolation when they contain dynamic values. Keep all three resource files in sync. Current resources contain 418 string leaves per language, including list entries.

## Submission boundary

Only display labels are translated. `LeadForm` still submits its original English values for streams, exams, class, time slot, campus, lead source and request type. Do not pass translated labels to the API. Names, qualifications, phone numbers, email addresses and URLs stay unchanged. The pathway modal uses translated descriptions alongside the canonical stream and exam mappings in `data/pathways.js`.

Form state stores message identifiers or structured server errors, so changing language also updates existing feedback. Native constraint messages are localized without removing the existing constraints. Form values and open modal state survive a language change.

## Typography and assets

English keeps Source Serif 4 and Plus Jakarta Sans. Kannada uses Noto Sans Kannada; Hindi uses Noto Sans Devanagari. `languages.css` gives Indic headings room for script marks and longer text. The campus placeholder illustration has no embedded English text; its localized caption is HTML. Approved future images can still replace it through the existing site configuration.

## Verification and editorial review

Run `npm run lint`, `npm run build`, and `npm run test:e2e`. `tests/i18n.spec.js` verifies resource parity, interpolation, canonical codes, switching, persistence, default language, translated layouts, modal state, keyboard access and actual canonical submissions to the isolated test API.

Kannada and Hindi content is implemented throughout the current frontend. Management has not reviewed the translations, particularly the first-person leadership messages and academic terminology. Future supplied faculty biographies or text embedded in real result images will need corresponding approved language content.

## Files in this change

Created:

- `src/i18n/index.js`
- `src/i18n/locales/en.json`, `kn.json`, `hi.json`
- `src/i18n/languages.css`
- `src/i18n/README.md`
- `src/components/LanguageSelector.jsx`
- `tests/i18n.spec.js`

Updated frontend files:

- `package.json`, `package-lock.json`, `index.html`
- `public/images/campus-placeholder.svg`
- `src/main.jsx`, `src/App.jsx`
- `src/pages/Home.jsx`, `About.jsx`, `VRRCourses.jsx`
- `src/components/Navbar.jsx`, `Footer.jsx`, `Modal.jsx`, `PathwayModal.jsx`, `AcademicLeadership.jsx`
- `src/components/forms/LeadForm.jsx`, `CounsellingModal.jsx`, `CampusVisitModal.jsx`, `AdmissionEnquiryModal.jsx`
- `src/components/home/HeroSection.jsx`, `TrustStrip.jsx`, `FeatureMarquee.jsx`, `WhyVRR.jsx`, `StudentSupport.jsx`
- `src/components/home/Pathways.jsx`, `CareerExplorer.jsx`, `LearningSystem.jsx`, `FacultySection.jsx`, `FacultyProfileModal.jsx`
- `src/components/home/ResultsSection.jsx`, `CampusSection.jsx`, `AdmissionsProcess.jsx`, `FeeEnquirySection.jsx`, `FAQSection.jsx`, `ContactSection.jsx`, `MobileCTA.jsx`
- `tests/api-server.mjs`: isolates the multilingual suite's real API rate-limit quota on a separate local application instance; production middleware remains unchanged.

Added dependencies: `i18next` and `react-i18next`. No backend code or API service changes.
