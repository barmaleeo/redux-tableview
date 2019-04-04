import {OFFICE_INIT_DONE, OFFICE_INIT_ERR, OFFICE_INIT_REQ} from "./initConstants";

export default function initReducer(state = {init:false}, action){
    const pl = action.payload;
    switch (action.type){
        case OFFICE_INIT_REQ:
            return state;
        case OFFICE_INIT_DONE:
            return {...state, init:true, ...pl};
         case OFFICE_INIT_ERR:
            return {...state, init:true, msg:pl};
        default:
            return state;
    }
}