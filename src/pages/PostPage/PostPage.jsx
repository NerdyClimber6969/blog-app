import usePosts from '../../hook/usePosts.jsx';
import PostCard from '../../components/PostCard/PostCard.jsx';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard.jsx';
import Hero from '../../components/Hero/Hero.jsx';
import styles from './PostPage.module.css';

function PostPage(props) {
    const { data: posts, loading } = usePosts();

    return (
        <main>
            <section className='mb8'>
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

            <section>                
                <div className={styles.cardsContainer}>
                    {loading ? (
                        Array(3).fill().map((_, index) => (
                            <div 
                                className={styles.cardContainer} 
                                key={index}
                            > 
                                <SkeletonCard />                                   
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
        </main>
    );
};

export default PostPage;