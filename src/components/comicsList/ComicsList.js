import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";

const ComicsList = () => {


    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(20);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error,getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(true) : setNewItemLoading(false)
        setNewItemLoading(true)

        getAllComics(offset)
            .then(onComicsListLoaded)
    }



    const onComicsListLoaded = (newComicsList) => {

        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList( comicsList=>[...comicsList, ...newComicsList])
        setNewItemLoading(newItemLoading=> false)
        setOffset(offset=> offset + 8 )
        setComicsEnded(charEnded=>ended)
    }


    function renderItems(arr) {
        const items =  arr.map((item, i) => {

            return (
                <li className="comics__item">
                    <a href="#">
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.prices}</div>
                    </a>
                </li>
            )
        });
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);

    return (
        <div className="comics__list">
            {items}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;