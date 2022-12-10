import './Nav.css'
import {Link} from 'react-router-dom';
function Nav () {
    return(
        <div className='nav'>
            <ul>
                <Link to="/pokemon" className="button">
                    <li>Pokemon</li>
                </Link>
                <Link to="/items" className="button">
                    <li>Items</li>
                </Link>
                <Link to="/battle" className="button">
                    <li>Battle</li>
                </Link>
            </ul>
            <ul>
                <Link to="/city" className="button" style={{pointerEvents: 'none'}}>
                    <li>City</li>
                </Link>
                <Link to="/gym" className="button" style={{pointerEvents: 'none'}}>
                    <li>Gym</li>
                </Link>
            </ul>
        </div>
    )
}
export default Nav