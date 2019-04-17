
import * as TV from './tableViewConstants'

//import {cDate, mysqld} from './dateHelper'


export function closeDetail(entity){
    return {type:TV.TABLEVIEW_CLOSE_DETAIL, payload:{entity:entity}}
}

export function setCustom(entity, id){
    return {type:TV.TABLEVIEW_SET_CUSTOM, payload:{entity:entity, id:id}}
}

export function loadDetail(i, entity, root = 'office'){
    return (dispatch, getState) => {
        const mode = getState()[entity].detailMode;
        dispatch({type:entity.toUpperCase()+'_LOAD_DETAIL_REQ', payload:{entity:entity}});
        dispatch({type:TV.TABLEVIEW_OPEN_DETAIL, payload:{entity:entity}});
        window.$.get(root+'/get-'+entity+'-detail', {id:i.id, mode:mode}, function(r){
            if(r.status === 'ok'){
                dispatch({type:entity.toUpperCase()+'_LOAD_DETAIL_DONE', payload:{entity:entity, data:r}});
            }else{
                dispatch({type:entity.toUpperCase()+'_LOAD_DETAIL_ERR', payload:{entity:entity, msg:r.msg}});
            }
        }, 'json').fail((e) => {
            dispatch({type:entity.toUpperCase()+'_LOAD_DETAIL_ERR', payload:{entity:entity, msg:e.responseText}});
        })
    }
}
export function changeLimit(entity, value){
    return (dispatch, getState) => {
        dispatch({type:TV.TABLEVIEW_SET_LIMIT, payload:{entity:entity, value:value}});
        saveFilterState(getState()[entity]);
    }
}
export function setFilterActive(entity, id, value){
    return (dispatch, getState) => {
        dispatch({type:TV.TABLEVIEW_SET_FILTER_ACTIVE, payload:{entity:entity, id:id, value:value}});
        saveFilterState(getState()[entity]);
    }
}
export function setFilterCond(entity, id, cond){
    return (dispatch, getState) => {
        dispatch({type: TV.TABLEVIEW_SET_FILTER_COND, payload: {entity:entity,id: id, cond: cond}});
        saveFilterState(getState()[entity]);
    }
}
export function setFilterType(entity, id, filter, type){
    return (dispatch, getState) => {
        dispatch({type: TV.TABLEVIEW_SET_FILTER_TYPE, payload: {entity:entity,id: id, filter: filter, type: type}});
        saveFilterState(getState()[entity]);
    }
}
export function setFilterValue(entity, id, value){
    return (dispatch, getState) => {
        dispatch({type: TV.TABLEVIEW_SET_FILTER_VALUE, payload: {entity:entity,id: id, value: value}});
        saveFilterState(getState()[entity]);
    }
}
export function setChecked(entity,id, checked){
    return {type:TV.TABLEVIEW_SET_ROW_CHECKED, payload:{entity:entity, id:id, checked:checked}}
}
export function reload(entity, filtersArray, limit, root = 'office', loadParams){
    return (dispatch, getState) => {

        const filters = [];
        for(const f of filtersArray){
            if(f.active){
                const filter = {
                    type:       f.token,
                    value:      f.value,
                    condition:  f.cond,
                };
                if(f.like === true){
                    filter.like = true;
                }
                if(f.having === true){
                    filter.having = true;
                }
                if(f.date === true){
                    filter.date = true;

                    const date = f.value.split('.');
                    if(date.length === 3) {
                        filter.value = date[2] + '-' + date[1] + '-' + date[0];
                    }else{
                        filter.value = f.value;
                    }
                }
                filters.push(filter)
            }
        }

        dispatch({type:TV.TABLEVIEW_RELOAD_REQ, payload:{entity:entity}});
        window.$.get(root+'/get-'+entity.toLowerCase()+'-table',
            {filters:filters, limit:limit, params:loadParams}, function(r) {
            if(r.status === 'ok'){
                dispatch({type:TV.TABLEVIEW_RELOAD_DONE, payload:{entity:entity, items:r.items, params:loadParams}});
            }else{
                dispatch({type:TV.TABLEVIEW_RELOAD_ERR, payload:{entity:entity, msg:r.msg, params:loadParams}});
            }
        }, 'json').fail((e) => {
            dispatch({type: TV.TABLEVIEW_RELOAD_ERR, payload:{entity:entity, msg:e.responseText, params:loadParams}});
        })
    }
}

function saveFilterState(state, root = 'office'){
    let config = [];
    //let i = 0;
    for(const f of state.filters){
        let filter = {filter:f.type,  active:f.active===true, value:f.value};
        //filter.value = state.filterTypes[f.type].variants?state.filterTypes[f.type].variants[f.value].value:f.value;
        if(f.cond){
            filter.cond = f.cond;
        }
        config.push(filter);
    }
    window.$.get(root+'/save-filter-state', {config:JSON.stringify(config), type:state.saveType, limit:state.limit});
    console.log('filterConfiguration', config)

}