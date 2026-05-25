import "../styles/Header.css";
import spinnerSrc from "../assets/githubLogo.png";

function GitHubIcon() {
  return <img src={spinnerSrc} className="header__icon" />;
}

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <GitHubIcon />
        <span className="header__title">Repo Comparator</span>
      </div>
      <span className="header__subtitle">GitHub Repository Analysis</span>
    </header>
  );
}
