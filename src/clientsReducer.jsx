import tableViewReducer from "./lib/tableViewReduser";
import {combineReducers} from "redux";


const filterTypes = [
    {id:0, name:'Имя',              cond: false, token:'user.name', like:true, number:false},
    {id:1, name:'Телефон',          cond: false, token:'user_phone.phone', like:true},
    {id:2, name:'Email',            cond: false, token:'user_email.email', like:true},
    {id:3, name:'ID клиента',       cond: true,  token:'user.id', number:true},
    {id:4, name:'Адрес',            cond: false, token:'user_address.address_string',  like: true},
    {id:5, name:'Блокирован',       cond: false, token:'user.disabled',  variants:[{name:'Нет', value:0},{name:'Да', value:1}]},
    {id:6, name:'Создали',          cond: true,  token:'orders_created', number:true, having:true},
    {id:7, name:'Отправили',        cond: true,  token:'orders_sent',      number:true, having:true},
    {id:8, name:'Получили',         cond: true,  token:'orders_received',  number:true, having:true},
    {id:9, name:'Доставили',        cond: true,  token:'orders_delivered', number:true, having:true},
    {id:10,name:'Доставили',        cond: true,  token:'orders_delivered', number:true, having:true},
    {id:11,name:'Профиль',          cond: false, token:'user.profile_id'},
    {id:12,name:'Статус',           cond: false, token:'user.status'},
    {id:13,name:'Овердрафт',        cond: true,  token:'user.overdraft', number:true},
    {id:14,name:'Создан',           cond: true,  token:'user.create_date', date:true},
    {id:15,name:'Активность',       cond: true,  token:'user.update_date', date:true},
    {id:16,name:'Принтер',          cond: false, token:'user.has_printer', variants:[{name:'Есть', value:1},{name:'Нет', value:0}]},
];


const initialState = {
    loading: true,
    items:[],
    filterTypes:filterTypes,
    filters:[
        {type:1},
        {type:2},
        {type:3},
        {type:3},
    ]
};

export default function (state = initialState, action) {
    const pl = action.payload;

    let newState = tableViewReducer('clients', state, action);
    // switch (action.type) {
    // }


    let selectedItem = combineReducers({
        client:{name:'Test'}
    });
    if(newState.selectedItem !== state.selectedItem){
        newState.selectedItem = selectedItem;
    }
    return newState;
}