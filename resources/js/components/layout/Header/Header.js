import "./header.css";
import {Link, NavLink} from 'react-router-dom';
import Login from "../../../pages/Login/Login";
import serviceForLogin from "../../../Services/serviceForLogin";
import {useEffect, useState} from 'react';
import {NavDropdown} from 'react-bootstrap';
function Header(){
    const [isLogin, setIsLogin] = useState(false);
    const [fullname, setFullname] = useState('');
    const [cartAmount, setcartAmount] = useState(0);
    useEffect(() => {
        const userLogin = sessionStorage.getItem('userLogin');
        if(sessionStorage.getItem('item_cart'))
        setcartAmount(Object.keys(JSON.parse(sessionStorage.getItem('item_cart'))).length);
        if(userLogin){
            setIsLogin(true);
            setFullname(userLogin);
        }
    }, []);

    const handleLogout = () => {
        const signOut = async () => {
            try {
                const response = await serviceForLogin.logout();
                    sessionStorage.removeItem('userLogin');
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('isLogin');
                    setIsLogin(false);
                    setFullname('');
                    navigate('/');
            } catch (error) {
                console.log(error);
            }
        }
        signOut();
    }
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
                        <NavLink className="nav-link" to="/cart">Cart({cartAmount})</NavLink>
                    </li>
                    <li className="nav-item">
                    {
                                isLogin ?
                                <>
                                    <NavDropdown title={fullname} id="collasible-nav-dropdown">
                                        <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                                :
                                <NavLink className="nav-link"><Login  text={'SignIn'}/></NavLink>
                    }
                       
                    </li>

                </ul>

            </div>
        </nav>
    );
}

export default Header;