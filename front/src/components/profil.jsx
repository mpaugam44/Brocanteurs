import React from "react"
import { ReducerContext } from "./reducer/reducer";

const Profil = () => {
    const [state, dispatch] = React.useContext(ReducerContext)
    console.log(state)
    
    return (
        <div>
            <h2>Profil</h2>
        </div>
        );
};

export default Profil;