import Card from './Card.jsx';

function UserCard({ username, firstName, lastName, status, src }) {
    return (
        <Card className='user-card'>
            <Card.Image>
                <div className='container user-image-container'>
                    <img className='user-image' src={src}/>
                </div>
            </Card.Image>
            <Card.MainContent>
                <div className='container user-info'>
                    <h3 className='font-lg mb2'>{username}</h3>
                    <p className='font-sm mb2'>{firstName + ' ' + lastName}</p>
                </div>
            </Card.MainContent>
            <Card.Attribution>
                <div className='container user-status font-xs'>
                    <p>{status}</p>
                </div>
            </Card.Attribution>
        </Card>
    );
};

export default UserCard;