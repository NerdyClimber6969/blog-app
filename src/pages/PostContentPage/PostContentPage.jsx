import API from '../../services/apiService';
import { useNotifications } from '../../context/NotificationProvider.jsx';
import { useAuthen } from '../../context/AuthenProvider.jsx';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import PostContent from '../../components/PostContent/PostContent.jsx';
import Comment from '../../components/Comment/Comment.jsx';
import NewCommentDialog from '../../components/NewCommentDialog/NewCommentDialog.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import styles from './PostContentPage.module.css';
import btnStyles from '../../components/Button/Button.module.css';

function PostContentPage() {
    const { handleApiCall } = useNotifications();
    const { isAuthenticated } = useAuthen();
    const [post, setPost] = useState({ data: null, error: null, loading: true });
    const [comments, setComments] = useState({ data: null, error: null, loading: true });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { postId } = useParams();
    const [commentPage, setCommentPage] = useState(1);

    async function handleAddNewComment(value) {
        await handleApiCall(() => API.addComment(postId, value), {
            notifySuccess: true,
            notifyError: true,
            successMessage: 'New comment added sucessfully',
            onSuccess: (response) => {
                setComments((current) => ({
                    ...current, 
                    data: [...current.data, response.comment]
                }));
                return;
            }
        })
    };

    function handleCommentPageChange(page) {
        setComments({ ...comments, loading: true });
        const searchParams = new URLSearchParams({ postId, page, pageSize: 3 });

        setTimeout(() => {
            API.getComments(searchParams)
                .then((result) => {
                    setComments({ data: result.comments, error: null, loading: false, total: result.total })
                    setCommentPage(page);
                })
                .catch((error) => setComments({ ...comments, data: null, error: error, loading: false }))
        }, 1000)
    };

    useEffect(() => {
        const fetchPostPageData = async () =>  {
            const searchParams = new URLSearchParams({ postId, page: 1, pageSize: 3 })

            const [post, comments] = await Promise.allSettled([
                API.getPost(postId).then((result) => ({ data: result.post })),
                API.getComments(searchParams).then((result) => ({ data: result.comments, total: result.total }))
            ]);

            const stateSetterMap = { post: setPost, comments: setComments };
            const results = { post, comments };

            Object.entries(results).forEach(([name, result]) => {
                const stateSetter = stateSetterMap[name];
            
                if (result.status === 'fulfilled') {
                    const { value: { data, total } } = result;
                    stateSetter({ data, error: null, loading: false, total });
                } else {
                    const { reason } = result;
                    stateSetter({ data: null, error: reason, loading: false });
                }
            });

        };

        fetchPostPageData();
        return;
    }, []);
    
    if (!post.loading && post.error?.name === 'ResourceNotFoundError') {
        return (
            <main className={styles.postContentPage}>
                <div className='mainLayout'>
                    <p className='font-xs'>This post isn't available</p>
                </div>
            </main>            
        );
    };

    return (
        <main className={styles.postContentPage}>
            <div className='mainLayout'>                                          
                <div className={`${styles.post} mb7`}>   
                    {post.loading && (<p className='font-xs'>Loading post</p>)}
                    {!post.loading && post.error && (<p className='font-xs'>Error occured while fetching the post !!</p>)}                        
                    {!post.loading && post.data && (
                        <div>
                            <PostContent
                                title={post.data.title}
                                summary={post.data.summary}
                                author={post.data.author.username}
                                content={post.data.content}
                                createdAt={post.data.createdAt}
                                dislike={post.data.dislike}
                                like={post.data.like}
                            /> 
                        </div>  
                    )}                                                  
                </div>
            
                <div className={styles.comments}>
                    {comments.loading && (<p className='font-xs'>Loading comments</p>)}
                    {!comments.loading && comments.error && (<p className='font-xs'>Error occured while fetching comments !!</p>)}
                    {!comments.loading && comments.data && (
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
                                        {`${comments.data.length > 1 ? 'Comments' : 'Comment'} (${comments.total})`}
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
                                {comments.data.length > 0 ? (
                                    <ol>
                                        {comments.data.map((comment) => (
                                            <li key={comment.id}>
                                                <Comment
                                                    author={comment.post.author.username}
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
                            <Pagination 
                                currentPage={commentPage}
                                totalPages={Math.max(Math.ceil(comments.total / 10), 1)}
                                maxVisiblePageBtn={5}
                                onPageChange={handleCommentPageChange}
                            />                           
                        </section>
                    )}
                </div>
            </div>
        </main>
    );
};

export default PostContentPage;