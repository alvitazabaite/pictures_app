import {useEffect, useRef, useState} from 'react';
import './PicturesList.css';
import PicturesCard from '../picturesCard';
import {PEXELS_DATA} from '../../utils/constants.js';


const PicturesList = () => {
    const [pictures, setPictures] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const fetchingRef = useRef(null);
    const [initialFavorites, setInitialFavorites] = useState([]);

    const fetchPictures = async () => {
        if (isLoading) return;
        try {
            setIsLoading(true);
            const response = await fetch(`${PEXELS_DATA.url}?query=${PEXELS_DATA.picturesType}&per_page=20&page=${page}&size=original`, {headers: {Authorization: PEXELS_DATA.apiKey}});
            const data = await response.json();
            setPictures(previousPictures => [...previousPictures, ...data.photos]);
            setPage(page + 1);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        async function initialFetch() {
            await fetchPictures();
            const favoriteId = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                favoriteId.push(key);
            }
            setInitialFavorites(favoriteId);
        }
        initialFetch();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(async (entries) => {
            if (entries[0].isIntersecting && !isLoading) {
                await fetchPictures();
            }
        }, {rootMargin: '100px'});
        if (fetchingRef.current) observer.observe(fetchingRef.current);
        return () => {
            if (fetchingRef.current) observer.unobserve(fetchingRef.current);
        };
    }, [isLoading, fetchingRef]);

    return (
        <div className='pictures-list'>
            {pictures.map((picture) => <PicturesCard key={picture.id} picture={picture} initialFavorites={initialFavorites}/>)}
            {(isLoading)
                ? <div className='pictures-scroll'></div>
                : <div className='pictures-fetch' ref={fetchingRef}/>}
        </div>
    )
}

export default PicturesList;