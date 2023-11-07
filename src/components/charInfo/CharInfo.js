import {useState, useEffect} from "react";
import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from "../ErrorMessage/errorMessage";
import Spinner from "../spinner/Spinner";
import PropTypes from 'prop-types';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {loading, error, getCharacter}= useMarvelService();

    useEffect(()=>{
        updateChar();
    },[props.charId])

    const updateChar = () =>{
        const {charId} = props
        if (!charId){
            return;
        }

        getCharacter(charId)
            .then(onCharLoaded)
    }
    const onCharLoaded = (char) => {
        setChar(char)
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;
    return (
        <div className="char__info">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}
const View  = ({char}) => {
    const comics = char.comics.map((item, i )=>{
        if( i > 2 ) return;
        return (
            <li className="char__comics-item">
                <a href={item.resourceURI}>{item.name}</a>
            </li>
        )
    })
    return(
        <>
            <div className="char__basics">
                <img src={char.thumbnail} alt="abyss"/>
                <div>
                    <div className="char__info-name">{char.name}</div>
                    <div className="char__btns">
                        <a href={char.home} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={char.wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {char.description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics}
            </ul>
        </>
    )
}
CharInfo.propTypes = {
    charId: PropTypes.number
}
export default CharInfo;