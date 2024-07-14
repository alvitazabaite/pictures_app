import './PicturesCard.css';
import {useEffect, useState} from 'react';


const PicturesCard = ({picture, initialFavorites}) => {
    const [isFavorite, setIsFavorite] = useState(initialFavorites.includes(picture.id.toString()));

    useEffect(() => {
        setIsFavorite(initialFavorites.includes(picture.id.toString()));
    }, [initialFavorites, picture]);

    const handleClick = () => {
        if (isFavorite) localStorage.removeItem(picture.id.toString());
        else localStorage.setItem(picture.id.toString(), picture.alt);
        setIsFavorite(!isFavorite);
    }

    return (
        <div className='picture-card'>
            <img src={picture.src.large} alt={picture.alt}/>
            <div className='picture-details'>
                <div className='tooltip-container'>
                    <h3 className='picture-name'>{picture.alt}</h3>
                    <span className='tooltip-text'>{picture.alt}</span>
                </div>
                <div className='separator'/>
                <p className='picture-photographer'>{picture.photographer}</p>
                <button
                    className={isFavorite ? 'picture-favorite active' : 'picture-favorite'} onClick={handleClick}>
                    {isFavorite ? 'Remove' : 'Favourite'}
                </button>
            </div>
        </div>
    );
}

export default PicturesCard;
