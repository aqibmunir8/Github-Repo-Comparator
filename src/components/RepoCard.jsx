import { formatDate } from "../utils/formatDate";
import "../styles/RepoCard.css";


function formatNumber(n) {
  return (n ?? 0).toLocaleString("en-US");
}

export default function RepoCard({ repo, isWinner }) {
  if (!repo) return null;

  return (
    <article className={`repo-card${isWinner ? " repo-card--winner" : ""}`}>
      {/* Owner avatar + repo name */}
      <div className="repo-card__header">
        <img
          src={repo.owner.avatar_url}
          alt={`${repo.owner.login} avatar`}
          className="repo-card__avatar"
        />
        
        <div className="repo-card__name-block">
          <span className="repo-card__full-name">{repo.full_name}</span>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-card__link"
          >
            View on GitHub ↗
          </a>
        </div>
      </div>

      {/* Description */}
      {repo.description && (
        <p className="repo-card__description">{repo.description}</p>
      )}

      {/* Key stats includes these.. */}
      <div className="repo-card__stats">
        <div className="repo-card__stat">
          <span className="repo-card__stat-label">Stars</span>
          <span className="repo-card__stat-value">
            ★ {formatNumber(repo.stargazers_count)}
          </span>
        </div>
        <div className="repo-card__stat">
          <span className="repo-card__stat-label">Forks</span>
          <span className="repo-card__stat-value">
            ⑂ {formatNumber(repo.forks_count)}
          </span>
        </div>
        <div className="repo-card__stat">
          <span className="repo-card__stat-label">Watchers</span>
          <span className="repo-card__stat-value">
            {formatNumber(repo.watchers_count)}
          </span>
        </div>
        <div className="repo-card__stat">
          <span className="repo-card__stat-label">Open Issues</span>
          <span className="repo-card__stat-value">
            {formatNumber(repo.open_issues_count)}
          </span>
        </div>
      </div>

      {/* Meta tags: language, license, dates, updated, created */}
      <div className="repo-card__meta">
        {repo.language && (
          <span className="repo-card__tag">{repo.language}</span>
        )}
        {repo.license?.spdx_id && (
          <span className="repo-card__tag">{repo.license.spdx_id}</span>
        )}
        <span className="repo-card__tag">
          Created {formatDate(repo.created_at)}
        </span>
        <span className="repo-card__tag">
          Updated {formatDate(repo.updated_at)}
        </span>
      </div>
    </article>
  );
}
