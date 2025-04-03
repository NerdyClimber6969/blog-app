import Card from './Card.jsx';
import LikeIcon from '../../icons/LikeIcon.jsx';
import DislikeIcon from '../../icons/DislikeIcon.jsx';

function RecordCard({ title, author, text, createdAt, like, dislike }) {
    return (
        <Card className='record-card'>
            <Card.MainContent>
                <h3 className='post-title font-sm mb2'>{title}</h3>
                <p className='post-author font-xxs mb3'>by {author}</p>
                {text && (
                    <p className='record-text font-xs'>{text}</p>
                )}
            </Card.MainContent>

            <Card.Attribution className='flex-row'>
                <div className='created-at font-xxs'>
                    <p>{`created at ${createdAt}`}</p>
                </div>
                <div className='like font-xxs'>
                    <LikeIcon className='svg-icon'/>
                    <span>{like}</span>
                </div>
                <div className='dislike font-xxs'>
                    <DislikeIcon className='svg-icon'/>
                    <span>{dislike}</span>
                </div>
            </Card.Attribution>
        </Card>
    );
};

export default RecordCard;