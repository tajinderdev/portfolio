import { useState, useEffect } from 'react';

// Simple global router event bus
let currentPath = '/';

export function navigateTo(path: string) {
  currentPath = path;
  window.dispatchEvent(new CustomEvent('navigate', { detail: path }));
  
  // Wipe any existing hash cleanly without scrolling
  if (window.location.hash) {
    window.history.pushState(null, '', window.location.pathname);
  }
}

export function getCurrentPath() {
  return currentPath;
}

export function useRouterPath() {
  const [path, setPath] = useState(getCurrentPath());
  
  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setPath(customEvent.detail);
    };
    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
  }, []);
  
  return path;
}
