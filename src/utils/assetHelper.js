export const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const publicUrl = (process.env.PUBLIC_URL || '').replace(/\/$/, '');
  return `${publicUrl}${cleanPath}`;
};
