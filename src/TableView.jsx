import React from 'react';
import {connect} from "react-redux";
import TableViewComponent from "./lib/TableViewComponent";
import {bindActionCreators} from "redux";
import * as tableViewActions from "./lib/tableViewActions";


import './tableViewStyle.scss';


class TableView extends TableViewComponent {
    config={entity :"clients", customMode:'tableTop'};

    renderDetails = () => {
        return (<div>render detail</div>)
    };

    renderCustom = ()=>{
        return (
            <div className="clients-custom-content">
                <div>
                    <div>This is a CUSTOM CONTENT</div>
                    <button className="btn btn-info"
                            onClick={this.props.tva.setCustom.bind(this, 'clients', 0)}>close</button>
                </div>
            </div>
        )

    };

    renderActions = () => {
        return (
            <div>
                <button className="btn btn-block btn-success"
                        onClick={this.props.tva.setCustom.bind(this, this.config.entity, 1)}>Custom content</button>
            </div>
        )
    };

    renderRow = (item, n) => {
        return (
            <tr key={n} onClick={this.handleClickRow.bind(this, item, n)}>
                <td>{n}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
            </tr>
        )
    }
}

function mapStateToProps(state) {
    return {
        init:       state.init,
        entity:     state.clients,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        tva: bindActionCreators(tableViewActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableView)