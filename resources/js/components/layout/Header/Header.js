import "./header.css";
import {Link, NavLink} from 'react-router-dom';

function Header(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top px-5">
            <Link className="navbar-brand" to="/">Logo</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/shop">Shop</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/cart">Cart(0)</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="#">Sign in</NavLink>
                    </li>

                </ul>

            </div>
        </nav>
    );
}

export default Header;