# CVCraft - Professional Resume Builder

## System Prompt for AI Assistants

You are assisting with CVCraft, a full-stack MERN resume builder application. Use this prompt to understand the system architecture, features, and how to assist with development, debugging, and improvements.

---

## Project Overview

**CVCraft** is a modern, professional resume/CV builder web application that allows users to:
- Create, edit, and manage multiple resumes
- Choose from 3+ professionally designed templates with live preview
- Download resumes as PDF
- Track resume completion with a scoring system
- Auto-save changes with real-time preview

**Stack**: React 19 + Vite (frontend), Express 5 + MongoDB (backend), JWT auth, html2pdf.js for PDF export

---

## Architecture

### Backend (Express 5 + MongoDB)
**Location**: `/server`

**Endpoints**:
- `POST /api/auth/register` — Create account (email, name, password ≥8 chars)
- `POST /api/auth/login` — Sign in (returns JWT token)
- `GET /api/auth/me` — Fetch current user profile (protected)
- `GET /api/cvs` — List all user's resumes (sorted by updated date, newest first)
- `POST /api/cvs` — Create new resume
- `GET /api/cvs/:id` — Fetch single resume
- `PUT /api/cvs/:id` — Update resume (debounced autosave)
- `DELETE /api/cvs/:id` — Delete resume
- `POST /api/cvs/:id/duplicate` — Clone resume with "Copy of [title]" title

**Models**:
- **User**: name, email, password (hashed), timestamps
- **CV**: user (ref), title, template (classic|modern|creative), personal, experience[], education[], skills[], certifications[], timestamps

**Personal Object**: fullName, jobTitle, email, phone, location, linkedin, github, summary

**Experience Item**: jobTitle, company, location, startDate, endDate, current (bool), description

**Education Item**: degree, institution, location, startDate, endDate, gpa, description

**Certification Item**: name, issuingOrg, date, credentialId

**Skill**: string array of skill names

**Security**:
- bcryptjs password hashing
- JWT tokens (7d expiry by default)
- Rate limiting: 5 auth requests per 15 minutes
- Helmet for HTTP headers
- CORS restricted to ALLOWED_ORIGIN env variable
- All endpoints (except auth) require Bearer token

---

### Frontend (React 19 + Vite)
**Location**: `/client/src`

**Structure**:
```
src/
  pages/
    Home.jsx           — Landing page with hero, stats, templates, testimonials, CTA
    Login.jsx          — Split-screen auth form with password toggle
    Register.jsx       — Registration form with validation
    Dashboard.jsx      — Resume list with grid cards, quick stats, create button
    Builder.jsx        — CV editor + live preview, template switcher, score circle
  components/
    Sidebar.jsx        — Fixed left nav (logo, user avatar, nav links, logout)
    Navbar.jsx         — Top nav for landing page (sticky, scroll effect)
    Modal.jsx          — Reusable dialog (delete confirmation, etc)
    EmptyState.jsx     — Placeholder for empty states
    LoadingSpinner.jsx — Animated spinner component
  templates/
    ClassicTemplate.jsx    — Clean, ATS-friendly, white background
    ModernTemplate.jsx     — Dark navy sidebar + white main column
    CreativeTemplate.jsx   — Gold header, two-column body, accent colors
    [Additional templates]
  context/
    AuthContext.jsx    — React Context + useReducer for auth state (user, token, isAuthenticated)
  api/
    axios.js           — Axios instance with JWT interceptor
  index.css          — Global design system (CSS custom properties, Playfair/DM Sans fonts)
```

**Key Libraries**:
- react-router-dom: Client-side routing
- axios: HTTP client with auto JWT injection
- react-hot-toast: Toast notifications
- html2pdf.js: PDF export
- React Context for auth state management

---

## Design System

**Colors**:
- Primary Navy: `#1e3a5f` (buttons, links, headings)
- Accent Gold: `#c5943a` (highlights, badges, CTAs)
- White: `#ffffff` (backgrounds)
- Grays: `#f8f9fc` (50) to `#1a202c` (900)
- Semantic: Red `#e53e3e`, Green `#38a169`

**Typography**:
- Display: Playfair Display (headings, logo)
- Body: DM Sans (all text)

**Spacing**: 8px base unit (--space-1 = 8px, --space-2 = 16px, etc)

**Border Radius**:
- Buttons/inputs: 6px
- Cards: 8px
- Modal: 16px

**Transitions**: 200ms ease by default (--transition), 350ms for slower animations

---

## Features

### 1. Authentication
- Sign up with email/name/password validation
- Sign in with JWT
- Password toggle visibility
- Remember session (localStorage)
- Auto-logout on 401

### 2. Dashboard
- Persistent sidebar with user avatar (initials circle)
- Top greeting bar: "Good morning, [Name]"
- Quick stats: total CVs, last edited, last template
- CV grid with cards showing:
  - Template thumbnail (color preview)
  - Title
  - Last updated date
  - Edit, Download, Duplicate, Delete buttons
- Empty state when no CVs
- Delete confirmation modal

### 3. CV Builder
- **Left panel (380px)**: Editor with collapsible tabs
  - Template switcher (3 visual previews)
  - CV Completion Score (0-100%) with actionable tip
  - Tabs: Personal, Experience, Education, Skills, Certifications
  - Form fields with real-time validation
  - Add/remove list items (exp, edu, certs)
  - Skills as removable pills

- **Right panel**: Live A4 preview
  - Full-page render of selected template
  - Updates instantly as you type
  - Printable/exportable to PDF

- **Autosave**: 1.5s debounce after last keystroke
  - Shows "Saving…" then "✓ Autosaved"
  - Unsaved changes show orange dot

