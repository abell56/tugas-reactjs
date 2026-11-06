import { useState, useRef } from 'react'
import { Link } from 'react-router'
import FormInput from '../components/FormInput'
import PasswordStrengthBar from '../components/PasswordStrengthBar'
import { validateField, validateRegistrationForm } from '../Utils/authValidation'

/**
 * Nilai default formulir registrasi
 */
const INITIAL_FORM_STATE = {
  fullName: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false,
}

/**
 * Halaman Registrasi Pengguna (Register)
 * Mengimplementasikan form registrasi responsif dengan validasi real-time,
 * visual feedback, penanganan state komprehensif, dan persistensi data ke localStorage.
 */
function Register() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [registeredUser, setRegisteredUser] = useState(null)

  // Referensi untuk auto-focus field pertama yang error saat submit gagal
  const formRef = useRef(null)

  /**
   * Menangani perubahan nilai input
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const fieldValue = type === 'checkbox' ? checked : value

    const updatedFormData = {
      ...formData,
      [name]: fieldValue,
    }
    setFormData(updatedFormData)

    // Jika field sudah pernah disentuh, lakukan validasi langsung saat mengetik
    if (touched[name]) {
      const errorMsg = validateField(name, fieldValue, updatedFormData)
      setErrors((prev) => ({
        ...prev,
        [name]: errorMsg,
      }))
    }

    // Jika password diubah dan konfirmasi sudah pernah disentuh, validasi ulang konfirmasi password
    if (name === 'password' && touched.confirmPassword) {
      const confirmError = validateField('confirmPassword', updatedFormData.confirmPassword, updatedFormData)
      setErrors((prev) => ({
        ...prev,
        confirmPassword: confirmError,
      }))
    }
  }

  /**
   * Menangani event onBlur untuk validasi real-time saat pengguna berpindah input
   */
  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target
    const fieldValue = type === 'checkbox' ? checked : value

    setTouched((prev) => ({ ...prev, [name]: true }))

    const errorMsg = validateField(name, fieldValue, formData)
    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }))
  }

  /**
   * Menangani pengiriman formulir (Submit)
   */
  const handleSubmit = (e) => {
    e.preventDefault()

    // Tandai semua field sebagai touched agar seluruh error muncul
    const allTouched = {
      fullName: true,
      email: true,
      username: true,
      password: true,
      confirmPassword: true,
      agreeTerms: true,
    }
    setTouched(allTouched)

    // Validasi seluruh data form
    const { isValid, errors: validationErrors } = validateRegistrationForm(formData)
    setErrors(validationErrors)

    if (!isValid) {
      // Cari field pertama yang bermasalah dan fokuskan ke sana
      const firstErrorField = Object.keys(validationErrors)[0]
      const element = document.getElementById(firstErrorField)
      if (element) {
        element.focus()
      }
      return
    }

    // Simulasi pengiriman request pendaftaran ke backend / simpan ke localStorage
    setIsSubmitting(true)

    setTimeout(() => {
      try {
        const newUser = {
          id: 'USR-' + Date.now(),
          fullName: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          username: formData.username.trim(),
          registeredAt: new Date().toLocaleString('id-ID', {
            dateStyle: 'full',
            timeStyle: 'short',
          }),
        }

        // Ambil data user yang ada di localStorage
        const existingUsers = JSON.parse(localStorage.getItem('bookstore_users') || '[]')
        
        // Cek duplikasi email atau username
        const duplicateEmail = existingUsers.some((u) => u.email === newUser.email)
        const duplicateUsername = existingUsers.some((u) => u.username.toLowerCase() === newUser.username.toLowerCase())

        if (duplicateEmail) {
          setErrors((prev) => ({ ...prev, email: 'Email ini sudah terdaftar di sistem kami.' }))
          setIsSubmitting(false)
          return
        }

        if (duplicateUsername) {
          setErrors((prev) => ({ ...prev, username: 'Username ini sudah digunakan oleh pengguna lain.' }))
          setIsSubmitting(false)
          return
        }

        // Simpan user baru ke database lokal
        existingUsers.push(newUser)
        localStorage.setItem('bookstore_users', JSON.stringify(existingUsers))
        localStorage.setItem('bookstore_current_user', JSON.stringify(newUser))

        setRegisteredUser(newUser)
        setRegistrationSuccess(true)
        setFormData(INITIAL_FORM_STATE)
        setTouched({})
        setErrors({})
      } catch (err) {
        console.error('Pendaftaran gagal disimpan:', err)
      } finally {
        setIsSubmitting(false)
      }
    }, 750)
  }

  /**
   * Mengatur ulang formulir ke kondisi semula
   */
  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE)
    setErrors({})
    setTouched({})
  }

  return (
    <div className="register-page-wrapper py-5 bg-body-tertiary">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none">
                <i className="fa-solid fa-house me-1"></i>Home
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Registrasi Pengguna
            </li>
          </ol>
        </nav>

        {/* Kondisi Jika Registrasi Berhasil */}
        {registrationSuccess && registeredUser ? (
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-9">
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden text-center p-4 p-md-5 bg-white">
                <div className="mb-4">
                  <div
                    className="mx-auto rounded-circle d-flex align-items-center justify-content-center bg-success-subtle text-success shadow-sm"
                    style={{ width: '88px', height: '88px', fontSize: '2.5rem' }}
                  >
                    <i className="fa-solid fa-circle-check"></i>
                  </div>
                </div>

                <span className="badge bg-success-subtle text-success px-3 py-1 rounded-pill mb-2 mx-auto fw-semibold">
                  Akun Berhasil Dibuat!
                </span>
                <h2 className="fw-bold text-dark mb-2">Selamat Datang di Bookstore!</h2>
                <p className="text-secondary mb-4">
                  Hai <strong className="text-dark">{registeredUser.fullName}</strong>, akun Anda telah berhasil terdaftar dan aktif. Nikmati kemudahan memesan dan membaca buku favorit Anda.
                </p>

                {/* Ringkasan Data Akun */}
                <div className="card bg-light border-0 rounded-3 p-3 text-start mb-4">
                  <h6 className="fw-bold text-primary mb-3">
                    <i className="fa-solid fa-id-card me-2"></i>Rincian Akun Terdaftar
                  </h6>
                  <div className="row g-2 small">
                    <div className="col-sm-6">
                      <span className="text-muted d-block">Nama Lengkap:</span>
                      <strong className="text-dark">{registeredUser.fullName}</strong>
                    </div>
                    <div className="col-sm-6">
                      <span className="text-muted d-block">Username:</span>
                      <strong className="text-dark">@{registeredUser.username}</strong>
                    </div>
                    <div className="col-sm-6">
                      <span className="text-muted d-block">Alamat Email:</span>
                      <strong className="text-dark">{registeredUser.email}</strong>
                    </div>
                    <div className="col-sm-6">
                      <span className="text-muted d-block">Waktu Pendaftaran:</span>
                      <span className="text-secondary">{registeredUser.registeredAt}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                  <Link to="/book" className="btn btn-primary px-4 py-2 rounded-pill fw-semibold shadow-sm">
                    <i className="fa-solid fa-book-open me-2"></i>Jelajahi Katalog Buku
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setRegistrationSuccess(false)
                      setRegisteredUser(null)
                    }}
                    className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-semibold"
                  >
                    <i className="fa-solid fa-user-plus me-2"></i>Daftar Akun Lain
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Formulir Registrasi */
          <div className="row g-4 align-items-stretch">
            {/* Kolom Kiri: Ilustrasi & Keuntungan Bergabung */}
            <div className="col-lg-5 d-none d-lg-flex flex-column justify-content-between">
              <div className="card border-0 rounded-4 shadow-sm p-4 p-xl-5 text-white bg-primary bg-gradient h-100 position-relative overflow-hidden">
                <div className="position-relative" style={{ zIndex: 2 }}>
                  <div className="d-inline-flex align-items-center gap-2 bg-white bg-opacity-25 px-3 py-1 rounded-pill small mb-4">
                    <i className="fa-solid fa-sparkles text-warning"></i>
                    <span>Komunitas Pembaca Nomor 1</span>
                  </div>

                  <h1 className="fw-bold mb-3 display-6">
                    Mulai Petualangan Membaca Bersama Kami.
                  </h1>
                  <p className="lead opacity-75 fs-6 mb-4">
                    Buat akun sekarang untuk mendapatkan rekomendasi buku terbaik, akses wishlist pribadi, dan penawaran diskon eksklusif setiap minggu.
                  </p>

                  <div className="d-flex flex-column gap-3 my-4">
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-circle bg-white text-primary p-2 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '40px', height: '40px' }}>
                        <i className="fa-solid fa-book"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0">10.000+ Judul Buku</h6>
                        <small className="opacity-75">Koleksi genre lengkap & best seller dunia</small>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-circle bg-white text-primary p-2 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '40px', height: '40px' }}>
                        <i className="fa-solid fa-tag"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0">Voucher Diskon Member</h6>
                        <small className="opacity-75">Potongan spesial langsung untuk pembaca baru</small>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-circle bg-white text-primary p-2 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '40px', height: '40px' }}>
                        <i className="fa-solid fa-shield-check"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0">Keamanan Terjamin</h6>
                        <small className="opacity-75">Data pribadi Anda terlindungi dengan enkripsi</small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial / Social Proof Footer */}
                <div className="mt-4 pt-3 border-top border-white border-opacity-25 position-relative" style={{ zIndex: 2 }}>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <div className="text-warning">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </div>
                    <span className="fw-bold small">4.9 / 5.0</span>
                  </div>
                  <small className="opacity-75 d-block">
                    Dipercaya lebih dari 25.000 pembaca aktif di seluruh Indonesia.
                  </small>
                </div>

                {/* Decorative Background Circles */}
                <div
                  className="position-absolute bg-white opacity-10 rounded-circle"
                  style={{ width: '320px', height: '320px', bottom: '-100px', right: '-100px', pointerEvents: 'none' }}
                ></div>
              </div>
            </div>

            {/* Kolom Kanan: Card Formulir Registrasi */}
            <div className="col-lg-7">
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
                <div className="mb-4">
                  <span className="badge bg-primary-subtle text-primary px-3 py-1 rounded-pill mb-2 fw-semibold">
                    Registrasi Pengguna
                  </span>
                  <h2 className="fw-bold text-dark mb-1">Buat Akun Baru</h2>
                  <p className="text-secondary small mb-0">
                    Lengkapi informasi formulir di bawah ini dengan data yang valid.
                  </p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} noValidate>
                  {/* Field 1: Nama Lengkap */}
                  <FormInput
                    id="fullName"
                    name="fullName"
                    label="Nama Lengkap"
                    placeholder="Masukkan nama lengkap Anda"
                    icon="fa-user"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.fullName}
                    touched={touched.fullName}
                    required
                    autoComplete="name"
                    helpText="Gunakan nama asli untuk mempermudah verifikasi dan pengiriman buku."
                  />

                  {/* Baris Dua Kolom: Email & Username */}
                  <div className="row g-2 g-md-3">
                    <div className="col-md-6">
                      <FormInput
                        id="email"
                        name="email"
                        type="email"
                        label="Alamat Email"
                        placeholder="contoh: nama@email.com"
                        icon="fa-envelope"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.email}
                        touched={touched.email}
                        required
                        autoComplete="email"
                      />
                    </div>
                    <div className="col-md-6">
                      <FormInput
                        id="username"
                        name="username"
                        label="Username"
                        placeholder="contoh: budi_21"
                        icon="fa-at"
                        value={formData.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.username}
                        touched={touched.username}
                        required
                        autoComplete="username"
                        helpText="4-20 karakter alfanumerik & underscore"
                      />
                    </div>
                  </div>

                  {/* Field 4: Password */}
                  <FormInput
                    id="password"
                    name="password"
                    type="password"
                    label="Kata Sandi (Password)"
                    placeholder="Minimal 6 karakter"
                    icon="fa-lock"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password}
                    touched={touched.password}
                    required
                    autoComplete="new-password"
                  />

                  {/* Indikator Kekuatan Password */}
                  <PasswordStrengthBar password={formData.password} />

                  {/* Field 5: Konfirmasi Password */}
                  <FormInput
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Konfirmasi Kata Sandi"
                    placeholder="Masukkan ulang kata sandi Anda"
                    icon="fa-shield-halved"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.confirmPassword}
                    touched={touched.confirmPassword}
                    required
                    autoComplete="new-password"
                  />

                  {/* Field 6: Checkbox Persetujuan Syarat & Ketentuan */}
                  <div className="mb-4">
                    <div className="form-check">
                      <input
                        id="agreeTerms"
                        name="agreeTerms"
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-check-input ${
                          touched.agreeTerms && errors.agreeTerms ? 'is-invalid' : ''
                        }`}
                      />
                      <label htmlFor="agreeTerms" className="form-check-label small text-secondary">
                        Saya menyetujui{' '}
                        <a
                          href="#terms"
                          onClick={(e) => {
                            e.preventDefault()
                            alert('Syarat & Ketentuan: Akun ini digunakan secara wajar untuk pembelian dan interaksi pada aplikasi bookstore.')
                          }}
                          className="text-primary text-decoration-none fw-semibold"
                        >
                          Syarat & Ketentuan
                        </a>{' '}
                        serta{' '}
                        <a
                          href="#privacy"
                          onClick={(e) => {
                            e.preventDefault()
                            alert('Kebijakan Privasi: Kami menjaga privasi data Anda dengan aman dan tidak pernah membagikannya ke pihak ketiga.')
                          }}
                          className="text-primary text-decoration-none fw-semibold"
                        >
                          Kebijakan Privasi
                        </a>
                        . <span className="text-danger">*</span>
                      </label>
                      {touched.agreeTerms && errors.agreeTerms && (
                        <div className="text-danger small mt-1 d-flex align-items-center gap-1">
                          <i className="fa-solid fa-circle-exclamation"></i>
                          <span>{errors.agreeTerms}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tombol Aksi: Submit & Reset */}
                  <div className="d-flex flex-column flex-sm-row gap-2 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary px-4 py-2 rounded-pill fw-semibold shadow-sm flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          <span>Memproses Pendaftaran...</span>
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-user-plus"></i>
                          <span>Daftar Sekarang</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      disabled={isSubmitting}
                      className="btn btn-outline-secondary px-3 py-2 rounded-pill fw-semibold"
                      title="Kosongkan semua isian form"
                    >
                      <i className="fa-solid fa-rotate-left me-1"></i>Reset
                    </button>
                  </div>
                </form>

                {/* Footer Card: Link ke Login */}
                <div className="mt-4 pt-3 border-top text-center text-secondary small">
                  Sudah memiliki akun bookstore?{' '}
                  <button
                    type="button"
                    onClick={() => alert('Fitur Login akan segera hadir! Gunakan akun terdaftar Anda untuk masuk.')}
                    className="btn btn-link text-primary p-0 text-decoration-none fw-bold align-baseline"
                  >
                    Masuk di sini
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Register
