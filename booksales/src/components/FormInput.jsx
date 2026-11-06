import { useState } from 'react'

/**
 * FormInput - Komponen Reusable Input Formulir dengan Ikon, Validasi, dan Toggle Password
 *
 * @param {object} props
 * @param {string} props.id - ID unik elemen input
 * @param {string} props.name - Nama field formulir
 * @param {string} props.label - Label yang ditampilkan di atas input
 * @param {string} [props.type='text'] - Tipe input (text, email, password, etc.)
 * @param {string} props.value - Nilai state input
 * @param {function} props.onChange - Handler perubahan nilai
 * @param {function} [props.onBlur] - Handler saat input kehilangan fokus
 * @param {string} [props.placeholder] - Teks placeholder
 * @param {string} [props.icon] - Kelas icon FontAwesome (contoh: 'fa-envelope')
 * @param {string} [props.error] - Pesan kesalahan jika input tidak valid
 * @param {boolean} [props.touched] - Menandakan apakah input telah disentuh pengguna
 * @param {boolean} [props.required=true] - Menandakan apakah field ini wajib diisi
 * @param {string} [props.helpText] - Petunjuk opsional di bawah input
 * @param {boolean} [props.disabled=false] - Status disabled input
 * @param {string} [props.autoComplete] - Nilai atribut autocomplete
 */
function FormInput({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  icon,
  error,
  touched,
  required = true,
  helpText,
  disabled = false,
  autoComplete,
}) {
  const [showPassword, setShowPassword] = useState(false)
  const isPasswordField = type === 'password'
  const computedType = isPasswordField && showPassword ? 'text' : type

  // Status visual feedback
  const hasError = Boolean(touched && error)
  const isSuccess = Boolean(touched && !error && value && value.toString().trim().length > 0)

  return (
    <div className="mb-3">
      {/* Label dengan tanda bintang wajib */}
      {label && (
        <label htmlFor={id} className="form-label fw-semibold text-secondary small mb-1 d-flex justify-content-between align-items-center">
          <span>
            {label} {required && <span className="text-danger">*</span>}
          </span>
          {isSuccess && (
            <span className="badge bg-success-subtle text-success small py-0 px-2 rounded-pill fw-normal">
              <i className="fa-solid fa-check me-1"></i>Sesuai
            </span>
          )}
        </label>
      )}

      {/* Input Group dengan Icon Prefix dan Password Toggle */}
      <div className="input-group custom-input-group">
        {icon && (
          <span
            className={`input-group-text bg-light border-end-0 ${
              hasError ? 'border-danger text-danger' : isSuccess ? 'border-success text-success' : 'text-muted'
            }`}
          >
            <i className={`fa-solid ${icon}`}></i>
          </span>
        )}

        <input
          id={id}
          name={name}
          type={computedType}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : helpText ? `${id}-help` : undefined}
          className={`form-control ${icon ? 'border-start-0' : ''} ${
            isPasswordField ? 'border-end-0' : ''
          } ${hasError ? 'is-invalid border-danger' : isSuccess ? 'is-valid border-success' : ''}`}
        />

        {/* Toggle tombol Lihat/Sembunyikan Kata Sandi */}
        {isPasswordField && (
          <button
            type="button"
            className={`btn btn-light border border-start-0 ${
              hasError ? 'border-danger text-danger' : isSuccess ? 'border-success' : 'text-muted'
            }`}
            onClick={() => setShowPassword((prev) => !prev)}
            title={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
            aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
            tabIndex={-1}
          >
            <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        )}
      </div>

      {/* Feedback Pesan Error */}
      {hasError && (
        <div id={`${id}-error`} className="text-danger small mt-1 d-flex align-items-center gap-1 animate-fadeIn">
          <i className="fa-solid fa-circle-exclamation"></i>
          <span>{error}</span>
        </div>
      )}

      {/* Teks Bantuan / Hint opsional */}
      {!hasError && helpText && (
        <div id={`${id}-help`} className="form-text text-muted small mt-1">
          {helpText}
        </div>
      )}
    </div>
  )
}

export default FormInput
