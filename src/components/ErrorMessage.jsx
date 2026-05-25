import spinnerSrc from "../assets/warningicon.svg";
import "../styles/Loading.css";

export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="error-message" role="alert">
      <span className="error-message__icon">
        {" "}
        <img src={spinnerSrc} alt="" className="loading-state__spinner" />
      </span>
      <p className="error-message__text">{message}</p>
    </div>
  );
}
