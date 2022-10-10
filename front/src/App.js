//import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import logo from './logo.svg';
import './App.css';
//import {ReducerContext} from "./components/reducer/reducer"
//import { useEffect, useContext } from 'react';
import BASE_URL from "./config.js"
//import Register from "./components/register"
import Nav from "./components/nav"
//import Login from "./components/login"
//import Home from "./components/home"
import Router from './components/router.jsx'



function App() {
    



  return (
      
     <BrowserRouter>
        <Nav />
        <Router />
     </BrowserRouter>

  );

}

export default App;
