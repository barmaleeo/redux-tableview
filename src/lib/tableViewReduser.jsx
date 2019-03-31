import * as TV from './tableviewConstants'

const initialState = {
    loading:true,
    limit:100,
    filters:[],
    items:[],
    selectedItem:{
        checked:0,
        items:[],
    }
};

export default function tableViewReducer(name, state = initialState, action, selectedItemReducer){
    const pl = action.payload;
    console.log('tableViewReducer ', action.type, name, pl);
    switch(action.type){
        case TV.TABLEVIEW_SET_CUSTOM:
            if(name==pl.entity){
                return {...state, showCustom:pl.id};
            }else{
                return state
            }
        case TV.TABLEVIEW_RELOAD_REQ:
            if(name==pl.entity){
                return {...state, loading:true,items:[]};
            }else{
                return state
            }
        case TV.TABLEVIEW_RELOAD_DONE:
            if(name==pl.entity) {
                return {...state, items: pl.items, loading: false, errMsg: undefined};
            }else{
                return state;
            }
        case TV.TABLEVIEW_RELOAD_ERR:
            if(name==pl.entity) {
                return {...state, loading:false, errMsg:pl.msg};
            }else{
                return state;
            }

        case TV.TABLEVIEW_SET_LIMIT:
            if(name==pl.entity){
                if(parseInt(pl.value)>0){
                    return {...state, limit:pl.value}
                }
            }
            return state;

        case TV.TABLEVIEW_SET_FILTER_ACTIVE:{
            if(pl.entity==name) {
                const newState = {...state};
                newState.filters[pl.id] = {...newState.filters[pl.id], active:pl.value};
                return newState;
            }else{
                return state;
            }
        }
        case TV.TABLEVIEW_SET_FILTER_VALUE:{
            if(pl.entity==name) {
                const newState = {...state};
                newState.filters[pl.id] = {...newState.filters[pl.id], value: pl.value};
                return newState;
            }else{
                return state;
            }
        }
        case TV.TABLEVIEW_SET_ROW_CHECKED:{
            if(pl.entity==name) {
                const newState = {...state};
                newState.items[pl.id] = {...newState.items[pl.id], checked:pl.checked};
                return newState;
            }else{
                return state;
            }
        }
        case TV.TABLEVIEW_SET_FILTER_COND:{
            if(pl.entity==name) {
                const newState = {...state};
                newState.filters[pl.id] = {...newState.filters[pl.id], cond: pl.cond};
                return newState;
            }else{
                return state;
            }
        }
        case TV.TABLEVIEW_SET_FILTER_TYPE:{
            if(pl.entity==name) {

                console.log(pl, state);
                const newState = {...state};
                const filter = {...pl.filter};
                filter.type = pl.type;
                //if(typeof filter.cond == 'string' && typeof state.filters[pl.id].cond == 'string'){
                if(typeof filter.cond == 'string' && state.filters[pl.id].cond){
                    filter.cond = state.filters[pl.id].cond;
                }else if(filter.cond === true){
                    filter.cond = '>';
                }
                filter.active = state.filters[pl.id].active;
                if(filter.variants && filter.variants.length>0){
                    filter.value = filter.variants[0].value;
                }
                newState.filters[pl.id] = filter;
                return newState;
            }else{
                return state;
            }

    }
        case TV.TABLEVIEW_OPEN_DETAIL:
            if(pl.entity==name) {
                return {...state, showDetail:true};
            }else{
                return state;
            }
        case TV.TABLEVIEW_CLOSE_DETAIL:
            if(pl.entity==name) {
                return {...state, showDetail:false};
            }else{
                return state;
            }
        case name.toUpperCase()+'_LOAD_DONE':{

                const newLoadState = {...state, items:pl.items};
                let filterConfig;

                if(pl.filterStates != null) {
                    try {
                        filterConfig = JSON.parse(pl.filterStates.config);
                    }catch(e){}
                    let filterLimit = pl.filterStates.limit;
                    if(!isNaN(parseInt(filterLimit)) && filterLimit>0){
                        newLoadState.limit = parseInt(filterLimit);
                    }
                }
                const filterTypes = newLoadState.filterTypes;
                let n = 0;
                let filters = [];
                if(filterConfig){
                    for(const fc of filterConfig){
                        const filter = {...filterTypes[fc.filter], type:fc.filter, active:fc.active, cond:fc.cond};
                        if(fc.filter>=0 &&
                            fc.filter<filterTypes.length &&
                            typeof filterTypes.variants  == 'object' &&
                            (
                                fc.value=="" ||
                                fc.value == isNaN(fc.value) ||
                                fc.value<0 && fc.value >= filterTypes.variants.length
                            )
                        ){
                            filter.value = 0;
                        }else {
                            filter.value = fc.value;
                        }
                        filters.push(filter);
                        n++;
                    }
                }else{
                    filters = newLoadState.filters;
                    for(const f of filters){
                        const config = filterTypes[f.type];
                        if(config.cond){
                            if(f.cond == undefined) {
                                f.cond = '>';
                            }
                        }
                        if(f.value==undefined){
                            if(config.date){
                                const date = new Date();
                                const day = date.getDate();
                                const month = date.getMonth()+1;
                                f.value = (day<10?'0':'')+day+(month<10?'-0':'-')+month+'-'+date.getFullYear();
                            }else if(config.number){
                                f.value = 0;
                            }else{
                                f.value = '';
                            }
                        }
                    }
                }
                for(n; n<filters.length;n++){
                    const config = filterTypes[n];
                    const bf = filters[n];
                    bf.token    = config.token;
                    bf.having   = !!config.having;
                    bf.date   = !!config.date;
                    bf.like   = !!config.like;
                    bf.variants  = config.variants;
                 }
                newLoadState.init = true;
                return newLoadState;


        }
        case name.toUpperCase()+'_LOAD_DETAIL_REQ':{
            if(pl.entity==name) {
                const newState = {...state};
                newState.loadDetail = true;
                newState.loadDetailErr = false;
                return newState;
            }else{
                return state;
            }
        }
        case name.toUpperCase()+'_LOAD_DETAIL_DONE':{
            if(pl.entity==name) {
                const newState = {...state};
                newState.load = false;
                newState.loadErr = false;
                newState.loadDetail = false;
                newState.selectedItem = pl.data;
                newState.selectedItem.checked = 0;
                return newState;
            }else{
                return state;
            }
        }
        case name.toUpperCase()+'_LOAD_DETAIL_ERR':{
            if(pl.entity==name) {
                const newState = {...state};
                newState.loadDetail = false;
                newState.loadDetailErr = true;
                return newState;
            }else{
                return state;
            }
        }
        default:
            if(typeof selectedItemReducer === 'function'){
                const newState = {...state};
                newState.selectedItem = {...state.selectedItem};
                let selectedName;
                if(name[name.length-1] == 's'){
                    selectedName = name.substr(0, name.length-1)
                }else{
                    selectedName = name;
                }
                newState.selectedItem[selectedName] =  selectedItemReducer(state.selectedItem[selectedName], action);
                return newState;
            }
            return state;
    }
}