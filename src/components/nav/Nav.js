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
                <Link to="/city" className="button">
                    <li>City</li>
                </Link>
                <Link to="/gym" className="button">
                    <li>Gym</li>
                </Link>
            </ul>
        </div>
    )
}
export default Nav