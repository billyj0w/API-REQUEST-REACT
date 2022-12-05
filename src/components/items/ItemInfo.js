import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Items.css';

function ItemsInfo() {
    const location = useLocation()
    const { from } = location.state;
    const [urlItemInfo, setUrlItemInfo] = useState(from);
    const [itemInfoData, setItemInfoData] = useState([])

    const callItemInfo = () => {
        fetch(urlItemInfo)
            .then((res) => res.json())
            .then((data) => {
                setItemInfoData([data])
            })
    }

    const name = itemInfoData.map((name) => {
        return name.name
    })

    const img = itemInfoData.map(({ sprites }) => {
        return <img src={sprites.default} />
    })
    const desc = itemInfoData.map(({ flavor_text_entries }) => {
        return flavor_text_entries[0].text
    })
    let id = itemInfoData.map((item) => {
        return item.id
    })

    const handleNext = () => {
        if (id == 1) {
            return
        } else {
            setUrlItemInfo(`https://pokeapi.co/api/v2/item/${parseInt(id) + 1}/`)
        }
    }

    const handlePreview = () => {
        if (id == 1) {
            return
        } else {
            setUrlItemInfo(`https://pokeapi.co/api/v2/item/${parseInt(id) - 1}/`)
        }
    }

    useEffect(() => {
        callItemInfo();
    }, [urlItemInfo])
    return (
        <div className="itemsInfo">
            <div className='button search'>
                <Link to="/items" className="button">
                    <li>voltar...</li>
                </Link>
                <button onClick={handlePreview}>Back</button>
                <button onClick={handleNext}>Next</button>
            </div>
            <div className='itemCard'>
                <div className='spriteItem' key={id}>
                    <p>{id} - {name}</p>
                    {img}
                </div>
                <p>{desc}</p>
            </div>
        </div>
    )
}
export default ItemsInfo;