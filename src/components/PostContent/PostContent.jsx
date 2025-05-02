import { calculateNumberOfDay } from '../../utils.jsx';
import styles from './PostContent.module.css';

function PostContent({ title, summary, author, content, createdAt, dislike, like, className }) {
    const numberOfDay = calculateNumberOfDay(new Date(), new Date(createdAt));

    return (
        <article className={`${className}`}>
            <header className={styles.header}>
                <div>
                    <h2 className='font-xl bold mb2'>{title}</h2>
                    <p className='font-md'>{summary}</p>
                </div>
                <div className={styles.metaInfo}>
                    <ul>
                        <li>{author}</li>
                        <li>{numberOfDay > 1 ? `${numberOfDay} days ago` : `${numberOfDay} day ago`}</li>
                    </ul>
                    <ul>
                        <li>{like} likes</li>
                        <li>{dislike} dislikes</li>
                    </ul>
                </div>
            </header>
            <div 
                className={styles.content}
                dangerouslySetInnerHTML={ {__html: content} }
            />
        </article>
    );
};

export default PostContent;