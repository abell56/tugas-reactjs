import { Link } from 'react-router'

function Footer() {
  return (
    <div className="container">
      <footer className="py-4 my-4 border-top">
        <div className="d-flex flex-wrap justify-content-between align-items-center pb-3 mb-3 border-bottom">
          <div className="d-flex align-items-center gap-2 mb-3 mb-md-0">
            <i
              className="fa-solid fa-book-open fa-xl text-primary"
            ></i>
            <span className="fw-bold fs-5 text-dark">
              book<span className="text-primary">store</span>
            </span>
            <span className="text-muted ms-2 small d-none d-md-inline">| Rumah Buku & Inspirasi Terpercaya</span>
          </div>

          <ul className="nav justify-content-center">
            <li className="nav-item">
              <Link to="/" className="nav-link px-2 text-body-secondary footer-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/book" className="nav-link px-2 text-body-secondary footer-link">
                Book
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/team" className="nav-link px-2 text-body-secondary footer-link">
                Team
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link px-2 text-body-secondary footer-link">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="d-flex flex-wrap justify-content-between align-items-center text-body-secondary small">
          <p className="mb-0">&copy; 2026 bookstore - NF Academy. All rights reserved.</p>
          <div className="d-flex gap-3">
            <a href="#" className="text-decoration-none text-muted">Syarat & Ketentuan</a>
            <span>•</span>
            <a href="#" className="text-decoration-none text-muted">Kebijakan Privasi</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
