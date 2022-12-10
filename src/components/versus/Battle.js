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
            }).catch((err) => console.log(err.message))
    }

    const callPlayer1 = (name) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then((res) => res.json())
            .then((data) => {
                setPlayer1([data])
                console.log(player1)
            }).catch((err) => console.log(err.message))
    }

    const callPlayer2 = (name) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then((res) => res.json())
            .then((data) => {
                setPlayer2([data])
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
        player1.map(({ stats }) => {
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
        player2.map(({ stats }) => {
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

    const filtraPokemon = (e) => {

    }

    let hpPlayer1 = player1.map(({ stats }) => { return parseInt(stats[0].base_stat) })
    let attackPlayer1 = player1.map(({ stats }) => { return parseInt(stats[1].base_stat) })
    let defensePlayer1 = player1.map(({ stats }) => { return parseInt(stats[2].base_stat) })
    let specialAttackPlayer1 = player1.map(({ stats }) => { return parseInt(stats[3].base_stat) })
    let specialDefensePlayer1 = player1.map(({ stats }) => { return parseInt(stats[4].base_stat) })
    let speedPlayer1 = player1.map(({ stats }) => { return parseInt(stats[5].base_stat) })
    let mediaPlayer1 = (hpPlayer1 + attackPlayer1 + 
        defensePlayer1 + specialAttackPlayer1 + 
        specialDefensePlayer1 + speedPlayer1) / 6;


    let hpPlayer2 = player2.map(({ stats }) => { return parseInt(stats[0].base_stat) })
    let attackPlayer2 = player2.map(({ stats }) => { return parseInt(stats[1].base_stat) })
    let defensePlayer2 = player2.map(({ stats }) => { return parseInt(stats[2].base_stat) })
    let specialAttackPlayer2 = player2.map(({ stats }) => { return parseInt(stats[3].base_stat) })
    let specialDefensePlayer2 = player2.map(({ stats }) => { return parseInt(stats[4].base_stat) })
    let speedPlayer2 = player2.map(({ stats }) => { return parseInt(stats[5].base_stat) })
    let mediaPlayer2 = (hpPlayer2 + attackPlayer2 + 
        defensePlayer2 + specialAttackPlayer2 + 
        specialDefensePlayer2 + speedPlayer2) / 6;

let colorPlayer1 = mediaPlayer1 > mediaPlayer2 ? '#b6efa0' : mediaPlayer1 < mediaPlayer2 ? '#ff4747' : '#fff'
let colorPlayer2 = mediaPlayer2 > mediaPlayer1 ? '#b6efa0' : mediaPlayer2 < mediaPlayer1 ? '#ff4747' : '#fff'
    useEffect(() => {
        callData();
    }, [])
    return (
        <div className="battle">
            <div className='button search'>

            </div>
            <div className='pokemonList button'>
                <div className="versus">
                    <Player data={player1} color={colorPlayer1}/>
                    <h2>VS</h2>
                    <Player data={player2} color={colorPlayer2}/>
                </div>
                <div className="pokemonList comparation">
                    <div className='pokemonCard' style={{ backgroundColor: `${colorPlayer1}` }}>
                        {player1Status}
                    </div>
                    <div className='pokemonCard' style={{ backgroundColor: `${colorPlayer2}` }}>
                        {player2Status}
                    </div>
                </div>
            </div>
            <div className='button search'>
                <BackHome />
                <input className='input'
                    onChange={(e) => filtraPokemon(e.target.value)}
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