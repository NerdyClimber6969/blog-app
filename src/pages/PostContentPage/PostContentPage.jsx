import API from '../../services/apiService';
import { useNotifications } from '../../context/NotificationProvider.jsx';
import { useAuthen } from '../../context/AuthenProvider.jsx';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import PostContent from '../../components/PostContent/PostContent.jsx';
import Comment from '../../components/Comment/Comment.jsx';
import NewCommentDialog from '../../components/NewCommentDialog/NewCommentDialog.jsx';
import styles from './PostContentPage.module.css';
import btnStyles from '../../components/Button/Button.module.css';

function PostContentPage() {
    const { handleApiCall } = useNotifications();
    const { isAuthenticated } = useAuthen();
    const [loading, setLoading] = useState(true);
    const [postContent, setPostContent] = useState();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { postId } = useParams();

    async function handleAddNewComment(value) {
        await handleApiCall(() => API.addComment(postId, value), {
            notifySuccess: true,
            notifyError: true,
            successMessage: 'New comment added sucessfully',
            onSuccess: (response) => {
                setPostContent((current) => ({
                    post: { ...current.post },
                    comments: [...current.comments, response.comment]
                }));

                return;
            }
        })
    };

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
                        <div className={`${styles.post} mb7`}>       
                            <div>
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

                        <div className={styles.comments}>
                            <section>
                                <div>
                                    {isDialogOpen && (
                                        <NewCommentDialog
                                            isOpen={isDialogOpen}
                                            onClose={() => setIsDialogOpen(false)}
                                            onSubmit={handleAddNewComment}
                                        />
                                    )}
                                    <div className={styles.header}>
                                        <h2 className='font-md'>
                                            {`${postContent.comments.length > 1 ? 'Comments' : 'Comment'} (${postContent.comments.length})`}
                                        </h2>
                                        {isAuthenticated && (
                                            <button 
                                                className={`${btnStyles.primary} font-xs`} 
                                                onClick={() => setIsDialogOpen(true)}
                                            >
                                                <span className='font-lg'>+</span> Add New Comment
                                            </button>
                                        )}
                                    </div>
                                    {postContent.comments.length > 0 ? (
                                        <ol>
                                            {postContent.comments.map((comment) => (
                                                <li key={comment.id}>
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