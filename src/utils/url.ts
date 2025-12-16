/**
 * Utility function to prepend the base URL to paths.
 * This is needed for GitHub Pages deployment where the site
 * is hosted at a subpath (e.g., /huisartsenpraktijk-blijham-astro/).
 */
export function getUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  // Handle empty base or root
  if (!base || base === '/') {
    return path.startsWith('/') ? path : `/${path}`;
  }
  // Remove trailing slash from base, ensure path starts with /
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}
