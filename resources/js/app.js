/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from "react-router-dom";
import { Routes, Route } from "react-router-loading";

import DashboardUmum from "./components/dashboard";

import UserLogin from "./components/User/Login";
import Register from "./components//User/Register";
import DashboardUser from "./components//User/DashboardUser";

import Navbar from "./components/Menu/Menu";

function MyApp() {
    return (

    	<>
        <div className="container" style={{maxWidth: "100%", padding: "0px"}}>
		    <Navbar />

	        <Routes>
	            <Route path="/dashboard" element={<DashboardUmum /> } loading/>
                <Route path="/" element={<DashboardUmum /> } loading/>

            {/*USER*/}
                <Route path="/user" element={<DashboardUser /> } loading />
                <Route path="/login" element={<UserLogin /> } loading />
                <Route path="/register" element={<Register /> } loading />
	        </Routes>
        </div>
        </>

    );
}

export default MyApp;

if (document.getElementById('app')) {
    ReactDOM.render(
        <BrowserRouter>
            <MyApp />
        </BrowserRouter>
    , document.getElementById('app'));
}
