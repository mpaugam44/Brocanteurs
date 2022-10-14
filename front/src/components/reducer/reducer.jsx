import React from "react"
import {LOGIN, LOGOUT, ADMIN} from '../../config/constante.js'

export const initialState = {
    login: false,
    admin:false,
    userid:null
}

export const reducer = (state, action) => {
    switch(action.type){
        case LOGIN :
            return {...state, login:true, userid:action.payload}
        case ADMIN :
            return {...state, admin:true}
        case LOGOUT :
            return {...state, login:false,  admin:false, userid:null}
        default: return state 
    }
}


export const ReducerContext = React.createContext([])

