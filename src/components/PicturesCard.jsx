import './picturesCard.css';

const PicturesCard = ({picture}) => {
    return (
        <div className='pictures-card'>
            <img src={`${picture.src.large}`} alt=''/>
        </div>
    )
}

export default PicturesCard;
