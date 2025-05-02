import API from '../../services/apiService';
import { useNotifications } from '../../context/NotificationProvider.jsx';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import PostContent from '../../components/PostContent/PostContent.jsx';
import Comment from '../../components/Comment/Comment.jsx';
import styles from './PostContentPage.module.css';

function PostContentPage() {
    const { handleApiCall } = useNotifications();
    const [loading, setLoading] = useState(true);
    const [postContent, setPostContent] = useState();
    const { postId } = useParams();

    useEffect(() => {
        const fetchPostContent = async () =>  {
            await handleApiCall(() => API.getPost(postId), {
                notifySuccess: false,
                notifyError: true,
                onSuccess: (response) => {
                    setPostContent(response);
                    setLoading(false);
                    return;
                }
            });
        };

        fetchPostContent();
        return;
    }, []);
    
    return (
        <main className={styles.postContentPage}>
            <div className='mainLayout'>
                {loading ? (
                    <div>Loading</div>
                ) : (
                    <>
                        <div className='flex ma-center mb7'>       
                            <div 
                                className={styles.maxWidth} 
                                
                            >
                                <PostContent
                                    title={postContent.post.title}
                                    summary={postContent.post.summary}
                                    author={postContent.post.author.username}
                                    content={postContent.post.content}
                                    createdAt={postContent.post.createdAt}
                                    dislike={postContent.post.dislike}
                                    like={postContent.post.like}
                                />    
                            </div>                       
                        </div>

                        <div className='flex ma-center'>
                            <section className={styles.maxWidth}>
                                <div className={styles.contentContainer}>
                                    <h2 className='font-md'>
                                        {`${postContent.comments.length > 1 ? 'Comments' : 'Comment'} (${postContent.comments.length})`}
                                    </h2>
                                    {postContent.comments.length > 0 ? (
                                        
                                            <ol>
                                                {postContent.comments.map((comment) => (
                                                    <li>
                                                        <Comment
                                                            author={comment.author.username}
                                                            createdAt={comment.createdAt}
                                                            content={comment.content}
                                                            like={comment.like}
                                                            dislike={comment.dislike}
                                                        />
                                                    </li>
                                                ))}
                                            </ol>
                                        
                                    ) : (
                                        <p>No Comment Yet !!!</p>
                                    )}
                                </div>
                            </section>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default PostContentPage;