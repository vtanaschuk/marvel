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
    const getAllComics = async (offset = 0)=>{
        const res = await request(`${_apiBase}/comics?limit=8&offset=${offset}&${_apiKey}`)
        return (res.data.results.map(_transformComics));

    }
    const _transformCharacter = (char) =>{
        return {
            id: char.id,
            name:char.name,
            description:char.description,
            thumbnail:`${char.thumbnail.path}.${char.thumbnail.extension}`,
            home : char.urls[0].url,
            wiki : char.urls[1].url,
            comics: char.comics.items,
        }
    }

    const _transformComics = (comics) =>{
        return {
            id: comics.id,
            title:comics.title,
            thumbnail: `${comics?.thumbnail?.path}.${comics?.thumbnail?.extension}`,
            prices: comics.prices[0].price
        }
    }

    return{loading, error, getAllCharacters, getCharacter, getAllComics, clearError}
}

export default useMarvelService