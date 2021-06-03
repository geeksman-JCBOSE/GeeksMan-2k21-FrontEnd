import * as actiontype from './actionsTypes'
export const setloading=()=>{
    return {
        type:actiontype.SET_LOADING
    }
}

export const resetloading=()=>{
    return{
        type:actiontype.RESET_LOADING
    }
}