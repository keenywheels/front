import { Outlet } from 'react-router-dom';

export const RootLayoutPage = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
};
