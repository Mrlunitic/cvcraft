import { Link } from 'react-router-dom';
import { useState } from 'react';
import api from '../api/axios';
import './Home.css';

const stats = [
  { value: '50,000+', label: 'Resumes Created' },
  { value: '8', label: 'Professional Templates' },
  { value: '95%', label: 'Interview Success Rate' },
  { value: '4.9★', label: 'User Rating' },
];

const features = [
  { icon: '✨', title: 'Stunning Templates', desc: 'Choose from 8 modern, professional templates designed to catch the eye of any recruiter.' },
  { icon: '⚡', title: 'Fast & Easy', desc: 'Our intuitive builder lets you create and customize your resume in just a few minutes.' },
  { icon: '🎯', title: 'ATS-Friendly', desc: 'Templates are optimized to pass through Applicant Tracking Systems effortlessly.' },
  { icon: '📄', title: 'Export to PDF', desc: 'Download a pixel-perfect PDF version of your resume with a single click.' },
  { icon: '🔄', title: 'Auto-Save', desc: 'Never lose your work. CVCraft auto-saves every change you make in real time.' },
  { icon: '📊', title: 'CV Score', desc: 'Get an instant score and actionable tips to make your resume stand out.' },
];

const templates = [
  { name: 'Classic', color: '#1e3a5f', accent: '#c5943a', desc: 'Clean & ATS-Friendly' },
  { name: 'Modern', color: '#0f172a', accent: '#38bdf8', desc: 'Tech & Startup Roles' },
  { name: 'Creative', color: '#c5943a', accent: '#fff', desc: 'Design & Creative Fields' },
];

const steps = [
  { num: '01', title: 'Sign Up Free', desc: 'Create your account in seconds — no credit card required.' },
  { num: '02', title: 'Fill In Your Details', desc: 'Enter your experience, education, skills and personal info.' },
  { num: '03', title: 'Pick a Template', desc: 'Choose from 8 stunning designs tailored for your industry.' },
  { num: '04', title: 'Download & Apply', desc: 'Export your resume as a high-quality PDF and start applying.' },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Software Engineer @ Google',
    avatar: 'SJ',
    quote: 'CVCraft helped me land my dream job at Google. The modern template and ATS optimization made all the difference!'
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager @ Stripe',
    avatar: 'MC',
    quote: 'I had my resume ready in under 10 minutes. The auto-save feature is a lifesaver. Highly recommend to anyone job hunting.'
  },
  {
    name: 'Aisha Patel',
    role: 'UX Designer @ Airbnb',
    avatar: 'AP',
    quote: 'The Creative template is absolutely gorgeous. Recruiters noticed my resume immediately. Got 3 offers in one week!'
  },
];

