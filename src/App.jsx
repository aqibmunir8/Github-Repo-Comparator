import { useState } from "react";

import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import RepoCard from "./components/RepoCard";
import ComparisonChart from "./components/ComparisonChart";
import ErrorMessage from "./components/ErrorMessage";
import LoadingState from "./components/LoadingState";

import { fetchRepos } from "./services/githubApi";
import { normalizeRepoInput } from "./utils/normalizeRepoInput";
import { validateRepo } from "./utils/validateRepo";

import "./styles/App.css";

export default function App() {
  const [repos, setRepos] = useState(null);   // [repoA, repoB] or null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleCompare(rawA, rawB) {
    // Clear previous results and errors before each new search
    setError(null);
    setRepos(null);

    // ── Input validation ──────────────────────────────────────────────
    const normalizedA = normalizeRepoInput(rawA);
    const normalizedB = normalizeRepoInput(rawB);

    if (!rawA.trim() || !rawB.trim()) {
      setError("Please enter both repositories before comparing.");
      return;
    }

    if (!normalizedA || !validateRepo(normalizedA)) {
      setError(
        `"${rawA}" doesn't look like a valid repository. Try: owner/repo or a full GitHub URL.`
      );
      return;
    }

    if (!normalizedB || !validateRepo(normalizedB)) {
      setError(
        `"${rawB}" doesn't look like a valid repository. Try: owner/repo or a full GitHub URL.`
      );
      return;
    }

    // ── Fetch both repos in parallel 
    setLoading(true);

    try {
      const [repoA, repoB] = await fetchRepos(normalizedA, normalizedB);
      setRepos([repoA, repoB]);
    } catch (err) {
      // fetchRepos always throws a plain string message — safe to display
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Determine which repo "wins" on stars for the visual look ( a dark top bar line )
  const winnerIndex =
    repos && repos[0].stargazers_count >= repos[1].stargazers_count ? 0 : 1;

  return (
    <>
      <Header />

      <main className="app-main">
        <SearchForm onCompare={handleCompare} isLoading={loading} />

        {/* Error banner */}
        {error && <ErrorMessage message={error} />}

        {/* Loading spinner */}
        {loading && <LoadingState />}

        {/* Results — only shown after a successful fetch */}
        {repos && !loading && (
          <>
            <p className="section-title">Repository Comparison</p>

            {/* Side-by-side repo cards */}
            <div className="repo-cards">
              <RepoCard repo={repos[0]} isWinner={winnerIndex === 0} />
              <RepoCard repo={repos[1]} isWinner={winnerIndex === 1} />
            </div>

            <hr className="section-divider" />

            {/* Chart is visually separated from the cards */}
            <ComparisonChart repoA={repos[0]} repoB={repos[1]} />
          </>
        )}
      </main>
    </>
  );
}
