import styles from './SkeletonCard.module.css';

function SkeletonCard(props) {
    return (
        <article className={styles.skeletonCard}>
            <section className='mb5'>
                <div className={styles.image}></div>
            </section>

            <section>
                <div className={`${styles.title} mb4`}></div>
                <div className={`${styles.text} mb2`}></div>
                <div className={`${styles.text} mb2`}></div>    
                <div className={`${styles.text} mb3`}></div> 
            </section>

            <section>
                <div className={`${styles.attribution} mb2`}></div>
                <div className={styles.attribution}></div>
            </section>     
        </article>
    );
};

export default SkeletonCard;