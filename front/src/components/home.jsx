import React from "react"
import { ReducerContext } from "./reducer/reducer";

const Home = () => {
    const [state, dispatch] = React.useContext(ReducerContext)
    
    return (
       
        <div className = "Home_Container">
                
        </div>
        
        );
};

export default Home;