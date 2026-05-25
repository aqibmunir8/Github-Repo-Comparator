import { useState } from "react";
import "../styles/SearchForm.css";

// Demo repos used when the user clicks "Demo"
const DEMO_A = "adrianhajdin/project_chat_application";
const DEMO_B = "adrianhajdin/project_corona_tracker";

export default function SearchForm({ onCompare, isLoading }) {
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onCompare(inputA, inputB);
  }

  // Fill both fields with demo repos and immediately trigger a compare
  function handleDemo() {
    setInputA(DEMO_A);
    setInputB(DEMO_B);
    onCompare(DEMO_A, DEMO_B);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <div className="search-form__fields">
        <div className="search-form__group">
          <label className="search-form__label" htmlFor="repo-a">
            Repository A
          </label>
          <input
            id="repo-a"
            className="search-form__input"
            type="text"
            placeholder="facebook/react"
            value={inputA}
            onChange={(e) => setInputA(e.target.value)}
            disabled={isLoading}
            autoComplete="off"
            spellCheck="false"
          />
        </div>

        <div className="search-form__group">
          <label className="search-form__label" htmlFor="repo-b">
            Repository B
          </label>
          <input
            id="repo-b"
            className="search-form__input"
            type="text"
            placeholder="vuejs/vue"
            value={inputB}
            onChange={(e) => setInputB(e.target.value)}
            disabled={isLoading}
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </div>

      <div className="search-form__actions">
        <button
          type="submit"
          className="btn btn--primary"
          disabled={isLoading}
        >
          {isLoading ? "Loading…" : "Compare"}
        </button>

        <button
          type="button"
          className="btn btn--secondary"
          onClick={handleDemo}
          disabled={isLoading}
        >
          Demo
        </button>
      </div>

      <p className="search-form__hint">
        Accepts: <code>owner/repo</code> or full GitHub URLs
      </p>
    </form>
  );
}
