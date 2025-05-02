import styles from './Comment.module.css';
import { calculateNumberOfDay } from '../../utils.jsx';

function Comment({ author, createdAt, content, like, dislike }) {
    const numberOfDay = calculateNumberOfDay(new Date(), new Date(createdAt));

    return (
        <article className={styles.comment}>
            <header className='mb3'>                
                <img src='/fff.jpg'/>
                <div>
                    <div className='mb1'><span className='mb1'>{author}</span></div>
                    <div>
                        <span>
                            {numberOfDay > 1 ? `${numberOfDay} days ago` : `${numberOfDay} day ago`}
                        </span>
                    </div>
                </div>    
            </header>
            <div className='mb3'>
                <p>{content}</p>
            </div>                   
            <footer>
                <div>
                    <div><span>{like} like</span></div>
                    <div><span>{dislike} dislike</span></div>
                </div>
            </footer>
        </article>
    );
};

export default Comment;