import { Link } from 'react-router-dom';
import usePosts from '../../hook/usePosts.jsx';
import PostCard from '../../components/PostCard/PostCard.jsx';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard.jsx';
import Hero from '../../components/Hero/Hero.jsx';
import Swiper from '../../components/Swiper/Swiper.jsx';
import styles from './HomePage.module.css';

function HomePage(props) {
    const { data: posts, loading } = usePosts();

    return (
        <main> 
            <section className='mb8'>
                <Hero
                    title='Welcome to WebBlog'
                    text='Discover insights, tutorials, and stories from the world of web development'
                >   
                    <Hero.Action>
                        <Link to='/posts'>
                            <button className='link-button'>Start reading</button>
                        </Link>
                    </Hero.Action>
                    <Hero.Image
                        src='/web-development1.png'
                        size='medium'
                        alr='web development'
                    />
                </Hero>
            </section>

            <section>
                <h2 className={`${styles.title} font-lg mb3`}>Recent Post</h2>
                {loading ? (
                    <Swiper 
                        items={Array(3).fill().map((_, index) => (<SkeletonCard />))}
                        buttonDisabled={true}
                    />
                ) : (
                    <Swiper
                        items={posts.map((post) => (
                            <PostCard
                                id={post.id}
                                title={post.title}
                                summary={post.summary}
                                author={post.author.username}
                                data={post.createdAt}
                                imgSrc='/fff.jpg'
                            />
                        ))}
                        buttonDisabled={false}
                    />
                )}
            </section>
        </main>
    );
};

export default HomePage;