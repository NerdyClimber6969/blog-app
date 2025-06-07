import '../context/AppProvider.jsx';
import NotificationDisplayer from '../NotificationDisplayer.jsx';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import GuardedOutlet from '../components/GuardedOutlet/GuardedOutlet.jsx';
import styles from './App.module.css';
import AppProvider from '../context/AppProvider.jsx';
import { useAuthen } from '../context/AuthenProvider.jsx';
import StairLoader from '../components/StairLoader/StairLoader.jsx';

function AppContent(props) {
    const  { loading } = useAuthen();

    return (
        loading ? (
            <div className={styles.loadingLayout}>
                <div>
                    <StairLoader/>
                    <p 
                        className='font-sm' 
                        style={{ marginTop: 'var(--spacing4)' }}
                    >
                        Loading...
                    </p>
                </div>
            </div>
        ) : (
            <>  
                <NotificationDisplayer/>
                <div className={styles.appLayout}>
                    <Header />
                    <GuardedOutlet/>
                    <Footer />
                </div>
            </>
        )
    );
};

function App(props) {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
};

export default App;