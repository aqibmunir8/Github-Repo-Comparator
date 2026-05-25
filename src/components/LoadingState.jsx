import spinnerSrc from "../assets/loadingSpinner.svg";
import "../styles/Loading.css";

export default function LoadingState() {
  return (
    <div
      className="loading-state"
      aria-live="polite"
      aria-label="Loading repositories"
    >
      <img src={spinnerSrc} alt="" className="loading-state__spinner" />
      <p className="loading-state__message">Fetching repositories…</p>
    </div>
  );
}
