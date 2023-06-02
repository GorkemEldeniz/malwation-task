import { Outlet } from 'react-router-dom';
import styles from './loginregister.module.css';
import { useLocation } from 'react-router-dom';
import Logo from '../../assets/logo_white.png';
//import toast, { Toaster } from 'react-hot-toast'

function LoginRegisterLayout() {

  const location = useLocation();

  return (
    <main className={styles.main}>
      <header>
        <img src={Logo} alt="Logo" />
        {location.pathname === '/register' ? <h1>Crate an account</h1> : <h1>Log in to your account</h1>}
        <span>Welcome back! Please enter your details</span>
      </header>
      <Outlet />
    </main>
  )
}

export default LoginRegisterLayout