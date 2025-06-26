import styles from './PageNotFoundError.module.css';

function PageNotFoundError() {
    return (
        <div className={styles.error}>
            <p className='font-hero mb1 bold'>404</p>
            <p className='font-lg mb6'>Not Found</p>
            <p className='font-sm'>The resource requested was not found</p>
        </div>
    );
};

export default PageNotFoundError;