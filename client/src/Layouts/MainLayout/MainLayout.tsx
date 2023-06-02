import { Outlet } from 'react-router-dom';
import AsideBar from '../../components/AsideBar';
import styles from './mainlayout.module.css';

function MainLayout() {
  return (
    <main className={styles.main}>
      <AsideBar />
      <Outlet />
    </main>
  )
}

export default MainLayout