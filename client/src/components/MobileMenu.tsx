import { useState } from 'react';
import styles from '../Layouts/MainLayout/mainlayout.module.css';
import Logo from '../assets/logo_white.png';
import { navs, Nav } from './AsideBar';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hook';
import { logOut, getUsers } from '../store/features/userSlice';

function MobileMenu() {

  const [isOpen, setIsopen] = useState(false);
  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigator('/', {
      replace: true
    })
  }

  const handleUsers = async (e: React.MouseEvent, name: string) => {
    if (name === 'Users') {
      e.preventDefault();
      await dispatch(getUsers())
      navigator('/users?page=1');
    }
  }


  if (!isOpen) return <div onClick={() => setIsopen(true)} className={styles.toggle}>
    <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
  </div>

  return (
    <aside className={styles['mobile-menu']}>
      <div onClick={() => setIsopen(false)} className={styles['close-btn']}>X</div>
      <img src={Logo} alt="Logo" />
      <ol>
        {navs.map((nav: Nav, i) => <li key={i}>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.active : undefined
            }
            onClick={(e) => handleUsers(e, nav.name)}
            to={nav.path}>{nav.name}</NavLink>
        </li>)}
      </ol>

      <footer>
        <div className={styles.wrapper}>
          <h1>{user.name}</h1>
          <span>{user.email}</span>
        </div>
        <button onClick={handleLogout}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      </footer>
    </aside >
  )
}

export default MobileMenu