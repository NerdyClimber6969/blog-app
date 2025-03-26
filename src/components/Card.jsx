import { Link } from 'react-router-dom'

function PostCard({ id, title, summary, author, date, cardImageUrl }) {
    return (
        <article className='card'>
            <section className='card-image-section mb5'>
                <Link 
                    className='container card-image-container'
                    to={`/posts/${id}`}
                >
                    <img className='card-image' src={cardImageUrl} loading='lazy'/>
                </Link>
            </section>

            <section className='card-content-section mb3'>
                <div className='container card-content-container'>
                    <Link 
                        className='container card-title-container'
                        to={`/posts/${id}`}
                    >
                        <h3 className='card-title font-lg mb4'>{title}</h3>
                    </Link>
                    <p className='card-text font-xs mb2'>{summary}</p>
                </div>
            </section>

            <section className='card-attribution-section'>
                <div className='container card-attribution-container'>
                    <p className='card-author-attribution xfont-xs mb2'>{author}</p>
                    <p className='card-date-attribution xfont-xs'>{date}</p>
                </div>
            </section>
        </article>
    );
}

export default PostCard;