import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1>Bruno</h1>
            </div>
            <div className="navbar-right">
                {!user ? (
                    <>
                        <Link to="/cart">Cart</Link>
                        <Link to="/orders">Orders</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                ) : user.role === 'admin' ? (
                    <>
                        <button onClick={() => logout()}>Logout</button>
                        <button className="menu-toggle">☰</button>
                        <div className="admin-menu">
                            <Link to="/admin/manage-orders">Manage Orders</Link>
                            <Link to="/admin/manage-products">Manage Products</Link>
                            <Link to="/admin/manage-users">Manage Users</Link>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/cart">Cart</Link>
                        <Link to="/orders">Orders</Link>
                        <button onClick={() => logout()}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

