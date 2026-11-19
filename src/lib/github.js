const SEARCH =
  'https://api.github.com/search/repositories?q=topic:learn-to-code+stars:%3E500&sort=stars&order=desc&per_page=4';

/**
 * @param {unknown} item
 * @returns {{ name: string, url: string, description: string, language: string, stars: number } | null}
 */
export function normalizeRepo(item) {
  if (!item || typeof item !== 'object') return null;
  const repo = /** @type {Record<string, unknown>} */ (item);
  if (typeof repo.full_name !== 'string' || typeof repo.html_url !== 'string') return null;
  const description =
    typeof repo.description === 'string' && repo.description.trim()
      ? repo.description.trim()
      : 'No description published.';
  const stars = typeof repo.stargazers_count === 'number' ? repo.stargazers_count : 0;
  return {
    name: repo.full_name,
    url: repo.html_url,
    description,
    language: typeof repo.language === 'string' ? repo.language : 'Multiple languages',
    stars,
  };
}

export function formatStars(count) {
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(
    count,
  );
}

/**
 * Public, unauthenticated GitHub search. No token is sent.
 * @param {AbortSignal} signal
 */
export async function fetchLearningRepos(signal) {
  const response = await fetch(SEARCH, {
    signal,
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (!response.ok) {
    const error = new Error(`GitHub responded with ${response.status}`);
    error.status = response.status;
    throw error;
  }
  const data = await response.json();
  const items = Array.isArray(data.items) ? data.items : [];
  return items.map(normalizeRepo).filter(Boolean);
}
