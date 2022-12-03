import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Pokemon.css';

function PokemonInfo() {
    const location = useLocation()
    const { from } = location.state;

    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newUrl, setNewUrl] = useState(from)
    const [id, setId] = useState(null)

    const callPokemon = () => {
        fetch(newUrl)
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
            })
            .catch((err) => {
                setError(err.message);
            }).finally(() => {
                setLoading(false);
                newId();
            })
    }

    const handleNext = () => {
        newId();
        if (id == 151) {
            setNewUrl("https://pokeapi.co/api/v2/pokemon/1/")
        } else {
            setNewUrl("https://pokeapi.co/api/v2/pokemon/${id + 1}/")
        }
    }

    const handlePrevious = () => {
        newId();
        if (id == 1) {
            setNewUrl("https://pokeapi.co/api/v2/pokemon/151/")
        } else {
            setNewUrl("https://pokeapi.co/api/v2/pokemon/${id - 1}/")
        }
    }

    const newId = () => {
        pokemonData.map(({ id }) => {
            setId(id)
        })
        console.log(id);
    }

    useEffect(() => {
        callPokemon();
    }, [newUrl])
    return (
        <div>
            {loading && <div>Carregando dados...</div>}
            {
                error && (
                    <div>{`Tivemos um problema ao carregar os dados - ${error}`}</div>
                )
            }
            <div className='button search'>
                <Link to="/pokemon" className="button">
                    <li>voltar...</li>
                </Link>
                <button onClick={handlePrevious}>Previous</button>
                <button onClick={handleNext}>Next</button>
            </div>
            <div className='pokemonInfo'>
                <div className='pokemonCard'>
                    {pokemonData.map(({ name, sprites, stats, types }) => {
                        return (
                            <>
                                <div className='sprite'>
                                    <h3>{name}</h3>
                                    <img src={`${sprites.front_default}`} />
                                </div>
                                <div className='status'>
                                    <h3>Type</h3>
                                    {types.map(({ type }) => {
                                        return (
                                            <div className='statusItem'>
                                                <p>{type.name}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className='status'>
                                    <h3>Base Status</h3>
                                    {stats.map((stats) => {
                                        return (
                                            <div className='statusItem'>
                                                <p>{stats.stat.name}</p>
                                                <p>{stats.base_stat}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default PokemonInfo