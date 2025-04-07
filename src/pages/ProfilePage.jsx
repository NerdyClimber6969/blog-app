import UserCard from '../components/cards/UserCard.jsx';
import RecordCard from '../components/cards/RecordCard.jsx';
import Tabs from '../components/Tabs.jsx';
import { useEffect, useState } from 'react';
import { useNotifications } from '../context/NotificationProvider.jsx';
import '../style/pages/_profile.css';
import API from '../services/apiService.js';

function ProfilePage() {
    const { setNotifications } = useNotifications();
    const [profile, setProfile] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleFetchProfile = async() => {
            const json = await API.getProfile();

            if (!json.success) {
                return setNotifications(json.errors.map((error) => ({
                    message: error.message,
                    id: 1,
                    isClosing: false,
                    type: 'error'
                })));
            };

            setLoading(false);
            setProfile(json.profile);
        };

        handleFetchProfile();
        return;
    }, []);

    return !loading && (
        <div className='page-container profile-page'>
            <UserCard 
                username={profile.username}
                firstName={profile.firstName}
                lastName={profile.lastName}
                status={profile.role}
                src='/fff.jpg'
            />
            <Tabs defaultActiveTab={0}>
                <Tabs.Pane title='Posts'>
                    {profile.posts.map((post) => (
                        <RecordCard 
                            key={post.id}
                            title={post.title}
                            author={post.author.username}
                            text={post.summary}
                            createdAt={new Date(post.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                            like={post.like}
                            dislike={post.dislike}
                        />
                    ))}
                </Tabs.Pane>

                <Tabs.Pane title='Comment'>
                    {profile.comments.map((comment) => (
                        <RecordCard 
                            key={comment.id}
                            title={comment.post.title}
                            author={comment.post.author.username}
                            text={comment.content}
                            createdAt={new Date(comment.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                            like={comment.like}
                            dislike={comment.dislike}
                        />
                    ))}
                </Tabs.Pane>
            </Tabs>
        </div>
    );
};

export default ProfilePage;