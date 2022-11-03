import React from "react"
import {LOGIN, LOGOUT, ADMIN, THEME} from '../../config/constante.js'

export const initialState = {
    login: false,
    admin:false,
    userid:null,
    background: 'home' 
    
}

export const reducer = (state, action) => {
    switch(action.type){
        case LOGIN :
            return {...state, login:true, userid:action.payload}
        case ADMIN :
            return {...state, admin:true}
        case LOGOUT :
            return {...state, login:false,  admin:false, userid:null}
        case THEME :
            return {...state, background: action.payload}     
        default: return state 
        
        
        
        
    }
}


export const ReducerContext = React.createContext([])

