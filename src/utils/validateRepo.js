/**
 * validateRepo
 *
 * Checks that a normalized "owner/repo" string looks reasonable
 * before we fire off an API request.
 *
 * GitHub usernames / repo names allow letters, digits, hyphens, underscores,
 * and dots. We reject anything that doesn't match that pattern.
 */
export function validateRepo(normalized) {
  if (!normalized) return false;

  // Must be exactly two segments separated by a single slash
  const parts = normalized.split("/");
  if (parts.length !== 2) return false;

  const [owner, repo] = parts;

  // Basic GitHub naming rules
  const validSegment = /^[a-zA-Z0-9._-]+$/;
  return validSegment.test(owner) && validSegment.test(repo);
}
