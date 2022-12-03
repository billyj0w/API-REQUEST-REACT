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
                setError(null)
            })
            .catch((err) => {
                setError(err.message);
            }).finally(() => {
                setLoading(false)
            })
    }

    const handleNext = () => {
        let newId =  id;
        if(newId == 151){
            setId(1)
        }else{
            setId(newId + 1)
        }
    }

    const handlePrevious = () => {
        let newId =  id;
        if(newId == 1){
            setId(151)
        }else{
            setId(newId - 1)
        }
    }


    useEffect(() => {
        callPokemon()
    }, [id])
    return (
        <div className="pokemonInfo">
            {loading && <div>Carregando dados...</div>}
            {
                error && (
                    <div>{`Tivemos um problema ao carregar os dados - ${error}`}</div>
                )
            }
            <Link to="/pokemon" className="nav-item">
                <li>voltar...</li>
            </Link>
            <h1>Pokemon Info</h1><br/>
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
            {pokemonData.map(({name, sprites, stats, types})=>{
                return (
                    <>
                        <h4>{name}</h4>
                        <img src={`${sprites.front_default}`}/>
                        <p>Type(s)</p>
                        <ul>
                            {types.map(({type})=>{
                                return <li>{type.name}</li>
                            })}
                        </ul>
                        <p>Base Status</p>
                        <ul>
                            {stats.map((stats)=>{
                                return(
                                    <>
                                        <li>{stats.base_stat} --- {stats.stat.name}</li>
                                    </>
                                )
                            })}
                        </ul>
                    </>
                    )
            })}
        </div>
    )
}
export default PokemonInfo