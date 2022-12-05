import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Items.css';
import BackHome from '../nav/BackHome';

function ItemsInfo() {
    const location = useLocation()
    const { from } = location.state;
    const { name } = location.state;
    return (
        <div className="itemsInfo">
            <div className='button search'>
                <Link to="/items" className="button">
                    <li>voltar...</li>
                </Link>
                <button onClick=''>Back</button>
                <button onClick=''>Next</button>
            </div>
            {name}
        </div>
    )
}
export default ItemsInfo;