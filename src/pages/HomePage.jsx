import { Link } from 'react-router-dom';
import usePosts from '../hook/usePosts.jsx';
import PostCard from '../components/cards/PostCard.jsx';
import PostCardSkeleton from '../components/PostCardSkeleton.jsx'
import Hero from '../components/Hero.jsx';
import Swiper from '../components/Swiper.jsx';
import '../style/pages/_home.css';

function HomePage(props) {
    return (
        <div className='home-page page-container m-lr-center'> 
            <section className='hero-section mb8'>
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

            <section className='card-section recent-post-section'>
                <h2 className='font-lg mb3'>Recent Post</h2>
                <Swiper
                    fetchData={usePosts}
                    render={(post) => (
                        <PostCard
                            id={post.id}
                            title={post.title}
                            summary={post.summary}
                            author={post.author.username}
                            data={post.createdAt}
                            imgSrc='/fff.jpg'
                        />
                    )}
                    skeletonRender={() => <PostCardSkeleton />}
                />
            </section>
        </div>
    );
};

export default HomePage;