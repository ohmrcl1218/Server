import "../styles/Header.css";

export default function Header({ page, setPage, isLoggedIn, currentUser, onLogout }) {
  const navItems = [
    { key: "home", label: "Journal" },
    { key: "about", label: "About" },
    { key: "contact", label: "Contact" },
  ];

  return (
    <header className="masthead">
      <div className="masthead-row">
        <div className="masthead-brand" onClick={() => setPage("home")}>
          <span className="masthead-mark">§</span> Field Notes
        </div>

        <nav className="masthead-nav">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`masthead-link ${page === item.key ? "is-active" : ""}`}
              onClick={() => setPage(item.key)}
            >
              {item.label}
            </button>
          ))}
          {isLoggedIn && (
            <button
              className={`masthead-link ${page === "dashboard" ? "is-active" : ""}`}
              onClick={() => setPage("dashboard")}
            >
              Dashboard
            </button>
          )}
        </nav>

        <div className="masthead-actions">
          {isLoggedIn ? (
            <>
              <span className="masthead-user">{currentUser?.name?.split(" ")[0]}</span>
              <button className="masthead-btn" onClick={onLogout}>
                Log out
              </button>
            </>
          ) : (
            <button className="masthead-btn masthead-btn-accent" onClick={() => setPage("login")}>
              Log in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
