import { Outlet } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
        {/* the outlet component marks the place where all the nested child components should be rendered to */}
      </main>
    </>
  );
}

export default RootLayout;
