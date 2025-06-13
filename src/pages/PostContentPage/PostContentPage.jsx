import API from '../../services/apiService';

import { useNotifications } from '../../context/NotificationProvider.jsx';
import { useAuthen } from '../../context/AuthenProvider.jsx';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 

import { PostContent, PostContentSkeleton } from '../../components/PostContent';
import { Comment, CommentSkeleton } from '../../components/Comment';
import NewCommentDialog from '../../components/NewCommentDialog/NewCommentDialog.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import { UnexpectedError, NotFoundError } from '../../components/Error';

import styles from './PostContentPage.module.css';
import btnStyles from '../../components/Button/Button.module.css';

const NUMBER_OF_COMENTS = 10;
const BASE_SEARCH_PARAMS = { pageSize: NUMBER_OF_COMENTS, orderBy: 'createdAt', orderDir: 'asc' };

function PostContentPage() {
    const { handleApiCall } = useNotifications();
    const { isAuthenticated } = useAuthen();
    const [postState, setPostState] = useState({ data: null, error: null, loading: true });
    const [commentState, setCommentState] = useState({ data: null, error: null, loading: true });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { postId } = useParams();
    const [commentPage, setCommentPage] = useState(1);

    async function handleAddNewComment(value) {
        await handleApiCall(() => API.addComment(postId, value), {
            notifySuccess: true,
            notifyError: true,
            successMessage: 'New comment added sucessfully',
            onSuccess: (response) => {
                if (commentState.data.length < NUMBER_OF_COMENTS) {
                    setCommentState((current) => ({
                        ...current, 
                        data: [...current.data, response.comment],
                        total: current.total + 1
                    }));

                    return;
                };

                setCommentState({ ...commentState, total: commentState.total + 1 })
                return;
            }
        })
    };

    function handleCommentPageChange(page) {
        setCommentState({ ...commentState, loading: true });
        const searchParams = new URLSearchParams({ ...BASE_SEARCH_PARAMS, postId, page });

        API.getComments(searchParams)
            .then((result) => {
                setCommentState({ data: result.comments, error: null, loading: false, total: result.total })
                setCommentPage(page);
            })
            .catch((error) => setCommentState({ ...commentState, data: null, error: error, loading: false }))
    };

    useEffect(() => {
        const fetchPostPageData = async () =>  {
            const searchParams = new URLSearchParams({ ...BASE_SEARCH_PARAMS, postId, page: 1 })

            const [post, comments] = await Promise.allSettled([
                API.getPost(postId).then((result) => ({ data: result.post })),
                API.getComments(searchParams).then((result) => ({ data: result.comments, total: result.total }))
            ]);

            const stateSetterMap = { post: setPostState, comments: setCommentState };
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

        document.documentElement.scrollTop = 100;
        fetchPostPageData();
        return;
    }, []);
    
    if (!postState.loading && postState.error?.name === 'ResourceNotFoundError') {
        return (
            <main>
                <div className='mainLayout'>
                    <NotFoundError/>
                </div>
            </main>            
        );
    };

    return (
        <main>
            <div className='mainLayout'>                                          
                <div className={`${styles.postSection} mb7`}>                   
                    {postState.loading && (<PostContentSkeleton/>)}
                    {!postState.loading && postState.error && (<UnexpectedError mode='simple'/>)}                        
                    {!postState.loading && postState.data && (                     
                        <PostContent
                            title={postState.data.title}
                            summary={postState.data.summary}
                            author={postState.data.author.username}
                            content={postState.data.content}
                            createdAt={postState.data.createdAt}
                            dislike={postState.data.dislike}
                            like={postState.data.like}
                        />                                                          
                    )}                                                                     
                </div>
            
                <div className={styles.commentSection}>
                    {commentState.loading && (
                        <div>
                            {Array(3).fill().map((_, index) => (<CommentSkeleton key={index}/>))}
                        </div>
                    )}
                    {!commentState.loading && commentState.error && (<UnexpectedError mode='simple'/>)}
                    {!commentState.loading && commentState.data && (
                        <>
                            <div className={styles.commentGroup}>
                                {isDialogOpen && (
                                    <NewCommentDialog
                                        isOpen={isDialogOpen}
                                        onClose={() => setIsDialogOpen(false)}
                                        onSubmit={handleAddNewComment}
                                    />
                                )}
                                <div className={`${styles.header} mb3`}>
                                    <h2 className='font-md'>
                                        {`${commentState.data.length > 1 ? 'Comments' : 'Comment'} (${commentState.total})`}
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
                                {commentState.data.length > 0 ? (
                                    <ol>
                                        {commentState.data.map((comment) => (
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
                                    <p className='font-xs'>No Comment Yet !!!</p>
                                )}
                            </div>
                            {commentState.data.length > 0 && (
                                <Pagination 
                                    currentPage={commentPage}
                                    totalPages={Math.max(Math.ceil(commentState.total / NUMBER_OF_COMENTS), 1)}
                                    maxVisiblePageBtn={5}
                                    onPageChange={handleCommentPageChange}
                                />
                            )} 
                        </>                
                    )}
                </div>
            </div>
        </main>
    );
};

export default PostContentPage;