import './Pokemon.css';
import BackHome from '../nav/BackHome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { data } from 'autoprefixer';

function Pokemon() {
    const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon/?limit=20`);
    const [input, setInput] = useState('')
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const callPokemon = () => {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    )
                }
                return response.json()
            })
            .then((data) => {
                setPokemonData([data])
                setError(null)
                // console.log(data)
            })
            .catch((err) => {
                setError(err.message);
            }).finally(() => {
                setLoading(false)
            })
    }

    const nextPokemon = () => {
        let newUrl = null;
        pokemonData.map(next => {
            return newUrl = next.next
        })
        if (newUrl == null) {
            return
        } else {
            setUrl(newUrl)
        }
    }
    const previousPokemon = () => {
        let newUrl = null;
        pokemonData.map(previous => {
            return newUrl = previous.previous
        })
        if (newUrl == null) {
            return
        } else {
            setUrl(newUrl)
        }
    }

    // const filtraPokemon = (inputValue) => {
    //     let input = inputValue;
    //     let filterData = null;
    //     pokemonData.map(({ results }) => {return filterData = [results]})
    //     console.log(filterData)
    //     if(input != ''){
    //         const filteredData = filterData[0].filter((item)=>{
    //             return Object.values(item).join('').toLowerCase().includes(input.toLowerCase())
    //           })
    //         setPokemonData(filteredData);
    //     }if(input == ''){
    //         callPokemon();
    //     }else{
    //         callPokemon();
    //     }
    // }

    useEffect(() => {
        callPokemon();
    }, [url])
    return (
        <div className="pokemon">
            {loading && <div>Carregando dados...</div>}
            {
                error && (
                    <div>{`Tivemos um problema ao carregar os dados - ${error}`}</div>
                )
            }
            <div className='button search'>
                <BackHome />
                {/* <input className='input' 
                    onChange={(e)=> filtraPokemon(e.target.value)}  
                    placeholder='pesquise um pokemon....' 
                    /> */}
                <button onClick={previousPokemon}>Back</button>
                <button onClick={nextPokemon}>Next</button>
            </div>
            <div className='pokemonList button'>
                <ul>
                    {pokemonData.map(({ results }) => {
                        return (
                            <>
                                {results.map((pokemon, index) => {
                                    return <li key={pokemon.name + index}>
                                        <p>{pokemon.name}</p>
                                        <Link 
                                        to={`/pokemon/info`} 
                                        state={{ from: `${pokemon.url}`, name: `${pokemon.name}` }}
                                        >
                                            <button>Ver mais...</button>
                                        </Link>
                                    </li>
                                })}
                            </>
                        )
                    })}
                </ul>
            </div>
            <div className='button'>
                <button onClick={previousPokemon}>Back</button>
                <button onClick={nextPokemon}>Next</button>
            </div>
        </div >
    )
}

export default Pokemon;