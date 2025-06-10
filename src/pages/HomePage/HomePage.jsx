import { Link } from 'react-router-dom';
import usePostsMetaData from '../../hook/usePostsMetaData.jsx';
import { PostCard, PostCardSkeleton } from '../../components/PostCard';
import Hero from '../../components/Hero/Hero.jsx';
import Swiper from '../../components/Swiper/Swiper.jsx';
import{ UnexpectedError, NotFoundError } from '../../components/Error';
import styles from './HomePage.module.css';

const DEFAULT_SEARCH_PARAMS = new URLSearchParams({ page: 1, pageSize: 7, orderBy: 'createdAt', orderDir: 'desc' })

function HomePage(props) {
    const { posts, error, loading } = usePostsMetaData(DEFAULT_SEARCH_PARAMS);

    return (
        <main>
            <div className='mainLayout'>
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
                    {loading && (
                        <Swiper 
                            items={Array(3).fill().map((_, index) => (<PostCardSkeleton />))}
                            buttonDisabled={true}
                        />
                    )}

                    {!loading && error && !posts && (
                        <UnexpectedError/>
                    )}

                    {!loading && !error && posts && (
                        posts.length > 0 ? (
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
                        ) : (
                            <NotFoundError/>
                        )
                    )}
                </section>
            </div>
        </main>
    );
};

export default HomePage;