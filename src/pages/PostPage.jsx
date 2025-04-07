import usePosts from '../hook/usePosts.jsx';
import PostCard from '../components/cards/PostCard.jsx';
import PostCardSkeleton from '../components/PostCardSkeleton.jsx';
import Hero from '../components/Hero.jsx';
import '../style/pages/_posts.css';

function PostPage(props) {
    const { data: posts, loading } = usePosts();

    return (
        <div className='post-page page-container'>
            <section className='hero-section mb8'>
                <Hero 
                    title='Blog'
                    text='Discover stories from web development community'
                >
                    <Hero.Image
                        src='/blog-header_480.png'
                        size='small'
                        alt='blog icon'
                    />
                </Hero>
            </section>

            <section className='card-section all-post-section'>                
                <div className='card-group'>
                    {loading ? (
                        Array(3).fill().map((_, index) => (
                            <div 
                                className='card-container' 
                                key={index}
                            > 
                                <PostCardSkeleton />                                   
                            </div>
                        )) 
                    ) : (
                        posts.map((post) => (
                            <PostCard
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                summary={post.summary}
                                author={post.author.username}
                                date={new Date(post.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                                imgSrc='/fff.jpg'
                            />
                        ))                            
                    )}
                </div>                
            </section>
        </div>
    );
};

export default PostPage;