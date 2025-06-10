import { SkeletonBox, SkeletonText } from '../Skeleton';
import Card from '../Card/Card.jsx';

function PostCardSkeleton(props) {
    return (
        <Card>
            <Card.MainContent>
                <SkeletonBox 
                    className='mb5'
                    height={150}
                />
                <SkeletonText
                    lines={1}
                    height={37}
                    className='mb4'
                />
                <SkeletonText
                    lines={6}
                    height={17}
                    gap={10}
                />
            </Card.MainContent>
        </Card>
    );
};

export default PostCardSkeleton;