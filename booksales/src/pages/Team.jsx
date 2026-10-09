import { teamMembers } from '../data/team'

function Team() {
  return (
    <div className="container my-5">
      {/* Header Team */}
      <div className="text-center mb-5">
        <span className="badge bg-primary-subtle text-primary px-3 py-1 rounded-pill mb-2">Tim Kami</span>
        <h1 className="fw-bold">Kenali Tim di Balik Bookstore</h1>
        <p className="lead text-secondary col-lg-7 mx-auto">
          Dedikasi kami adalah menghadirkan bacaan berkualitas, memperluas wawasan, dan mempermudah akses buku bermutu bagi seluruh masyarakat Indonesia.
        </p>
      </div>

      {/* Grid Anggota Tim */}
      <div className="row g-4 mb-5">
        {teamMembers.map((member) => (
          <div className="col-lg-3 col-md-6" key={member.id}>
            <div className="card h-100 border-0 shadow-sm text-center p-4 team-card">
              <img
                src={member.image}
                alt={member.name}
                className="team-avatar mb-3"
              />
              <h5 className="fw-bold text-dark mb-1">{member.name}</h5>
              <p className="text-primary small fw-semibold mb-3">{member.role}</p>
              <p className="text-secondary small mb-4">{member.bio}</p>
              <div className="d-flex justify-content-center gap-2 mt-auto">
                <a href="#" className="social-icon-btn" title="LinkedIn">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="#" className="social-icon-btn" title="Twitter / X">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a href="#" className="social-icon-btn" title="Instagram">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="#" className="social-icon-btn" title="GitHub">
                  <i className="fa-brands fa-github"></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nilai / Values Section (Template Bootstrap Features) */}
      <div className="row g-4 py-5 row-cols-1 row-cols-lg-3 border-top mt-4">
        <div className="feature col text-center p-3">
          <div
            className="d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded-circle"
            style={{ width: '64px', height: '64px' }}
          >
            <i className="fa-solid fa-book-open-reader"></i>
          </div>
          <h3 className="fs-4 fw-bold text-body-emphasis">Kurasi Pilihan</h3>
          <p className="text-secondary">
            Setiap judul buku yang hadir di katalog kami telah melewati kurasi ketat agar memberikan wawasan berbobot dan menginspirasi hidup Anda.
          </p>
        </div>
        <div className="feature col text-center p-3">
          <div
            className="d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded-circle"
            style={{ width: '64px', height: '64px' }}
          >
            <i className="fa-solid fa-certificate"></i>
          </div>
          <h3 className="fs-4 fw-bold text-body-emphasis">100% Asli & Bergaransi</h3>
          <p className="text-secondary">
            Kami bekerjasama langsung dengan para penerbit terkemuka untuk memastikan setiap eksemplar buku asli, bebas bajakan, dan berkualitas tinggi.
          </p>
        </div>
        <div className="feature col text-center p-3">
          <div
            className="d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded-circle"
            style={{ width: '64px', height: '64px' }}
          >
            <i className="fa-solid fa-headset"></i>
          </div>
          <h3 className="fs-4 fw-bold text-body-emphasis">Layanan Ramah</h3>
          <p className="text-secondary">
            Tim dukungan pelanggan kami selalu siap mendengarkan kebutuhan, memberikan rekomendasi buku, dan membantu proses pemesanan Anda.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Team
