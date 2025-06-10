import styles from './PostContentSkeleton.module.css';
import { SkeletonText, SkeletonBox } from '../Skeleton';

function PostContentSkeleton() {
    return (
        <div className={styles.postContentSkeleton}>
            <SkeletonBox height={46} className='mb2'/>
            <SkeletonBox height={30} width={300} className='mb4'/>
            <SkeletonText height={20} lines={2} width={100} className='mb3'/>
            <SkeletonText height={20} lines={2} width={100} className='mb5'/>
            <SkeletonText height={20} lines={5} gap={12}/>
        </div >
    );
};

export default PostContentSkeleton;