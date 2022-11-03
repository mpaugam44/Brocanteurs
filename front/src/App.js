import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import BASE_URL from "./config.js"
import Nav from "./components/nav"
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
