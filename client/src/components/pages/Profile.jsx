import "../styles/Profile.css";

export default function Profile({ profile }) {
  return (
    <div className="profile">
      <p className="profile-kicker">Account</p>
      <h1>Profile</h1>

      <div className="profile-card">
        <div className="profile-avatar">{profile.name.charAt(0)}</div>
        <h2>{profile.name}</h2>
        <p className="profile-role">{profile.role}</p>
        <p className="profile-bio">{profile.bio}</p>

        <dl className="profile-details">
          <div>
            <dt>Email</dt>
            <dd>{profile.email}</dd>
          </div>
          <div>
            <dt>Contact</dt>
            <dd>{profile.contact}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{profile.location}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
