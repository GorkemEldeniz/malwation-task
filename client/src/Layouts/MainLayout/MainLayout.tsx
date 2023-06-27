import { Outlet } from 'react-router-dom';
import AsideBar from '../../components/AsideBar';
import styles from './mainlayout.module.css';
import { useNavigation } from 'react-router-dom';
import Loader from '../../components/Loader';

function MainLayout() {

  const state = useNavigation();

  if (state.state == 'loading') return <div><Loader /></div>

  return (
    <main className={styles.main}>
      <AsideBar />
      <Outlet />
    </main>
  )
}

export default MainLayout