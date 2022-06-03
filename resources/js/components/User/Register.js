//import hook react
import React, { useState, useEffect,Component } from 'react';
//import hook useHitory from react router dom
import { useNavigate } from 'react-router-dom';
import { useLoadingContext } from "react-router-loading";
//import axios
import axios from 'axios';
//select
import Select from 'react-select';

function Register() {

    //define state
    const [name, setName] = useState("");   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    //define state validation
    const [validation, setValidation] = useState([]);
    //define failed or success insert
    const [failorsucc, setFailorSucc] = useState([]);

    //define usergroup
    const [usergroupdata, GetUsergroup] = useState([]);
    
    //define history
    const navigate = useNavigate();
    //loading
    const loadingContext = useLoadingContext();
    //token
    const token = localStorage.getItem("token");

    //hook useEffect
    useEffect(() => {

        //check token empty 
        if(!token) {

            alert('Harap login terlebih dahulu');
            //redirect login page
            navigate('/login');
        }
        loadingContext.done();
        fetchUsergroup()
    }, []);

    //function "registerHanlder"
    const registerHandler = async (e) => {
        e.preventDefault();
        
        //initialize formData
        const formData = new FormData();

        //append data to formData
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', passwordConfirmation);

        //send data to server
        await axios.post('http://localhost:8000/api/register', formData)
        .then((response) => {
            switch(response.data.kode){
                case"1":
                    setValidation(response.data.pesan);
                break;
                case"2":
                    setFailorSucc(response.data);
                break;
                case"3":
                    setFailorSucc(response.data);
                break;
                default:
                    alert('Kesalahan Tidak diketahui');
            }
            //navigate('/');
        })
        .catch((error) => {
            alert('Terjadi Kesalahan #45j3h')
        })
    };
    //for status fail or not 
    const RenderStatus = (a) => {
        if (a.kode == "2") {
            return <div className="alert alert-success">{a.pesan}</div>
        }else if(a.kode == "3"){
            return <div className="alert alert-danger">{a.pesan}</div>
        }
    }

    //function "fetchData"
    const fetchUsergroup = async () => {
        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch user from Rest API
        await axios.get('http://localhost:8000/api/usergroup')
        .then((response) => { 
            GetUsergroup(response.data.isi)
        })
    }

    //list option for usergroup
    const arr = {}
    Object.keys(usergroupdata).forEach(function(key) {
      const arr = [usergroupdata[key].id, usergroupdata[key].name];
    });


      // { value: 'chocolate', label: 'Chocolate' },
      // { value: 'strawberry', label: 'Strawberry' },
      // { value: 'vanilla', label: 'Vanilla' }
    console.log(JSON.stringify(arr))

    // const MyComponent = () => (
    //   <Select options={options} />
    // )

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row justify-content-center">
                <div className="col-md-10">
                <div className="card border-0 rounded shadow">
                    <div className="card-header bg-info">
                       <h4 className="fw-bold">HALAMAN REGISTER</h4>
                    </div>
                    <div className="card-body">

                    {RenderStatus(failorsucc)}

                        <form onSubmit={registerHandler}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">NAMA LENGKAP</label>
                                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan Nama Lengkap"/>
                                    </div>
                                    {
                                    validation.name && (
                                        <div className="alert alert-danger">
                                            {validation.name[0]}
                                        </div>
                                    )
                                    }
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">ALAMAT EMAIL</label>
                                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan Alamat Email"/>
                                    </div>
                                    {
                                        validation.email && (
                                            <div className="alert alert-danger">
                                                {validation.email[0]}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">PASSWORD</label>
                                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password"/>
                                    </div>
                                    {
                                        validation.password && (
                                            <div className="alert alert-danger">
                                                {validation.password[0]}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">KONFIRMASI PASSWORD</label>
                                        <input type="password" className="form-control" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Masukkan Konfirmasi Password"/>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Usergroup</label>
                                        {/*{MyComponent()}*/}
                                    </div>
                                </div>

                            </div>
                            <button type="submit" className="btn btn-primary" style={{"float": "right"}}>REGISTER</button>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Register;