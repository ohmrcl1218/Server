import "../styles/PopUp.css";

export default function SuccessPopUp({ title, message, onClose }) {
  return (
    <div className="popup-overlay" role="dialog" aria-modal="true">
      <div className="popup-box popup-success">
        <div className="popup-mark popup-mark-success">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="popup-title">{title}</h2>
        <p className="popup-message">{message}</p>
        <button className="popup-btn popup-btn-success" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
}
