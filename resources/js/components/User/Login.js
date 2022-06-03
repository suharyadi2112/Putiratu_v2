import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useLoadingContext } from "react-router-loading";

//import bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate  } from "react-router-dom";

//import axios
import axios from 'axios';

function Render() {

	 //define state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //define state validation
    const [validation , setValidation] = useState([]);
    //define navigate
    const navigate = useNavigate();
    //loading
    const loadingContext = useLoadingContext();
    //hook useEffect
    useEffect(() => {

        //check token
        if(localStorage.getItem('token')) {

            //redirect page dashboard
            //history.push('/dashboard');
            navigate('/dashboard');
        }
        loadingContext.done();
    }, []);
    //function "loginHanlder"
    const loginHandler = async (e) => {
        e.preventDefault();
        //initialize formData
        const formData = new FormData();
        //append data to formData
        formData.append('email', email);
        formData.append('password', password);
        //send data to server
        await axios.post('http://localhost:8000/api/login', formData)
        .then((response) => {

        	switch(response.data.hasil){
                case"4":
                    alert('Failed!! you not Admin')
                    navigate('/dashboard');
                break;
        		case"1":
        			setValidation(response.data.message);
        		break;
		        case"2":
            		setValidation(response.data);
        		break;
        		case"3":
        			alert('Berhasil Login')
        			//set token on localStorage
            		localStorage.setItem('token', response.data.token);
		            //redirect to dashboard
		            navigate('/dashboard');
		        break;
        		default:
        			alert('Kesalahan Tidak diketahui');
        	}
        	//loading selesai
        	loadingContext.done();
        })
        .catch((error) => {
        	console.log(error);
        	alert("Kesalahan tidak diketahui");	
        })
    };

    return (
            <div className="row justify-content-center pt-5">
            <div className="card col-md-4 p-0">
              	<div className="card-header">
				   Login Admin Putiratu
				 </div>
  				<div className="card-body">
		            <form onSubmit={loginHandler}>
					  	{
	                        validation.message && (
	                            <div className="alert alert-danger">
	                                {validation.message}
	                            </div>
	                        )
                        }
					  	<div className="form-group">
					    	<label>Email address</label>
					    	<input type="email" name="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" placeholder="Enter email"/>
					  	</div>
					  	{
                        	validation.email && (
	                            <div className="alert alert-danger">
	                                {validation.email[0]}
	                            </div>
	                        )
	                    }
					  	<div className="form-group">
					    	<label>Password</label>
					    	<input type="password" name="password"  className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
					  	</div>
					  	{
                            validation.password && (
                                <div className="alert alert-danger">
                                    {validation.password[0]}
                                </div>
                            )
                        }
					  	<button type="submit" className="btn btn-primary">Submit</button>
					</form>
		            </div>
	            </div>
            </div>
    );

}

export default Render;