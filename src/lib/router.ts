import { useState, useEffect } from 'react';

function getInitialPath(): string {
  if (typeof window !== 'undefined') {
    return window.location.pathname || '/';
  }
  return '/';
}

// Simple global router event bus
let currentPath = getInitialPath();

export function navigateTo(path: string) {
  currentPath = path;
  if (typeof window !== 'undefined') {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    window.dispatchEvent(new CustomEvent('navigate', { detail: path }));
  }
}

export function getCurrentPath(): string {
  if (typeof window !== 'undefined') {
    return window.location.pathname || currentPath;
  }
  return currentPath;
}

export function useRouterPath(): string {
  const [path, setPath] = useState(getCurrentPath());

  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setPath(customEvent.detail);
    };

    const handlePopState = () => {
      const current = window.location.pathname || '/';
      currentPath = current;
      setPath(current);
    };

    window.addEventListener('navigate', handleNavigate);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('navigate', handleNavigate);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return path;
}
