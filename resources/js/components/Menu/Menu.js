import React from "react";
import {Link, useNavigate} from "react-router-dom";
import { useLoadingContext } from "react-router-loading";

//import axios
import axios from 'axios';

function Navbar() {
    //token
    const token = localStorage.getItem("token");
    //define navigate
    const navigate = useNavigate();

    const isLoggedIn = token;
    //loading
    const loadingContext = useLoadingContext();

    const renderAuthButton = () => {
      if (isLoggedIn) {
        return <button onClick={logoutHanlder} className="nav-link btn btn-outline-danger btn-sm">LOGOUT</button>;
      } else {
        return <button className="nav-link btn btn-outline-success btn-sm"><Link to="/login" style={{"textDecoration":"none"}}>LOGIN</Link></button>;
      }
    }

    if (token) {
        const parseJwt = (token) => {
              try {
                return JSON.parse(atob(token.split('.')[1]));
              } catch (e) {
                return null;
              }
            };
        
        const decodedJwt = parseJwt(token);

        if (decodedJwt.exp * 1000 < Date.now()) {
          localStorage.removeItem("token")
          navigate('/login');
          loadingContext.done();
        }
    }

     //function logout
    const logoutHanlder = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch Rest API
        await axios.post('http://localhost:8000/api/logout')
        .then((response) => {
            switch(response.data.kode){
                case"1":
                    alert('Berhasil Logout')
                    //remove token from localStorage
                    localStorage.removeItem("token");
                    navigate('/login');
                    loadingContext.done();
                break;
                case"2":
                    alert('Gagal Logout')
                break;
                default:
                    alert('Kesalahan Tidak diketahui');
                break;
            }
        });
    };
    return (
             <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd"}}>
                <Link to="/dashboard" className="navbar-brand">Putiratu</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/dashboard" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/user">User</Link>
                        </li>
                        
                    </ul>
                    {renderAuthButton()}
                </div>
            </nav>
    );
};

export default Navbar;