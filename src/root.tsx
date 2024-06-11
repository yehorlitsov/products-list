import { Outlet } from 'react-router-dom';

function Root() {
  return (
    <>
      <main className='bg-background-main min-h-svh'>
        <Outlet />
      </main>
    </>
  );
}

export default Root;
