export const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  let cleanPath = path.startsWith('/') ? path : `/${path}`;

  if (cleanPath.startsWith('/personal_website/')) {
    return cleanPath;
  }

  let basePath = process.env.PUBLIC_URL || '';
  if (basePath.startsWith('http')) {
    try {
      basePath = new URL(basePath).pathname;
    } catch {
      basePath = '/personal_website';
    }
  }
  basePath = basePath.replace(/\/$/, '');

  if (!basePath || basePath === '.') {
    if (typeof window !== 'undefined' && (window.location.hostname.includes('github.io') || window.location.pathname.startsWith('/personal_website'))) {
      basePath = '/personal_website';
    } else {
      basePath = '';
    }
  }

  return `${basePath}${cleanPath}`;
};
