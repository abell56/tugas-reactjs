import { evaluatePasswordStrength } from '../Utils/authValidation'

/**
 * PasswordStrengthBar - Komponen Visual Indikator Kekuatan Kata Sandi
 *
 * @param {object} props
 * @param {string} props.password - Nilai password saat ini
 */
function PasswordStrengthBar({ password }) {
  if (!password) return null

  const { score, label, color, feedback } = evaluatePasswordStrength(password)
  const percentage = (score / 3) * 100

  return (
    <div className="mb-3 px-1">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <span className="small text-secondary" style={{ fontSize: '0.8rem' }}>
          Kekuatan Kata Sandi:
        </span>
        <span className={`badge bg-${color}-subtle text-${color} fw-bold`} style={{ fontSize: '0.75rem' }}>
          {label}
        </span>
      </div>

      {/* Progress Bar Segmented */}
      <div className="progress" style={{ height: '6px', borderRadius: '4px', backgroundColor: '#e2e8f0' }}>
        <div
          className={`progress-bar bg-${color}`}
          role="progressbar"
          style={{
            width: `${percentage}%`,
            transition: 'width 0.3s ease, background-color 0.3s ease',
          }}
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>

      {feedback && (
        <div className="text-muted mt-1" style={{ fontSize: '0.75rem' }}>
          <i className="fa-solid fa-circle-info me-1 text-primary"></i>
          {feedback}
        </div>
      )}
    </div>
  )
}

export default PasswordStrengthBar
