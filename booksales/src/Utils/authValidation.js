/**
 * authValidation.js
 * Utilitas validasi formulir autentikasi dan registrasi pengguna
 */

// Regex pola email standar RFC 5322 sederhana
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// Regex username: hanya huruf, angka, dan underscore, panjang 4-20 karakter
export const USERNAME_REGEX = /^[a-zA-Z0-9_]{4,20}$/

/**
 * Menghitung kekuatan kata sandi
 * @param {string} password 
 * @returns {{ score: number, label: string, color: string, feedback: string }}
 */
export function evaluatePasswordStrength(password) {
  if (!password) {
    return { score: 0, label: '', color: 'secondary', feedback: '' }
  }

  let score = 0
  if (password.length >= 6) score += 1
  if (password.length >= 8) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1

  if (score <= 2) {
    return { score: 1, label: 'Lemah', color: 'danger', feedback: 'Gunakan minimal 8 karakter dengan campuran huruf & angka' }
  }
  if (score <= 4) {
    return { score: 2, label: 'Sedang', color: 'warning', feedback: 'Tambahkan simbol atau huruf kapital agar lebih kuat' }
  }
  return { score: 3, label: 'Kuat', color: 'success', feedback: 'Kata sandi sangat aman!' }
}

/**
 * Validasi per-field secara individu (cocok untuk validasi real-time saat onBlur / onChange)
 * @param {string} fieldName 
 * @param {any} value 
 * @param {object} allValues 
 * @returns {string} pesan kesalahan (kosong jika valid)
 */
export function validateField(fieldName, value, allValues = {}) {
  const trimmed = typeof value === 'string' ? value.trim() : value

  switch (fieldName) {
    case 'fullName':
      if (!trimmed) {
        return 'Nama lengkap wajib diisi.'
      }
      if (trimmed.length < 3) {
        return 'Nama lengkap minimal 3 karakter.'
      }
      if (!/^[a-zA-Z\s'.]+$/.test(trimmed)) {
        return 'Nama lengkap hanya boleh memuat huruf dan spasi.'
      }
      return ''

    case 'email':
      if (!trimmed) {
        return 'Alamat email wajib diisi.'
      }
      if (!EMAIL_REGEX.test(trimmed)) {
        return 'Format email tidak valid (contoh: user@domain.com).'
      }
      return ''

    case 'username':
      if (!trimmed) {
        return 'Username wajib diisi.'
      }
      if (trimmed.length < 4) {
        return 'Username minimal 4 karakter.'
      }
      if (trimmed.length > 20) {
        return 'Username maksimal 20 karakter.'
      }
      if (/\s/.test(trimmed)) {
        return 'Username tidak boleh mengandung spasi.'
      }
      if (!USERNAME_REGEX.test(trimmed)) {
        return 'Username hanya boleh huruf, angka, dan underscore (_).'
      }
      return ''

    case 'password':
      if (!value) {
        return 'Kata sandi wajib diisi.'
      }
      if (value.length < 6) {
        return 'Kata sandi minimal 6 karakter.'
      }
      return ''

    case 'confirmPassword':
      if (!value) {
        return 'Konfirmasi kata sandi wajib diisi.'
      }
      if (value !== allValues.password) {
        return 'Konfirmasi kata sandi tidak cocok dengan kata sandi.'
      }
      return ''

    case 'agreeTerms':
      if (!value) {
        return 'Anda harus menyetujui syarat & ketentuan layanan.'
      }
      return ''

    default:
      return ''
  }
}

/**
 * Validasi seluruh data form pendaftaran
 * @param {object} formData 
 * @returns {{ isValid: boolean, errors: object }}
 */
export function validateRegistrationForm(formData) {
  const errors = {}

  const fields = ['fullName', 'email', 'username', 'password', 'confirmPassword', 'agreeTerms']
  fields.forEach((field) => {
    const errorMsg = validateField(field, formData[field], formData)
    if (errorMsg) {
      errors[field] = errorMsg
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
