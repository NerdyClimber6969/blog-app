import '../context/AppProvider.jsx';
import NotificationDisplayer from '../NotificationDisplayer.jsx';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import GuardedOutlet from '../components/GuardedOutlet/GuardedOutlet.jsx';
import styles from './App.module.css';
import AppProvider from '../context/AppProvider.jsx';

function AppContent(props) {
    return (
        <>  
            <NotificationDisplayer/>
            <div className={styles.appLayout}>
                <Header />
                <GuardedOutlet/>
                <Footer />
            </div>
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