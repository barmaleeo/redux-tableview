import * as TV from './tableViewConstants'

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
    let newState = state;
    switch(action.type){
        case TV.TABLEVIEW_SET_CUSTOM:
            if(pl.entity === name){
                newState = {...state, showCustom:pl.id};
            }
            break;
        case TV.TABLEVIEW_RELOAD_REQ:
            if(pl.entity === name){
                return {...state, loading:true,items:[]};
            }
            break;
        case TV.TABLEVIEW_RELOAD_DONE:
            if(pl.entity === name) {
                newState = {...state, items: pl.items, loading: false, errMsg: undefined};
            }
            break;
        case TV.TABLEVIEW_RELOAD_ERR:
            if(pl.entity === name) {
                newState = {...state, loading:false, errMsg:pl.msg};
            }
            break;
        case TV.TABLEVIEW_SET_LIMIT:
            if(pl.entity === name){
                if(parseInt(pl.value)>0){
                    newState = {...state, limit:pl.value}
                }
            }
            break;

        case TV.TABLEVIEW_SET_FILTER_ACTIVE:
            if(pl.entity === name) {
                newState = {...state};
                newState.filters[pl.id] = {...newState.filters[pl.id], active:pl.value};
            }
            break;
        case TV.TABLEVIEW_SET_FILTER_VALUE:
            if(pl.entity === name) {
                newState = {...state};
                newState.filters[pl.id] = {...newState.filters[pl.id], value: pl.value};

            }
            break;
        case TV.TABLEVIEW_SET_ROW_CHECKED:{
            if(pl.entity === name) {
                newState = {...state};
                if(parseInt(pl.id) === 0){
                    newState.items = state.items.slice();
                    for(const i of newState.items){
                        i.checked = pl.checked;
                    }
                }else {
                    newState.items[pl.id] = {...newState.items[pl.id], checked: pl.checked};
                }
            }
            break;
        }
        case TV.TABLEVIEW_SET_FILTER_COND:{
            if(pl.entity === name) {
                newState = {...state};
                newState.filters[pl.id] = {...newState.filters[pl.id], cond: pl.cond};
            }
            break;
        }
        case TV.TABLEVIEW_SET_FILTER_TYPE:{
            if(pl.entity === name) {

                //console.log(pl, state);
                const newState = {...state};
                const filter = {...pl.filter};
                filter.type = pl.type;

                if(typeof filter.cond == 'string' && state.filters[pl.id].cond){
                    filter.cond = state.filters[pl.id].cond;
                }else if(filter.cond === true){
                    filter.cond = '=';
                }
                filter.active = state.filters[pl.id].active;
                if(filter.variants && filter.variants.length>0){
                    filter.value = filter.variants[0].value;
                }else if(filter.number){
                    filter.value = 0;
                }else if(filter.date){
                    const date = new Date();
                    filter.value = date.toLocaleDateString('ru');
                }else{
                    filter.value = '';
                }
                newState.filters[pl.id] = filter;
            }
            break;
        }
        case TV.TABLEVIEW_OPEN_DETAIL:
            if(pl.entity === name) {
                newState = {...state, showDetail:true};
            }
            break;
        case TV.TABLEVIEW_CLOSE_DETAIL:
            if(pl.entity === name) {
                newState =  {...state, showDetail:false};
            }
            break;
        case name.toUpperCase()+'_LOAD_DONE':

            newState = {...state, items:pl.items};
            let filterConfig;

            if(pl.filterStates != null) {
                try {
                    filterConfig = JSON.parse(pl.filterStates.config);
                }catch(e){}
                let filterLimit = pl.filterStates.limit;
                if(!isNaN(parseInt(filterLimit)) && filterLimit>0){
                    newState.limit = parseInt(filterLimit);
                }
            }
            const filterTypes = newState.filterTypes;
            let n = 0;
            let filters = [];
            if(filterConfig){
                for(const fc of filterConfig){
                    const filter = {...filterTypes[fc.filter], type:fc.filter, active:fc.active, cond:fc.cond};
                    if(fc.filter >= 0 &&
                        fc.filter<filterTypes.length &&
                        Array.isArray(filterTypes[fc.filter].variants) &&
                        filterTypes[fc.filter].variants.length > 0 &&
                        !(fc.value >= 0 && fc.value < filterTypes[fc.filter].variants.length
                        )
                    ){
                        filter.value = filterTypes[fc.filter].variants[0].value;
                    }else {
                        filter.value = fc.value;
                    }
                    filter.token    = filterTypes[fc.filter].token;
                    filter.having   = filterTypes[fc.filter].having;
                    filter.date     = filterTypes[fc.filter].date;
                    filter.like     = filterTypes[fc.filter].like;
                    filter.variants = filterTypes[fc.filter].variants;

                    filters.push(filter);
                    n++;
                }
                for(n; n<filters.length;n++){
                    const config = filterTypes[n];
                    const bf = filters[n];
                    bf.token    = config.token;
                    bf.having   = !!config.having;
                    bf.date     = !!config.date;
                    bf.like     = !!config.like;
                    bf.variants = config.variants;
                }
            }else{
                filters = newState.filters;
                for(const f of filters){
                    const config = filterTypes[f.type];
                    if(config.cond){
                        if(f.cond === undefined) {
                            f.cond = '=';
                        }
                    }
                    if(config.variants && Array.isArray(config.variants) && config.variants.length > 0){
                        if(!(f.value >= 0 && f.value < config.variants.length)){
                            f.value = config.variants[0].value;
                        }
                        f.variants = config.variants;
                    }else if(config.date){
                        const date = new Date();
                        f.value = date.toLocaleDateString('ru');
                    }else if(config.number){
                        f.value = 0;
                    }else{
                        f.value = '';
                    }
                    f.token  = config.token;
                    f.having = !!config.having;
                    f.like =   !!config.like;
                    f.date =   !!config.date;
                }
            }
            newState.init = true;
            newState.filters = filters;
            break;
        case name.toUpperCase()+'_LOAD_DETAIL_REQ':
            if(pl.entity === name) {
                newState = {...state};
                newState.showDetail = true;
                newState.selectedItem = {checked:0, items:[]};
                newState.loadDetail = true;
                newState.loadDetailErr = false;
            }
            break;

        case name.toUpperCase()+'_LOAD_DETAIL_DONE':
            if(pl.entity === name) {
                newState = {...state};
                newState.load = false;
                newState.loadErr = false;
                newState.loadDetail = false;
                newState.selectedItem = pl.data;
                newState.selectedItem.checked = 0;
            }
            break;
        case name.toUpperCase()+'_LOAD_DETAIL_ERR':
            if(pl.entity === name) {
                newState = {...state};
                newState.showDetail = false;
                newState.loadDetail = false;
                newState.loadDetailErr = true;
            }
            break;
    }

    if(typeof selectedItemReducer === 'function'){

        if(newState === state) {
            newState = {...newState};
        }
        
        if(newState.selectedItem === state.selectedItem){
            newState.selectedItem = {...state.selectedItem};
        }
        let selectedName;
        if(name[name.length-1] === 's'){
            selectedName = name.substr(0, name.length-1)
        }else{
            selectedName = name;
        }
        newState.selectedItem[selectedName] =  selectedItemReducer(newState.selectedItem[selectedName], action);

    }


    return newState;
}