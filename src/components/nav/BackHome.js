import { Link } from 'react-router-dom';
function BackHome() {
    return (
        <div>
            <Link to="/" className="nav-item">
                <li>voltar...</li>
            </Link>
        </div>
    )
}
export default BackHome