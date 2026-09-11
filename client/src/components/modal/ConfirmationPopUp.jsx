import "../styles/PopUp.css";

export default function ConfirmationPopUp({
  title,
  message,
  confirmLabel = "Confirm",
  tone = "danger",
  onConfirm,
  onCancel,
}) {
  return (
    <div className="popup-overlay" role="dialog" aria-modal="true">
      <div className="popup-box popup-confirm">
        <h2 className="popup-title">{title}</h2>
        <p className="popup-message">{message}</p>
        <div className="popup-actions">
          <button className="popup-btn popup-btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button
            className={`popup-btn ${tone === "danger" ? "popup-btn-failed" : "popup-btn-success"}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
