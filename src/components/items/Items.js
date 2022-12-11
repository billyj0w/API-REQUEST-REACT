import './Items.css';
import BackHome from '../nav/BackHome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function Items() {

    const [urlItem, setUrlItem] = useState(`https://pokeapi.co/api/v2/item/`);
    const [itemData, setItemData] = useState([]);
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const callItem = () => {
        fetch(urlItem)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    )
                }
                return response.json()
            })
            .then((data) => {
                setItemData([data])
                setError(null)
            })
            .catch((err) => {
                setError(err.message);
            }).finally(() => {
                setLoading(false)
            })
    }

    const nextItem = () => {
        let newUrl = null;
        itemData.map(next => {
            return newUrl = next.next;
        })
        if (newUrl == null) {
            return
        } else {
            setUrlItem(newUrl)
        }
    }

    const previousItem = () => {
        let newUrl = null;
        itemData.map(previous => {
            return newUrl = previous.previous;
        })
        if (newUrl == null) {
            return
        } else {
            setUrlItem(newUrl)
        }
    }
    useEffect(() => {
        callItem();
    }, [urlItem])

    return (
        <div className="item">
            {loading && <div>Carregando dados...</div>}
            {
                error && (
                    <div>{`Tivemos um problema ao carregar os dados - ${error}`}</div>
                )
            }
            <div className='button search'>
                <BackHome />
                <input className='input' 
                placeholder='Search a item...'
                onChange={(e)=> setInput(e.target.value)}
                />
                <button onClick={previousItem}>Back</button>
                <button onClick={nextItem}>Next</button>
            </div>
            <div className='pokemonList button'>
                <ul>
                    {
                        itemData.map((item) => {
                            return item.results.filter(item=> item.name.includes(`${input}`)).map((itemName) => {
                                return (
                                    <>
                                        <li key={item.name+item.url}>
                                            <p>{itemName.name}</p>
                                            <Link
                                                to={`/items/info`}
                                                state={{
                                                    from: `${itemName.url}`,
                                                    name: `${itemName.name}`
                                                }}>
                                                <button>Ver mais...</button>
                                            </Link>
                                        </li>
                                    </>
                                )
                            })
                        })
                    }
                </ul>
            </div>
            <div className='button search'>
                <button onClick={previousItem}>Back</button>
                <button onClick={nextItem}>Next</button>
            </div>
        </div>
    )
}

export default Items;;