import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Pokemon.css';

function PokemonInfo() {
    const location = useLocation()
    const { from } = location.state;

    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [id, setId] = useState(parseInt(from))

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
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
                console.log(data)
                setError(null)
            })
            .catch((err) => {
                setError(err.message);
            }).finally(() => {
                setLoading(false)
            })
    }

    const handleNext = () => {
        let newId = id;
        if (newId == 151) {
            setId(1)
        } else {
            setId(newId + 1)
        }
    }

    const handlePrevious = () => {
        let newId = id;
        if (newId == 1) {
            setId(151)
        } else {
            setId(newId - 1)
        }
    }


    useEffect(() => {
        callPokemon()
    }, [id])
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