- **Header**: 
  - Breadcrumb + editable title
  - Save status
  - Download PDF button

- **Mobile**: Stack editor above preview with tab toggle

### 4. Templates
Each template is a React component receiving `{ data }` prop containing all CV fields.

**Template 1 — Classic** (Default):
- White background, navy headings
- Name large (Playfair, 26px), job title below in gray
- Contact row with icons
- 1.5px navy divider
- Uppercase section titles in navy, letter-spaced
- Experience/Education with date on right
- Skills as small nav-colored pills
- ATS-optimized, minimal styling

**Template 2 — Modern**:
- 32% dark navy left sidebar, 68% white right column
- Sidebar: white name, job title in blue, contact, skills pills
- Main: Experience, Education, Summary
- Two-tone professional look
- Good for tech/corporate roles

**Template 3 — Creative**:
- Gold banner header with white name
- Two-column body: 60% left (exp/edu/summary), 40% right (skills, certs)
- Right column on gray background
- Gold accents for section titles and dates
- Certs in styled boxes with left gold border
- Suits design/creative roles

---

## User Flows

### New User Flow
1. Land on home page (hero + testimonials + templates)
2. Click "Create My Resume Free"
3. Register page (split-screen layout)
4. Redirected to dashboard
5. Click "+ New Resume"
6. Lands in builder with blank CV
7. Fills in Personal tab
8. Toggles between tabs, adds experience, education, skills
9. Selects template from switcher
10. Preview updates in real-time
11. Clicks "Download PDF"
12. Returns to dashboard, sees new resume in grid

### Returning User Flow
1. Login page
2. Directed to dashboard
3. Sees list of previous resumes
4. Clicks "Edit" to open builder
5. Makes changes (auto-saved)
6. Can "Download PDF" or "Duplicate" resume

---

## CV Completion Score Logic
Points awarded for:
- Full Name (10)
- Job Title (10)
- Email (10)
- Phone (5)
- Location (5)
- LinkedIn (5)
- Professional Summary >50 chars (15)
- At least 1 experience entry (20)
- At least 1 education entry (10)
- At least 3 skills (10)
- Max: 100

Shows actionable tips like:
- <30%: "Add your job title and summary"
- <60%: "Add work experience and skills"
- <80%: "Add LinkedIn and education"
- ≥80%: "Great! Your CV is looking complete"

---

## API Response Format
All responses follow:
```json
{
  "success": true/false,
  "message": "...",
  "data": { /* payload */ },
  "errors": [ { "field": "...", "message": "..." } ]
}
```

---

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cvcraft
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
ALLOWED_ORIGIN=http://localhost:5173
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

---

## Common Development Tasks

### Add a New CV Template
1. Create `src/templates/[TemplateName]Template.jsx`
2. Export component accepting `{ data }` prop
3. Style with inline styles (for html2pdf compatibility)
4. Use template dimensions: full width, A4 height (1123px at 96dpi)
5. Import in `Builder.jsx`
6. Add to `TEMPLATES` array with id, label, colors
7. Conditional render in `TemplateComponent` selection

### Customize Design System
- Edit CSS custom properties in `src/index.css` (--navy, --gold, --space-*, etc)
- Update font imports in `index.html`
- Changes cascade across all components

### Add Auth Middleware
- Use `protect` middleware from `routes/auth.js` on protected endpoints
- All CV routes already use it
- Checks Bearer token, returns 401 if missing/invalid

### Extend CV Data Model
- Add fields to CV schema in `models/CV.js`
- Update form fields in `Builder.jsx` corresponding tab
- Update template components to display new fields
- No migration needed for MongoDB (flexible schema)

---

## Deployment Checklist

**Backend (Heroku, Railway, etc)**:
- [ ] Set environment variables (.env)
- [ ] Connect MongoDB Atlas
- [ ] Set JWT_SECRET to strong random string
- [ ] Set ALLOWED_ORIGIN to frontend URL
- [ ] Test all endpoints with Postman

**Frontend (Vercel, Netlify, etc)**:
- [ ] Set VITE_API_URL to backend API URL
- [ ] Build: `npm run build`
- [ ] Deploy dist/ folder
- [ ] Test auth flows (login, register, logout)
- [ ] Test PDF download
- [ ] Verify responsive design on mobile

---

## Known Limitations & Future Improvements

**Current**:
- Single user per account (no team/sharing)
- PDF export via html2pdf (client-side, no server-side rendering)
- No resume analytics or recruitment tools
- No custom branding/white-labeling

**Potential Enhancements**:
- Additional templates (5-10 more styles)
- ATS compatibility checker
- Cover letter builder
- Resume templates import/export
- LinkedIn integration to auto-fill
- Job application tracker
- Email reminders to update resume
- Team sharing with invite links
- Admin dashboard

---

## Support & Debugging

### Common Issues

**PDF exports look different than preview**:
- Ensure all styles use CSS variables and inline styles
- Test html2pdf scaling (scale: 2 in options)
- Avoid complex CSS Grid/Flexbox in templates

**Autosave not working**:
- Check JWT token in localStorage
- Verify VITE_API_URL in .env
- Check browser console for axios errors
- Ensure backend is running and accessible

**Template not switching**:
- Check template ID matches value in DB
- Verify TemplateComponent conditional logic
- Check cv.template value in Redux/Context

**Styling issues in production**:
- Ensure CSS custom properties are defined in index.css
- Check font imports are correct in index.html
- Verify no hardcoded colors (use --css-vars)

---

This prompt provides a complete mental model of CVCraft for:
- Feature development
- Bug fixes
- Architecture decisions
- Code reviews
- Onboarding new developers
- AI-assisted coding (like Claude)

Use it as context when asking questions about the codebase, requesting new features, or debugging issues.
