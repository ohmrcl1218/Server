import "../styles/PopUp.css";

export default function FailedPopUp({ title, message, onClose }) {
  return (
    <div className="popup-overlay" role="dialog" aria-modal="true">
      <div className="popup-box popup-failed">
        <div className="popup-mark popup-mark-failed">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        <h2 className="popup-title">{title}</h2>
        <p className="popup-message">{message}</p>
        <button className="popup-btn popup-btn-failed" onClick={onClose}>
          Try again
        </button>
      </div>
    </div>
  );
}
