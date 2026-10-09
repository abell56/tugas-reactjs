import { useState } from 'react'
import { NavLink, Link } from 'react-router'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }

  const closeNavbar = () => {
    setIsOpen(false)
  }

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white sticky-top shadow-sm custom-navbar py-2 py-md-3">
      <div className="container">
        {/* Brand Logo */}
        <Link
          to="/"
          className="navbar-brand d-inline-flex align-items-center gap-2 brand-logo"
          onClick={closeNavbar}
        >
          <div className="brand-icon-wrapper">
            <i className="fa-solid fa-book-open text-primary fs-3"></i>
          </div>
          <span className="fs-4 fw-bold brand-text">
            book<span className="text-primary">store</span>
          </span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className={`navbar-toggler border-0 shadow-none ${isOpen ? '' : 'collapsed'}`}
          type="button"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links & Action Buttons */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarMain">
          <ul className="navbar-nav mx-auto mb-2 mb-md-0 gap-1 gap-lg-2">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                onClick={closeNavbar}
                className={({ isActive }) =>
                  `nav-link custom-nav-link ${isActive ? 'active' : ''}`
                }
              >
                <i className="fa-solid fa-house me-1"></i>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/book"
                onClick={closeNavbar}
                className={({ isActive }) =>
                  `nav-link custom-nav-link ${isActive ? 'active' : ''}`
                }
              >
                <i className="fa-solid fa-book me-1"></i>
                Book
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/team"
                onClick={closeNavbar}
                className={({ isActive }) =>
                  `nav-link custom-nav-link ${isActive ? 'active' : ''}`
                }
              >
                <i className="fa-solid fa-users me-1"></i>
                Team
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                onClick={closeNavbar}
                className={({ isActive }) =>
                  `nav-link custom-nav-link ${isActive ? 'active' : ''}`
                }
              >
                <i className="fa-solid fa-envelope me-1"></i>
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm px-3 rounded-pill fw-semibold auth-btn"
              onClick={() => alert('Fitur Login akan segera hadir!')}
            >
              <i className="fa-solid fa-right-to-bracket me-1"></i>
              Login
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm px-3 rounded-pill fw-semibold auth-btn shadow-sm"
              onClick={() => alert('Fitur Register akan segera hadir!')}
            >
              <i className="fa-solid fa-user-plus me-1"></i>
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
