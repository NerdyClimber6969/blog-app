import { Link } from 'react-router-dom';
import Card from '../Card/Card.jsx';
import styles from './PostCard.module.css'

function PostCard({ id, title, summary, author, date, imgSrc }) {
    return (
        <Card className={styles.postCard}>
            <Card.Header className='mb5'>
                <Link to={`/posts/${id}`}>
                    <img className={styles.image} src={imgSrc}/>
                </Link>
            </Card.Header>

            <Card.MainContent className='mb3'>
                <div className={styles.content}>
                    <Link to={`/posts/${id}`}>
                        <h3 className={`${styles.title} font-lg mb4`}>{title}</h3>
                    </Link>
                    <p className='font-xs mb2'>{summary}</p>
                </div>
            </Card.MainContent>

            <Card.Attribution>
                <ul aria-label={`${title} details and attribution`} className={styles.attribution}>
                    <li className={`${styles.like} font-xs mb2`}>
                        <span>{author}</span>
                    </li>
                    <li className={`${styles.dislike} font-xs`}>
                        <span>{date}</span>
                    </li>
                </ul>
            </Card.Attribution>
        </Card>
    );
};

export default PostCard;