import styles  from "../App.css"
import React from "react"
import { ReducerContext } from "./reducer/reducer";

const Home = () => {
    const [state, dispatch] = React.useContext(ReducerContext)
    
    return (
       
        <div className = "THEME">
            <h2>Home</h2>
        </div>
        
        );
};

export default Home;