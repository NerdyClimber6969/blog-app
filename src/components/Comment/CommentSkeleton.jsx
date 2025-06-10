import styles from './CommentSkeleton.module.css';
import { SkeletonBox, SkeletonText } from '../Skeleton';

function CommentSkeleton() {
    return (
        <div className={`${styles.commentSkeleton} mb3`}>
            <div className='mb3'>
                <SkeletonBox height={35} width={35} cycle={true} />
                <SkeletonText height={15} width={80} lines={2} gap={5}/>
            </div>
            <SkeletonText height={17} lines={1} className='mb3'/>
            <SkeletonText height={17} width={50} lines={2}/>
        </div>
    );
};

export default CommentSkeleton;