import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-row">
        <p>Field Notes — a running log of things learned while building software.</p>
        <p className="site-footer-year">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
