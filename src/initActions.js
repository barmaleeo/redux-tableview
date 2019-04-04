import {
    CLIENTS_LOAD_DONE,
    OFFICE_INIT_DONE,
    OFFICE_INIT_ERR,
    OFFICE_INIT_REQ
} from './initConstants';


export function init(){
    console.log('office-init-entering');
    return (dispatch, getStore) => {
        dispatch({type:OFFICE_INIT_REQ});

        window.$.get('office/init', {},(r) => {
            dispatch({type: CLIENTS_LOAD_DONE, payload: r.clients});
            dispatch({type:OFFICE_INIT_DONE, payload:r.init});

        }, 'json')
            .fail((e) => {
                console.log(e);
                dispatch({type:OFFICE_INIT_ERR, payload:e.responseText});
            });
    };
}