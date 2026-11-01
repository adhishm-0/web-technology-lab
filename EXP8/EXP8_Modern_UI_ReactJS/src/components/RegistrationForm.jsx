import { useMemo, useState } from 'react';

const blankForm = { name: '', email: '', password: '', age: '', mobile: '', gender: '', state: '' };
const demoForm = { name: 'Ananya Sharma', email: 'ananya.sharma@example.com', password: 'Northstar8', age: '21', mobile: '9876543210', gender: 'Female', state: 'Tamil Nadu' };

function getErrors(form) {
  return {
    name: !form.name.trim() ? 'Full name is required.' : !/^[A-Za-z ]+$/.test(form.name.trim()) ? 'Use alphabetic characters and spaces only.' : '',
    email: !form.email.trim() ? 'Email address is required.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? 'Enter a valid email address.' : '',
    password: !form.password ? 'Password is required.' : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password) ? 'Use uppercase, lowercase, a number and at least 8 characters.' : '',
    age: !form.age ? 'Age is required.' : Number(form.age) < 18 || Number(form.age) > 30 ? 'Age must be between 18 and 30.' : '',
    mobile: !form.mobile ? 'Mobile number is required.' : !/^\d{10}$/.test(form.mobile) ? 'Enter exactly 10 digits.' : '',
    gender: !form.gender ? 'Choose a gender.' : '',
    state: !form.state ? 'Choose a state.' : ''
  };
}

function Field({ label, name, value, onChange, onBlur, error, type = 'text', placeholder, demo = false }) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}<span className="required-mark">*</span></label>
      <input id={name} name={name} type={type} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} autoComplete={demo ? 'off' : undefined} />
      {error && <small id={`${name}-error`} className="field-error">{error}</small>}
    </div>
  );
}

export default function RegistrationForm() {
  const demo = new URLSearchParams(window.location.search).get('demo') === '1';
  const [form, setForm] = useState(demo ? demoForm : blankForm);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(demo);
  const errors = useMemo(() => getErrors(form), [form]);
  const isValid = Object.values(errors).every((error) => !error);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setSubmitted(false);
  }
  function markTouched(event) {
    setTouched((current) => ({ ...current, [event.target.name]: true }));
  }
  function submitForm(event) {
    event.preventDefault();
    setTouched(Object.fromEntries(Object.keys(form).map((key) => [key, true])));
    if (isValid) setSubmitted(true);
  }
  function showError(name) {
    return (touched[name] || submitted) ? errors[name] : '';
  }

  return (
    <form className="registration-form" onSubmit={submitForm} noValidate>
      <div className="form-grid">
        <Field label="Full name" name="name" value={form.name} onChange={updateField} onBlur={markTouched} error={showError('name')} placeholder="Enter your name" demo={demo} />
        <Field label="Email address" name="email" value={form.email} onChange={updateField} onBlur={markTouched} error={showError('email')} type="email" placeholder="you@example.com" demo={demo} />
        <Field label="Password" name="password" value={form.password} onChange={updateField} onBlur={markTouched} error={showError('password')} type="password" placeholder="At least 8 characters" demo={demo} />
        <Field label="Age" name="age" value={form.age} onChange={updateField} onBlur={markTouched} error={showError('age')} type="number" placeholder="18–30" demo={demo} />
        <Field label="Mobile number" name="mobile" value={form.mobile} onChange={updateField} onBlur={markTouched} error={showError('mobile')} type="tel" placeholder="10-digit number" demo={demo} />
        <div className="field">
          <label htmlFor="gender">Gender<span className="required-mark">*</span></label>
          <select id="gender" name="gender" value={form.gender} onChange={updateField} onBlur={markTouched} aria-invalid={Boolean(showError('gender'))}>
            <option value="">Select gender</option><option>Female</option><option>Male</option><option>Other</option>
          </select>
          {showError('gender') && <small className="field-error">{showError('gender')}</small>}
        </div>
        <div className="field">
          <label htmlFor="state">State<span className="required-mark">*</span></label>
          <select id="state" name="state" value={form.state} onChange={updateField} onBlur={markTouched} aria-invalid={Boolean(showError('state'))}>
            <option value="">Select state</option><option>Tamil Nadu</option><option>Kerala</option><option>Karnataka</option><option>Andhra Pradesh</option>
          </select>
          {showError('state') && <small className="field-error">{showError('state')}</small>}
        </div>
      </div>
      <p className="form-hint">All fields are required. Passwords need uppercase and lowercase letters, a number, and 8+ characters.</p>
      <button className="button button-primary submit-button" type="submit" disabled={!isValid}>Submit registration <span aria-hidden="true">→</span></button>
      {submitted && <div className="success-banner" role="status"><span>✓</span><div><strong>Registration completed successfully!</strong><small>Welcome to Northstar Student Hub.</small></div></div>}
    </form>
  );
}
