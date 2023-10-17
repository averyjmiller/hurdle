import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar-container">
            <header>
                <nav className="navbar">
                    <div className="navbar-logo">
                        <h1>Hurdle</h1>
                    </div>
                    <ul className="navbar-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/profiles/:profileId">Account</Link></li>
                        <li><Link to="/aboutUs">About Us</Link></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}


export default Navbar;
