import { NavLink } from 'react-router-dom';

const links = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
  ['/register', 'Registration'],
  ['/login', 'Login'],
  ['/student', 'Student Details'],
  ['/components', 'Components']
];

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink className="brand" to="/" aria-label="Northstar home">
          <span className="brand-mark">N</span>
          <span>Northstar<span className="brand-light">.edu</span></span>
        </NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
