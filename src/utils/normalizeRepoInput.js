export function normalizeRepoInput(raw) {
  if (!raw || typeof raw !== "string") return null;

  // Strip whitespace and trailing slashes
  let input = raw.trim().replace(/\/+$/, "");

  // Strip protocol (https:// or http://)
  input = input.replace(/^https?:\/\//, "");

  // Strip leading "github.com/"
  input = input.replace(/^github\.com\//, "");

  // At this point we expect "owner/repo" — possibly with extra path segments
  const parts = input.split("/");

  // We only care about the first two segments
  if (parts.length < 2) return null;

  const owner = parts[0].trim();
  const repo = parts[1].trim();

  if (!owner || !repo) return null;

  return `${owner}/${repo}`;
}
