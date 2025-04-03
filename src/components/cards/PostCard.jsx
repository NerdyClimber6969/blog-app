import { Link } from 'react-router-dom';
import Card from './Card.jsx';

function PostCard({ id, title, summary, author, date, imgSrc }) {
    return (
        <Card className='post-card'>
            <Card.Image className='mb5'>
                <Link 
                    className='container post-image-container'
                    to={`/posts/${id}`}
                >
                    <img className='post-image' src={imgSrc}/>
                </Link>
            </Card.Image>

            <Card.MainContent className='mb3'>
                <div className='container post-content-container'>
                    <Link 
                        className='container post-title-container'
                        to={`/posts/${id}`}
                    >
                        <h3 className='post-title font-lg mb4'>{title}</h3>
                    </Link>
                    <p className='post-text font-xs mb2'>{summary}</p>
                </div>
            </Card.MainContent>

            <Card.Attribution>
                <div className='container post-attribution-container'>
                    <p className='post-author xfont-xs mb2'>{author}</p>
                    <p className='post-date xfont-xs'>{date}</p>
                </div>
            </Card.Attribution>
        </Card>
    );
};

export default PostCard;