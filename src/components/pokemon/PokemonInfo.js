import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Pokemon.css';

function PokemonInfo() {
    const location = useLocation()
    const { from } = location.state;
    const { name } = location.state;

    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newUrl, setNewUrl] = useState(from);

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
                // console.log(data)
                setError(null)
            })
            .catch((err) => {
                setError(err.message);
            }).finally(() => {
                setLoading(false);
            })
    }


    const handleNext = (e) => {
        let id = parseInt(e.target.value)
        if (id == 151) {
            setNewUrl("https://pokeapi.co/api/v2/pokemon/1/");
        } else {
            setNewUrl(`https://pokeapi.co/api/v2/pokemon/${id + 1}/`)
        }
    }

    const handlePrevious = (e) => {
        let id = e.target.value
        if (id == 1) {
            setNewUrl("https://pokeapi.co/api/v2/pokemon/151/")
        } else {
            setNewUrl(`https://pokeapi.co/api/v2/pokemon/${id - 1}/`)
        }
    }

    useEffect(() => {
        callPokemon();
    }, [newUrl]);
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
                    <li>Home...</li>
                </Link>
                {pokemonData.map(({ id }) => {
                    return (
                        <>
                            <button onClick={handlePrevious} value={id}>Previous</button>
                            <button onClick={handleNext} value={id}>Next</button>
                        </>
                    )
                }
                )}
            </div>
            <div className='pokemonInfo'>
                <div className='pokemonCard'>
                    {pokemonData.map(({ name, sprites, stats, types, id }) => {
                        return (
                            <>
                                <div className='sprite' key={id}>
                                    <h3>{name}</h3>
                                    <img src={`${sprites.front_default}`} />
                                </div>
                                <div className='status'>
                                    <h3>Type</h3>
                                    {types.map(({ type }) => {
                                        return (
                                            <div className='statusItem'>
                                                <p key={type.name}>{type.name}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className='status'>
                                    <h3>Base Status</h3>
                                    {stats.map((stats) => {
                                        return (
                                            <div className='statusItem'>
                                                <p key={stats.stat.name}>{stats.stat.name}</p>
                                                <p key={stats.base_stat}>{stats.base_stat}</p>
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