import './singleComicPage.scss';
import xMen from '../../../resources/img/x-men.png';
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useMarvelService from "../../../services/MarvelService";
import ErrorMessage from "../../ErrorMessage/errorMessage";
import Spinner from "../../spinner/Spinner";

const SingleComicPage = () => {
    const {comicId} = useParams();


    const [comic, setComic] = useState(null);

    const {loading, error, getComic}= useMarvelService();

    useEffect(()=>{
        updateChar();
    },[comicId])

    const updateChar = () =>{
        if (!comicId){
            return;
        }

        getComic(comicId)
            .then(onCharLoaded)
    }
    const onCharLoaded = (comic) => {
        setComic(comic)
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View comic={comic}/> : null;

    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({comic}) => {
    return (
        <>
            <img src={xMen} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">Hedge Knight II: Sworn Sword (2007) #1 (Yu Variant)</h2>
                <p className="single-comic__descr">description</p>
                <p className="single-comic__descr">144 pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">9.99$</div>
            </div>
            <Link to='/comics/' className="single-comic__back">Back to all</Link>
        </>
    )
}

export default SingleComicPage;