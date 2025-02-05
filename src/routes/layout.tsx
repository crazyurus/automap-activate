import { Outlet } from '@modern-js/runtime/router';

import styles from './layout.module.scss';
import '../global.css';

function Layout(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.header}>高德地图比亚迪定制版激活查询工具</div>
      <div className={styles.body}>
        <Outlet />
      </div>
      <footer className={styles.footer}>&copy; Cr4zy Uru5</footer>
    </div>
  );
}

export default Layout;
