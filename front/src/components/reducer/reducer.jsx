import React from "react"
import {LOGIN, LOGOUT, ADMIN} from '../../config/constante.js'

export const initialState = {
    login: false,
    admin:false
}

export const reducer = (state, action) => {
    switch(action.type){
        case LOGIN :
            return {...state, login:true}
        case ADMIN :
            return {...state, admin:true}
        case LOGOUT :
            return {...state, login:false,  admin:false}
        default: return state 
    }
}


export const ReducerContext = React.createContext([])

