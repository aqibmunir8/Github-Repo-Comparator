const BASE_URL = "https://api.github.com/repos";

export async function fetchRepo(ownerRepo) {
  const controller = new AbortController();
  // Abort after 10 seconds to handle network timeouts gracefully
  const timeoutId = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(`${BASE_URL}/${ownerRepo}`, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.status === 404) {
      throw new Error(`Repository "${ownerRepo}" not found.`);
    }

    if (response.status === 403) {
      throw new Error(
        "GitHub API rate limit exceeded. Please wait a minute and try again."
      );
    }

    if (!response.ok) {
      throw new Error(
        `GitHub API returned an unexpected error (status ${response.status}).`
      );
    }

    return await response.json();
  } catch (err) {
    clearTimeout(timeoutId);

    if (err.name === "AbortError") {
      throw new Error("Request timed out. Check your connection and try again.");
    }

    if (err.message) throw err;


    throw new Error("Network error. Please check your connection.");
  }
}


export async function fetchRepos(ownerRepoA, ownerRepoB) {
  return Promise.all([fetchRepo(ownerRepoA), fetchRepo(ownerRepoB)]);
}
