import { type ReactElement } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { RootLayout } from '@/components/layout';
import { Home, Portfolio } from '@/pages';
import { useRouterPath } from '@/lib/router';

export function App(): ReactElement {
  const currentPath = useRouterPath();

  return (
    <>
      <RootLayout>
        {currentPath === '/portfolio' ? <Portfolio /> : <Home />}
      </RootLayout>
      <Analytics />
    </>
  );
}

export default App;
