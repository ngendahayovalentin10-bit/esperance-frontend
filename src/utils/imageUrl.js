const getBackendBaseUrl = () => {
  const configuredUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || '';
  if (configuredUrl) {
    return configuredUrl.replace(/\/api\/?$/, '').replace(/\/$/, '');
  }

  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  return 'http://localhost:5000';
};

export const normalizeImageUrl = (url) => {
  if (!url) return null;

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  if (url.startsWith('/uploads/') || url.startsWith('/api/uploads/')) {
    const backendBaseUrl = getBackendBaseUrl();
    const normalizedPath = url.startsWith('/uploads/')
      ? `/api/uploads/${url.slice('/uploads/'.length)}`
      : url;
    return `${backendBaseUrl}${normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`}`;
  }

  return url;
};