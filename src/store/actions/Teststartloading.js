import * as actiontype from './actionsTypes'
export const setteststartloading=()=>{
    return {
        type:actiontype.SET_TESTSTART_LOADING
    }
}

export const resetteststartloading=()=>{
    return{
        type:actiontype.RESET_TESTSTART_LOADING
    }
}