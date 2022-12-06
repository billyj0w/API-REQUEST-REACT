import { useEffect, useState } from "react";
import BackHome from "../nav/BackHome";
import Player from "./Player";
import './battle.css'

function Battle() {
    const [data, setData] = useState([])
    const [player1, setPlayer1] = useState([])
    const [player2, setPlayer2] = useState([])

    const url = 'https://pokeapi.co/api/v2/pokemon/?limit=151'
    const callData = () => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setData([data])
                console.log(data)
            }).catch((err) => console.log(err.message))
    }

    const callPlayer1 = (name) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then((res) => res.json())
            .then((data) => {
                setPlayer1([data])
                console.log(player2)
            }).catch((err) => console.log(err.message))
    }

    const callPlayer2 = (name) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then((res) => res.json())
            .then((data) => {
                setPlayer2([data])
                console.log(player1)
            }).catch((err) => console.log(err.message))
    }

    const handlePlayer1 = (e) => {
        let name = e.target.value;
        callPlayer1(name);
    }

    const handlePlayer2 = (e) => {
        let name = e.target.value;
        callPlayer2(name);
    }


    const pokemonList =
        data.map(({ results }) => {
            return (
                <ul>
                    {results.map((item, index) => {
                        return (
                            <>
                                <li>
                                    <p>{item.name}</p>
                                    <div>
                                        <button onClick={handlePlayer1} value={item.name}>Player 1</button>
                                        <button onClick={handlePlayer2} value={item.name}>Player 2</button>
                                    </div>
                                </li>
                            </>
                        )
                    })}
                </ul>
            )
        })

    const player1Status =
        player1.map(({ stats, types }) => {
            return (
                <>
                    <div className='status'>
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
        })

    const player2Status =
        player2.map(({ stats, types }) => {
            return (
                <>
                    <div className='status'>
                        {stats.map((stats) => {
                            return (
                                <div className='statusItem'>
                                    <p>{stats.base_stat}</p>
                                    <p>{stats.stat.name}</p>
                                </div>
                            )
                        })}
                    </div>
                </>
            )
        })

    const filtraPokemon = (inputValue) => {
        // let input = inputValue;
        // let filterData = null;
        // pokemonData.map(({ results }) => { return filterData = [results] })
        // console.log(filterData)
        // if (input != '') {
        //     const filteredData = filterData[0].filter((item) => {
        //         return Object.values(item).join('').toLowerCase().includes(input.toLowerCase())
        //     })
        //     setPokemonData(filteredData);
        // } if (input == '') {
        //     callPokemon();
        // } else {
        //     callPokemon();
        // }
    }

    useEffect(() => {
        callData();
    }, [])
    return (
        <div className="battle">
            <div className='button search'>

            </div>
            <div className='pokemonList button'>
                <div className="versus">
                    <Player data={player1} />
                    <h2>VS</h2>
                    <Player data={player2} />
                </div>
                <div className="pokemonList comparation">
                    <div className='pokemonCard'>
                        {player1Status}
                    </div>
                    <div className='pokemonCard'>
                        {player2Status}
                    </div>
                </div>
            </div>
                <div className='button search'>
                    <BackHome />
                    <input className='input' 
                    onChange={(e)=> filtraPokemon(e.target.value)}  
                    placeholder='pesquise um pokemon....' 
                    />
                </div>
                <div className='pokemonList button'>
                    {pokemonList}
                </div>
        </div>
    )
}
export default Battle