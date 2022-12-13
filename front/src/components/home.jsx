import React from "react"
import { ReducerContext } from "./reducer/reducer";

const Home = () => {
    const [state, dispatch] = React.useContext(ReducerContext)
    
    return (
       
        <div className = "Home_Container">
                
            <h1>Le Bazar du Web</h1>
            
            <p> Retrouvez vous ici entre passionés du son pour un chinage digital 
            dans le microcosme de la Brocante</p>
        </div>
        
        );
};

export default Home;