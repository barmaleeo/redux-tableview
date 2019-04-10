import React from 'react';
import 'babel-polyfill'
import configureStore from './store'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import './index.css';

import * as serviceWorker from './serviceWorker';

import DevTools from "./DevTools";

import TableView from "./TableView";

const root = document.getElementById('root');

window.$.get = (path, params, callback, format) => {

    console.log('AJAX Request:', path, params, format);


    if(path === 'office/get-clients-table') {
        const response = {
            status: 'ok',
            items: [
                {id: 0, name: 'Client 1'},
                {id: 1, name: 'Client 2'},
                {id: 2, name: 'Client 3'},
                {id: 3, name: 'Client 4'},
                {id: 4, name: 'Client 5'},
                {id: 5, name: 'Client 6'},
                {id: 6, name: 'Client 7'},
                {id: 7, name: 'Client 8'},
                {id: 8, name: 'Client 9'},
                {id: 9, name: 'Client 10'},
                {id: 10, name: 'Client 11'},
                {id: 11, name: 'Client 12'},
                {id: 12, name: 'Client 13'},
                {id: 13, name: 'Client 14'},
                {id: 14, name: 'Client 15'},
            ]
        };
        if(typeof callback === "function"){
            setTimeout(() => {callback(response)}, 1000)
        }
    }else if(path === 'office/get-clients-detail'){

        const response = {
            status: 'ok',
            id: 0,
            name: 'Client 1',
            detailed:'Detailed client info'
        };

        if(typeof callback === "function"){
            setTimeout(() => {callback(response)}, 1000)
        }

    }else if(path === 'office/init'){


        const response = {
            status: 'error',
            clients: {
                items: [],
                filterStates: {limit:100,
                    config: '[' +
                    '{"filter":1,"active":false,"value":""},'+
                    '{"filter":2,"active":true,"value":""},' +
                    '{"filter":"5","active":false,"value":0},' +
                    '{"filter":14,"active":true,"value":"23.05.2019","cond":">"}' +
                    ']'
                },
            },
        };

        if(typeof callback === "function"){
            console.log('office-init-branch');

            setTimeout(() => {callback(response)}, 1000)
        }

    }else{
        console.log('ajax get error', path, params, callback, format);
        return {fail:(callback) => {

            if(typeof callback === "function"){
                callback(new Error('Not found!'))
            }
        }, always:(callback) => {callback()}}

    }
    return {fail:(callback) => {}, always:(callback) => {callback()}}
};

const store = configureStore();

console.log('TableView Development');

render(
    <Provider store={store}>
        <div id="provider-root">
            <DevTools/>
            <TableView/>
        </div>
    </Provider>,
    root
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
