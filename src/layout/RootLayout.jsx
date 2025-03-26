import AuthenProvider  from '../context/AuthenProvider.jsx';
import NotificationProvider  from '../context/NotificationProvider.jsx';
import NotificationDisplayer from '../components/NotificationDisplayer.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
      <NotificationProvider>
        <AuthenProvider>
            <NotificationDisplayer/>
            <div className='root-layout'>
              <Header />
              <main>
                <Outlet />           
              </main>
              <Footer />
            </div>
        </AuthenProvider>  
      </NotificationProvider>
    );
};

export default RootLayout;