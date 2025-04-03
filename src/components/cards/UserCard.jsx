import Card from './Card.jsx';

function UserCard({ userInfo }) {
    return (
        <Card className='user-card'>
            <Card.Image>
                <div className='container user-image-container'>
                    <img className='user-image' src={userInfo.imgUrl}/>
                </div>
            </Card.Image>
            <Card.MainContent>
                <div className='container user-info'>
                    <h3 className='font-lg mb2'>{userInfo.username}</h3>
                    <p className='font-sm mb2'>{userInfo.firstName + ' ' + userInfo.lastName}</p>
                </div>
            </Card.MainContent>
            <Card.Attribution>
                <div className='container user-status font-xs'>
                    <p>{userInfo.status}</p>
                </div>
            </Card.Attribution>
        </Card>
    );
};

export default UserCard;