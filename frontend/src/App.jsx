import { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import SpotIndex from './components/SpotIndex';
import SpotDetails from './components/SpotDetails';
import CreateSpotForm from './components/CreateSpotForm';
import ManageSpots from './components/ManageSpots';
import { ElementContext } from './context/ElementContext';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { element } = useContext(ElementContext)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <div className={`background-wrapper-${element}`}>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SpotIndex />
      },
      {
        path: 'spots/new',
        element: <CreateSpotForm />
      },
      {
        path: 'spots/current',
        element: <ManageSpots />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetails />
      },
      {
        path: '/spots/:spotId/edit',
        element: <CreateSpotForm />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;