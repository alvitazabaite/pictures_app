import {useEffect, useState} from 'react';
import './picturesList.css';
import PicturesCard from "./PicturesCard.jsx";


const API_KEY = 'wDnbryKKu8u0VCS2ptyAYr91edK0gFWqDLJ9Ei2tpffX8Ej8sVcVbbTC';
const PICTURES_TYPE = 'nature';
const PICTURES_QUANTITY = 20;

const PicturesList = () => {
    const [pictures, setPictures] = useState([]);

    useEffect(() => {
        const fetchPictures = async () => {
            try {
                const response = await fetch(`https://api.pexels.com/v1/search?query=${PICTURES_TYPE}&per_page=${PICTURES_QUANTITY}&page=1&size=original`, {
                    headers: {
                        Authorization: API_KEY
                    }
                })
                const data = await response.json();
                setPictures(data.photos);
            } catch (error) {
                console.error(error);
            }
        }
        fetchPictures();
    }, []);

    return (
        <div className='picture-list'>
            {pictures.map(picture => <PicturesCard key={picture.id} picture={picture}/>)}
        </div>
    )
}

export default PicturesList;
