import '../context/AppProvider.jsx';

import { useAuthen } from '../context/AuthenProvider.jsx';
import NotificationDisplayer from '../NotificationDisplayer.jsx';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import GuardedOutlet from '../components/GuardedOutlet/GuardedOutlet.jsx';
import styles from './App.module.css';
import AppProvider from '../context/AppProvider.jsx';

function AppContent(props) {
    const { initialized } = useAuthen();

    return (
        <>  
            <NotificationDisplayer/>
            {initialized ? (
                <div className={styles.appLayout}>
                    <Header />
                    <GuardedOutlet/>
                    <Footer />
                </div>
            ) : (
                <div>Loading</div>
            )}
        </>
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