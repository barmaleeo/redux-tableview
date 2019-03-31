import React from 'react';
import {connect} from "react-redux";
import TableViewComponent from "./lib/TableViewComponent";
import {bindActionCreators} from "redux";
import * as tableViewActions from "./lib/tableViewActions";


//import './TableViewStyle';


class TableView extends TableViewComponent {
    config={entity :"clients"};

    renderDetails = () => {
        return (<div>render detail</div>)
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