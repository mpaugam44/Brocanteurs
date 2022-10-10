import React from "react"
import { ReducerContext } from "./reducer/reducer";

const Admin = () => {
    const [state, dispatch] = React.useContext(ReducerContext)
    console.log(state)
    
    return (
        <div>
            <h2>Admin</h2>
        </div>
        );
};

export default Admin;