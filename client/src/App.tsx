import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Table from './pages/Table/Table';
import User from './pages/User/User';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import LoginRegisterLayout from './Layouts/LoginRegisterLayout/LoginRegisterLayout';
import Login from './pages/Login/Login';
import MainLayout from './Layouts/MainLayout/MainLayout';
import Register from './pages/Register/Register';
import { useAppSelector } from './store/hook';
import { fetchUsers } from './pages/Table/Table';
import { userLoader, userAction } from './pages/User/User';

function App() {

  const user = useAppSelector((state) => state.user.user)

  const Router = createBrowserRouter([
    {
      path: '/',
      element: !user.name ? <LoginRegisterLayout /> : <MainLayout />,
      children: [
        { index: true, element: !user.name ? <Login /> : <Home /> },
        { path: '/register', element: !user.name ? <Register /> : <NotFound /> },
        { path: '/users', loader: fetchUsers, element: !user.name ? <NotFound /> : <Table />, children: [{ index: true, element: <Table /> }] },
        { path: '/user', children: [{ path: ':id', element: <User />, loader: userLoader, action: userAction }] },
        { path: '/*', element: !user.name ? <Login /> : <NotFound /> }
      ]
    }
  ]);

  return <RouterProvider router={Router} />;
}

export default App;
