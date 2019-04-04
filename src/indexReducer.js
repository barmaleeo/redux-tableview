import {combineReducers} from "redux";
import clients from "./clientsReducer";
import init from "./initReducer";


export default combineReducers({
    init,
    clients,
})
