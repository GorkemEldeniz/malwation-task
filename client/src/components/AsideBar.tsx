import { ReactElement } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from '../assets/logo_white.png';
import styles from '../Layouts/MainLayout/mainlayout.module.css';
import { useAppSelector, useAppDispatch } from "../store/hook";
import { logOut, getUsers } from "../store/features/userSlice";
import { useMediaQuery } from 'react-responsive';
import MobileMenu from "./MobileMenu";

export type Nav = {
  name: string,
  icon: ReactElement,
  path: string
}

export const navs: Nav[] = [
  {
    name: 'Home',
    icon: <i className="fa-light fa-house"></i>,
    path: '/'
  },
  {
    name: 'Projects',
    icon: <i className="fa-regular fa-folders"></i>,
    path: '/projects'
  },
  {
    name: 'Tasks',
    icon: <i className="fa-regular fa-notebook"></i>,
    path: '/tasks'
  },
  {
    name: 'Users',
    icon: <i className="fa-light fa-users"></i>,
    path: '/users?page=1'
  },
  {
    name: 'Support',
    icon: <i className="fa-solid fa-question"></i>,
    path: '/support'
  },
  {
    name: 'Settings',
    icon: <i className="fa-regular fa-gear"></i>,
    path: '/settings'
  },
]


function AsideBar() {

  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  const handleLogout = () => {
    dispatch(logOut());
    navigator('/', {
      replace: true
    })
  }


  const handleUsers = (e: React.MouseEvent, name: string) => {
    if (name === 'Users') {
      e.preventDefault();
      navigator('/users?page=1');
    }
  }

  if (isTabletOrMobile) return <MobileMenu />

  return (
    <aside>
      <img src={Logo} alt="Logo" />
      <input type="text" name="search" placeholder="Search" maxLength={10} />
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

export default AsideBar