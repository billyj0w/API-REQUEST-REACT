import './Nav.css'
import {Link} from 'react-router-dom';
function Nav () {
    return(
        <div className='nav'>
            <ul>
                <Link to="/pokemon" className="nav-item">
                    <li>Pokemon</li>
                </Link>
                <Link to="/city" className="nav-item">
                    <li>City</li>
                </Link>
                <Link to="/gym" className="nav-item">
                    <li>Gym</li>
                </Link>
                <Link to="/items" className="nav-item">
                    <li>Items</li>
                </Link>
            </ul>
        </div>
    )
}
export default Nav