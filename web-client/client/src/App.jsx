import NotFound from './Pages/NotFound';
import Layout from './Components/Layout';
import LogInForm from './Pages/LogInForm';
import RegistrationForm from './Pages/RegistrationForm';
import Dashboard from './Pages/Dashboard';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WorkoutDetails from './Pages/WorkoutDetails';
import AddWorkout from './Pages/AddWorkout';
import EditWorkout from './Pages/EditWorkout';
import PrivateRoute from './Components/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'register', element: <RegistrationForm /> },
      {
        path: '/',
        element: <LogInForm />,
      },
      {
        path: '/dashboard',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: '/workoutdetails/:id',
        element: (
          <PrivateRoute>
            <WorkoutDetails />
          </PrivateRoute>
        ),
      },
      {
        path: '/addworkout',
        element: (
          <PrivateRoute>
            <AddWorkout />
          </PrivateRoute>
        ),
      },
      {
        path: '/editworkout/:id',
        element: (
          <PrivateRoute>
            <EditWorkout />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={1000} // 1 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable={false}
        theme="light"
      />
    </>
  );
}
