export function getApiBaseUrl() {
  if (typeof window === 'undefined') {
    return process.env.VITE_API_BASE_URL ?? 'http://localhost:8080';
  }
  return import.meta.env.VITE_API_BASE_URL ?? '/api';
}

export function getWsBaseUrl() {
  if (typeof window === 'undefined') {
    return process.env.VITE_WS_BASE_URL ?? 'ws://localhost:8080';
  }
  const api = import.meta.env.VITE_WS_BASE_URL;
  if (api) return api;
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${window.location.host}`;
}
