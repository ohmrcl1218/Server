import "../styles/About.css";
import { PROFILE } from "../config/Constants";

export default function About() {
  return (
    <div className="about">
      <p className="about-kicker">About this journal</p>
      <h1>Written in the open, revised in public.</h1>

      <p className="about-body">{PROFILE.bio}</p>

      <p className="about-body">
        Field Notes started as a personal habit: writing down what actually worked
        after shipping something, instead of what the tutorial said should work.
        Most entries are short on purpose — long enough to be useful, short enough
        to read on a coffee break.
      </p>

      <div className="about-author">
        <div className="about-avatar">{PROFILE.name.charAt(0)}</div>
        <div>
          <p className="about-author-name">{PROFILE.name}</p>
          <p className="about-author-role">{PROFILE.role}</p>
        </div>
      </div>
    </div>
  );
}