export default function Home() {
  const [feedback, setFeedback] = useState({ name: '', message: '', rating: 0 });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitState, setSubmitState] = useState('idle'); // idle | loading | success | error
  const [submitMsg, setSubmitMsg] = useState('');

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (feedback.rating === 0) {
      setSubmitState('error');
      setSubmitMsg('Please select a star rating.');
      return;
    }
    setSubmitState('loading');
    try {
      await api.post('/feedback', feedback);
      setSubmitState('success');
      setSubmitMsg('Thank you for your feedback! 🎉');
      setFeedback({ name: '', message: '', rating: 0 });
    } catch {
      setSubmitState('error');
      setSubmitMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="home-container">

      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="logo">CVCraft</div>
        <div className="nav-links">
          <Link to="/login" className="btn btn-outline">Login</Link>
          <Link to="/register" className="btn btn-primary">Sign Up Free</Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="hero">
        <div className="hero-badge">🚀 Trusted by 50,000+ professionals</div>
        <h1>Create a Professional Resume <span className="hero-highlight">in Minutes</span></h1>
        <p>Stand out with modern, beautiful templates. Get hired faster with CVCraft — the smartest resume builder online.</p>
        <div className="hero-cta-group">
          <Link to="/register" className="btn btn-primary btn-large">Get Started — It's Free</Link>
          <Link to="/login" className="btn btn-ghost">Already have an account →</Link>
        </div>
      </header>

      {/* ── Stats Bar ── */}
      <section className="stats-section">
        {stats.map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── Features ── */}
      <section className="features-section">
        <div className="section-header">
          <h2>Everything You Need to Get Hired</h2>
          <p>CVCraft packs powerful tools into one beautifully simple experience.</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Template Preview ── */}
      <section className="templates-section">
        <div className="section-header">
          <h2>Choose Your Perfect Template</h2>
          <p>8 professionally designed templates, each built for different industries and roles.</p>
        </div>
        <div className="templates-preview">
          {templates.map((t, i) => (
            <div key={i} className="template-preview-card" style={{ background: t.color }}>
              <div className="template-preview-header">
                <div style={{ color: t.accent, fontWeight: 700, fontSize: '14px' }}>{t.name} Template</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '4px' }}>{t.desc}</div>
              </div>
              <div className="template-preview-body">
                <div className="tpb-line long" style={{ background: t.accent }}></div>
                <div className="tpb-line medium" style={{ background: 'rgba(255,255,255,0.2)' }}></div>
                <div className="tpb-line short" style={{ background: 'rgba(255,255,255,0.15)' }}></div>
                <div className="tpb-line medium" style={{ background: 'rgba(255,255,255,0.2)' }}></div>
                <div className="tpb-line long" style={{ background: 'rgba(255,255,255,0.15)' }}></div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link to="/register" className="btn btn-primary">Browse All 8 Templates →</Link>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="how-section">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Go from blank page to ready-to-send resume in 4 simple steps.</p>
        </div>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div key={i} className="step-card">
              <div className="step-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>Loved by Job Seekers Worldwide</h2>
          <p>Join thousands of professionals who landed their dream job with CVCraft.</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-quote">"{t.quote}"</div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.avatar}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ── Feedback ── */}
      <section className="feedback-section">
        <div className="section-header">
          <h2>Share Your Experience</h2>
          <p>We'd love to hear what you think about CVCraft. Your feedback helps us improve!</p>
        </div>
        <div className="feedback-card">
          {submitState === 'success' ? (
            <div className="feedback-success">
              <div className="feedback-success-icon">🎉</div>
              <h3>Thank you!</h3>
              <p>{submitMsg}</p>
              <button className="btn btn-primary" onClick={() => setSubmitState('idle')}>Submit Another</button>
            </div>
          ) : (
            <form className="feedback-form" onSubmit={handleFeedbackSubmit}>
              {/* Star Rating */}
              <div className="feedback-stars-label">How would you rate CVCraft?</div>
              <div className="feedback-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star-btn ${star <= (hoverRating || feedback.rating) ? 'active' : ''}`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
                    aria-label={`Rate ${star} stars`}
                  >
                    ★
                  </button>
                ))}
                {(hoverRating || feedback.rating) > 0 && (
                  <span className="star-label">
                    {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][hoverRating || feedback.rating]}
                  </span>
                )}
              </div>

              <div className="feedback-fields">
                <input
                  className="feedback-input"
                  type="text"
                  placeholder="Your name"
                  value={feedback.name}
                  onChange={e => setFeedback(prev => ({ ...prev, name: e.target.value }))}
                  required
                  maxLength={80}
                />
                <textarea
                  className="feedback-input feedback-textarea"
                  placeholder="Tell us what you think... (max 500 characters)"
                  value={feedback.message}
                  onChange={e => setFeedback(prev => ({ ...prev, message: e.target.value }))}
                  required
                  maxLength={500}
                  rows={4}
                />
              </div>

              {submitState === 'error' && (
                <div className="feedback-error">{submitMsg}</div>
              )}

              <button
                className="btn btn-primary feedback-submit"
                type="submit"
                disabled={submitState === 'loading'}
              >
                {submitState === 'loading' ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-section">
        <h2>Ready to Land Your Dream Job?</h2>
        <p>Join 50,000+ professionals. Create your resume for free — no credit card required.</p>
        <Link to="/register" className="btn btn-primary btn-large">Start Building for Free</Link>
      </section>

      {/* ── Footer ── */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">CVCraft</div>
            <p>The modern resume builder for ambitious professionals.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Product</h4>
              <Link to="/register">Templates</Link>
              <Link to="/register">CV Builder</Link>
              <Link to="/register">PDF Export</Link>
            </div>
            <div className="footer-col">
              <h4>Account</h4>
              <Link to="/login">Sign In</Link>
              <Link to="/register">Sign Up Free</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} CVCraft. All rights reserved.</p>
          <p className="footer-credit">
            Built with ❤️ by{' '}
            <a href="https://krijanraigai.com.np/" target="_blank" rel="noopener noreferrer">
              Krijan Raigai
            </a>
          </p>
        </div>
      </footer>

    </div>
  );
}
