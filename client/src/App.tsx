import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Table from './pages/Table/Table';
import User from './pages/User/User';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import LoginRegisterLayout from './Layouts/LoginRegisterLayout/LoginRegisterLayout';
import MainLayout from './Layouts/MainLayout/MainLayout';
import Register from './pages/Register/Register';
import { useAppSelector } from './store/hook';

function App() {

  const user = useAppSelector((state) => state.user.user)

  if (!user.name) {
    return (
      <Routes>
        <Route path='/' element={<LoginRegisterLayout />}>
          <Route index element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/*' element={<Login />} />
        </Route>
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='/users'>
          <Route index element={<Table />} />
        </Route>
        <Route path='/user'>
          <Route path=':id' element={<User />} />
        </Route>
        <Route path='/*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App;
