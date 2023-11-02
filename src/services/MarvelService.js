import {useHttp} from "../hook/http.hook";

const useMarvelService = ()=> {

    const {loading, request, error, clearError} = useHttp();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public'
    const _apiKey = 'apikey=20a1cc0ed2e38147717fd258c9cb3b94'
    const _baseOffset = 1545

    const getAllCharacters =  async (offset = _baseOffset) =>{
        const res = await request(`${_apiBase}/characters?limit=9&offset=${offset}?&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }
    const getCharacter = async (id)=>{
        const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0]);
    }
    const getAllComics = async ()=>{
        const res = await request(`${_apiBase}/comics?${_apiKey}`)
        return (res);
    }
    const _transformCharacter = (char) =>{
        return {
            id: char.id,
            name:char.name,
            description:char.description,
            thumbnail:`${char.thumbnail.path}.${char.thumbnail.extension}`,
            home : char.urls[0].url,
            wiki : char.urls[1].url,
            comics: char.comics.items
        }
    }

    return{loading, error, getAllCharacters, getCharacter, getAllComics, clearError}
}

export default useMarvelService