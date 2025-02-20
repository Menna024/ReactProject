import './Navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContext';
import { useEffect, useContext } from 'react';

const Navbar = () => {
    const token = useContext(TokenContext);
    const navigate = useNavigate();

    function goToRegister() {
        navigate('/register');
    }

    function goToLogin() {
        navigate('/login');
    }

    useEffect(() => {
        console.log('token:', token);
        console.log('token.Token:', localStorage.getItem('token'));
    }, [token]);

    return (
        <div className="navbar">
            <h1 className="site-name">Fresh Cart</h1>
            {(token ||  localStorage.getItem('token'))  && console.log('token:', token)}
            {(token.Token ||  localStorage.getItem('token'))&&
                <div className="nav-links">
                    <NavLink to="/home" className="nav-link">Home</NavLink>
                    <NavLink to="/products" className="nav-link">Products</NavLink>
                    <NavLink to="/cart" className="nav-link">Cart</NavLink>
                    <NavLink to="/wishlist" className="nav-link">WishList</NavLink>
                    <NavLink to="/categories" className="nav-link">Categories</NavLink>
                    <NavLink to="/brands" className="nav-link">Brands</NavLink>
                </div>
            }
            {!(token.Token ||  localStorage.getItem('token')) &&
            <div className='sign-btns' >
                    <button className="signup-btn" onClick={goToRegister}>Register</button>
                    <button className="login-btn" onClick={goToLogin}>Log In</button>
                </div>
            }

            {
                (token.Token ||  localStorage.getItem('token')) &&
                <div className='sign-btns'>
                    <button className="logout-btn" onClick={() => {
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        token.setToken('');
                        navigate('/login');                        
                    }}>Log Out</button>
                </div>
            }
        </div>
    );
};

export default Navbar;