import usePostsMeta from '../../hook/usePostsMeta.jsx';
import PostCard from '../../components/PostCard/PostCard.jsx';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard.jsx';
import Hero from '../../components/Hero/Hero.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import styles from './PostPage.module.css';
import { useSearchParams } from 'react-router-dom';
import { useRef } from 'react';

function PostPage(props) {
    const [searchParams, setSearchParams] = useSearchParams({ page: 1, orderBy: 'createdAt', orderDir: 'desc' });
    const searchRef = useRef();
    const { posts, totalPages, loading } = usePostsMeta(searchParams);

    function handleSearch(e) {
        e.preventDefault();
        const searchValue = searchRef.current.value;

        setSearchParams((searchParams) => {
            searchParams.set('title', searchValue);
            return searchParams;
        });
    };

    function handleSort(e) {
        e.preventDefault();
        const [orderBy, orderDir] = e.target.value.split(':');

        setSearchParams((searchParams) => {
            searchParams.set('orderBy', orderBy);
            searchParams.set('orderDir', orderDir);
            return searchParams;
        });
    };

    function onPageChange(page) {
        setSearchParams((searchParams) => {
            searchParams.set('page', page);
            return searchParams;
        });

        document.documentElement.scrollTop = 530;
    };

    return (
        <main>
            <div className='mainLayout'>
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
                    <div className={styles.filter}>
                        <div>
                            <input ref={searchRef} type='text' name='title' className='font-sm' placeholder='Search'/>
                            <button type='submit' className='font-sm' onClick={handleSearch}>Find</button>
                        </div>
                        <div>
                            <select 
                                name='sorting' 
                                value={`${searchParams.get('orderBy')}:${searchParams.get('orderDir')}`}
                                className='font-xs'
                                onChange={(e) => handleSort(e)}
                            >
                                <option value='createdAt:asc'>Date of Creation (Asc)</option>
                                <option value='createdAt:desc'>Date of Creation (Desc)</option>
                                <option value='title:asc'>Title (Asc)</option>
                                <option value='title:desc'>Title (Desc)</option>
                            </select>
                        </div>
                    </div>                
                    <div className={styles.cardGroup}>
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

                    {!loading && (
                        <Pagination
                            currentPage={Number(searchParams.get('page')) || 1}
                            totalPages={totalPages}
                            maxVisiblePageBtn={5}
                            onPageChange={onPageChange}
                        />
                    )}
                </section>
            </div>
        </main>
    );
};

export default PostPage;