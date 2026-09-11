import "../styles/Sidebar.css";

export default function Sidebar({ page, setPage, onLogoutClick, onExitAdmin, currentUser }) {
  const navItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "bloglist", label: "Blog List" },
    { key: "profile", label: "Profile" },
  ];

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-brand">
          <span className="sidebar-mark">§</span> Field Notes
        </div>
        <p className="sidebar-sub">Admin</p>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`sidebar-link ${page === item.key ? "is-active" : ""}`}
              onClick={() => setPage(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">{currentUser?.name?.charAt(0) || "?"}</div>
          <div>
            <p className="sidebar-user-name">{currentUser?.name}</p>
            <button className="sidebar-exit" onClick={onExitAdmin}>
              View site
            </button>
          </div>
        </div>
        <button className="sidebar-logout" onClick={onLogoutClick}>
          Log out
        </button>
      </div>
    </aside>
  );
}
