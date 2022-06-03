//import hook react
import React, { useState, useEffect } from 'react';
//import hook useHitory from react router dom
import { useNavigate,Link  } from "react-router-dom";
//import axios
import axios from 'axios';
import { useLoadingContext } from "react-router-loading";

function Dashboard() {
    //state user
    const [data, setUser] = useState([]);
    //define navigate
    const navigate = useNavigate();
    //token
    const token = localStorage.getItem("token");
    //loading
    const loadingContext = useLoadingContext();

    //function "fetchData"
    const fetchDataUser = async () => {
  
        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch user from Rest API
        await axios.get('http://localhost:8000/api/userAll')
        .then((response) => {
            //set response user to state
            setUser(response.data);
            loadingContext.done();
        })
    }
    //hook useEffect
    useEffect(() => {
        //check token empty 
        if(!token) {

            alert('Harap login terlebih dahulu');
            //redirect login page
            navigate('/login');
        }
        fetchDataUser();
    }, []);
    return (
        <div className="container" style={{ marginTop: "50px",marginBottom: "50px" }}>
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card border-0 rounded shadow">
                    <div className="card-header">
                       <h4 className="fw-bold">Dashboard Users</h4>
                    </div>
                        <div className="card-body">
                        <Link to="/register" className="btn btn-outline-primary btn-sm">Tambah</Link><hr/>
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th scope="col">Name</th>
                                  <th scope="col">Email</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                              {data.map((item, i) => (
                                <tr key={i}>
                                  <td>{item.name}</td>
                                  <td>{item.email}</td>
                                  <td>
                                    <Link to="/editUser" className="btn btn-outline-info btn-sm">Edit</Link>&nbsp;
                                    <Link to="/deleteUser" className="btn btn-outline-danger btn-sm">Delete</Link>
                                  </td>
                                </tr>
                                ))}
                              </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;