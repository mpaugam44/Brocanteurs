import React from "react"
import {initialState, reducer, ReducerContext} from "./reducer/reducer.jsx"

const Provider = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    
    return(
        <ReducerContext.Provider value={[state, dispatch]}>
            {children}
        </ReducerContext.Provider>
    )
}

// Le ReducerContext encadre tout le app.js et permet  aux composants enfants d'avoir accès à certianes données globales
// De ce fait nous n'avons pas à appeler chaque composant en props pour faire passer toutes les infos

export default Provider