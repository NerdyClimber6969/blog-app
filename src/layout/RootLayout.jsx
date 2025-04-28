import AuthenProvider  from '../context/AuthenProvider.jsx';
import NotificationProvider  from '../context/NotificationProvider.jsx';
import NotificationDisplayer from '../NotificationDisplayer.jsx';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';
import styles from './RootLayout.module.css';

const RootLayout = () => {
    return (
      <NotificationProvider>
        <AuthenProvider>
            <NotificationDisplayer/>
            <div className={styles.pageLayout}>
              <Header />
              <div className={styles.mainLayout}>
                <Outlet />           
              </div>
              <Footer />
            </div>
        </AuthenProvider>  
      </NotificationProvider>
    );
};

export default RootLayout;