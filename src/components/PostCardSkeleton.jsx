import '../style/components/_skeletion.css';

function PostCardSkeleton(props) {
    return (
        <article className='post-card card skeleton'>
            <section className="card-image-section mb5">
                <div className='skeleton skeleton-image'></div>
            </section>

            <section className='card-content-section'>
                <div className='skeleton skeleton-title mb4'></div>
                <div className='skeleton skeleton-text mb2'></div>
                <div className='skeleton skeleton-text mb2'></div>    
                <div className='skeleton skeleton-text mb3'></div> 
            </section>

            <section className='card-attribution-section'>
                <div className='skeleton skeleton-attribution mb2'></div>
                <div className='skeleton skeleton-attribution'></div>
            </section>     
        </article>
    );
};

export default PostCardSkeleton;