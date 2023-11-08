import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import {useState} from "react";

const MainPage = () =>{
    const [selectedChar, setChar] = useState(null)
    const onCharSelected = (id) => {
        setChar(id)
    }

    return(
        <>
            <RandomChar/>
            <div className="char__content">
                <CharList onCharSelected={onCharSelected}/>
                <CharInfo charId={selectedChar}/>
            </div>
        </>
    )
}
export default MainPage;