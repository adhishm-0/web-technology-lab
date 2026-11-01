import { useMemo, useState } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import RegistrationForm from './components/RegistrationForm.jsx';

function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy"><span className="eyebrow">A PLACE TO GROW</span><h1>Your next chapter<br /><span>starts here.</span></h1><p>Join a welcoming learning community built for curious minds, ambitious goals, and meaningful connections.</p><div className="hero-actions"><Link className="button button-primary" to="/register">Create your account <span>→</span></Link><Link className="text-link" to="/about">Discover Northstar</Link></div><div className="hero-proof"><div className="avatar-stack"><i>AS</i><i>MK</i><i>JR</i></div><span><strong>12,000+</strong> students learning together</span></div></div>
        <div className="hero-art" aria-label="Illustration of a student learning"><div className="art-sun"/><div className="art-card"><span className="art-chip">YOUR FUTURE</span><div className="art-lines"><i/><i/><i/></div><div className="art-book">✦</div></div><div className="art-note note-one">✦ &nbsp; Learn something new</div><div className="art-note note-two">↗ &nbsp; Keep moving forward</div><div className="art-orbit"/></div>
      </section>
      <section className="home-feature-row"><article><span className="feature-icon">01</span><div><h3>Learn at your pace</h3><p>Build skills with flexible paths that fit your goals.</p></div></article><article><span className="feature-icon">02</span><div><h3>Find your community</h3><p>Meet people who make every new idea better.</p></div></article><article><span className="feature-icon">03</span><div><h3>Make progress visible</h3><p>Celebrate each milestone on the way forward.</p></div></article></section>
    </>
  );
}

function PageIntro({ eyebrow, title, copy }) {
  return <div className="page-intro"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{copy}</p></div>;
}
function RegistrationPage() {
  return <div className="page-shell"><PageIntro eyebrow="JOIN NORTHSTAR" title="Create your account" copy="Set up your student profile to get started. Complete every field to enable submission."/><section className="content-card"><div className="card-topline"><div><span className="eyebrow">STUDENT REGISTRATION</span><h2>Your details</h2></div><span className="step-indicator">STEP 1 OF 1</span></div><RegistrationForm /></section></div>;
}
function About() {
  return <div className="page-shell"><PageIntro eyebrow="ABOUT NORTHSTAR" title="Learning moves us forward." copy="Northstar is a student-centered learning community focused on curiosity, creativity, and practical growth."/><section className="content-card prose-card"><span className="eyebrow">OUR APPROACH</span><h2>Make room for what’s next.</h2><p>We bring thoughtful teaching, flexible learning, and a supportive community together. Students can explore new subjects, build confidence, and take the next step at their own pace.</p><Link className="button button-primary" to="/register">Join the community →</Link></section></div>;
}
function Contact() {
  return <div className="page-shell"><PageIntro eyebrow="CONTACT" title="We’re here to help." copy="Reach out to our student support team for help with registration, courses, or your account."/><section className="content-card contact-grid"><div><span className="eyebrow">STUDENT SUPPORT</span><h2>Talk to a person.</h2><p>Our team can help you choose a learning path and get comfortable with your new account.</p></div><div className="contact-detail"><span>Email</span><strong>hello@northstar.edu</strong><span>Office hours</span><strong>Monday–Friday · 9:00–17:00</strong></div></section></div>;
}
function ComponentsPage() {
  return <div className="page-shell"><PageIntro eyebrow="REUSABLE COMPONENTS" title="One system, many screens." copy="The same navigation, registration form, and footer components keep the interface consistent across routes."/><div className="component-grid"><article className="content-card component-card"><span className="component-number">01</span><h2>Navbar</h2><p>Shared across every route and highlights the current page.</p></article><article className="content-card component-card"><span className="component-number">02</span><h2>RegistrationForm</h2><p>Reusable controlled inputs with shared validation and success state.</p></article><article className="content-card component-card"><span className="component-number">03</span><h2>Footer</h2><p>Shared site information at the bottom of each page.</p></article></div></div>;
}
function LoginPage() {
  const demo = new URLSearchParams(window.location.search).get('demo') === '1';
  const [email, setEmail] = useState(demo ? 'ananya.sharma@example.com' : '');
  const [password, setPassword] = useState(demo ? 'Northstar8' : '');
  const [message, setMessage] = useState(demo ? 'You’re signed in. Welcome back!' : '');
  function login(event) { event.preventDefault(); setMessage(email && password ? 'You’re signed in. Welcome back!' : 'Enter your email and password to continue.'); }
  return <div className="login-layout"><div className="login-aside"><span className="eyebrow">WELCOME BACK</span><h1>Good to see<br />you again.</h1><p>Sign in to pick up where you left off and keep moving toward your goals.</p><div className="aside-mark">N.</div></div><section className="content-card login-card"><span className="eyebrow">STUDENT PORTAL</span><h2>Sign in</h2><p className="muted">Use your Northstar account details.</p><form onSubmit={login}><div className="field"><label htmlFor="loginEmail">Email address</label><input id="loginEmail" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required /></div><div className="field"><label htmlFor="loginPassword">Password</label><input id="loginPassword" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required /></div><button className="button button-primary submit-button">Sign in <span>→</span></button>{message && <div className="success-banner" role="status"><span>✓</span><strong>{message}</strong></div>}</form><p className="login-footnote">New to Northstar? <Link to="/register">Create an account</Link></p></section></div>;
}
function StudentPage() {
  const demo = new URLSearchParams(window.location.search).get('demo') === '1';
  const [student, setStudent] = useState({ name: demo ? 'Ananya Sharma' : 'Your Name', register: demo ? 'URK24CS1261' : 'Your Register No.', course: demo ? 'Computer Science' : 'Your Course', year: demo ? 'II Year' : 'Year' });
  const [draft, setDraft] = useState(student);
  const fields = useMemo(() => [['name','Student name'],['register','Register number'],['course','Course'],['year','Year']], []);
  function update(event) { setDraft((current) => ({ ...current, [event.target.name]: event.target.value })); setStudent((current) => ({ ...current, [event.target.name]: event.target.value })); }
  return <div className="page-shell"><PageIntro eyebrow="STUDENT PROFILE" title="Your details, live." copy="Edit a field and watch your student card update immediately using React state."/><div className="student-layout"><section className="content-card student-editor"><span className="eyebrow">EDIT DETAILS</span><h2>Student information</h2>{fields.map(([name,label]) => <div className="field" key={name}><label htmlFor={`student-${name}`}>{label}</label><input id={`student-${name}`} name={name} value={draft[name]} onChange={update} /></div>)}</section><section className="student-preview"><div className="preview-label"><span>LIVE PREVIEW</span><span className="status-dot">● &nbsp; ACTIVE</span></div><article className="student-card"><div className="student-card-top"><span className="brand-mark">N</span><span>NORTHSTAR<br/>STUDENT ID</span></div><div className="student-monogram">{student.name.split(' ').map((part) => part[0]).join('').slice(0,2).toUpperCase()}</div><h2>{student.name || 'Your Name'}</h2><p>{student.course || 'Your Course'}</p><div className="student-card-bottom"><span>{student.register || 'Register No.'}</span><strong>{student.year || 'Year'}</strong></div></article><p className="preview-note">Changes appear as you type.</p></section></div></div>;
}
function App() {
  return <div className="app-frame"><Navbar /><main><Routes><Route path="/" element={<Home />} /><Route path="/register" element={<RegistrationPage />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="/components" element={<ComponentsPage />} /><Route path="/login" element={<LoginPage />} /><Route path="/student" element={<StudentPage />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></main><Footer /></div>;
}
export default App;
