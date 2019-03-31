function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import './tableViewStyle.scss';
import FilterElement from "./FilterElement";
export default class TableViewComponent extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "currentDetail", 0);

    _defineProperty(this, "handleClickRow", (i, k) => {
      console.log(i, k);
      this.currentDetail = i.id;
      this.props.tva.loadDetail(i, this.config.entity, this.config.root);
    });

    _defineProperty(this, "reloadDetail", () => {
      if (this.props.tva) {
        this.props.tva.loadDetail({
          id: this.currentDetail
        }, this.config.entity, this.config.root);
      }
    });

    _defineProperty(this, "reload", () => {
      if (this.props.tva) {
        this.props.tva.reload(this.config.entity, this.props.entity.filters, this.props.entity.limit, this.config.root);
      }
    });

    _defineProperty(this, "handleClickChecked", (n, checked, e) => {
      e.stopPropagation();
      this.props.tva.setChecked(this.config.entity, n, checked, this.config.root);
    });

    _defineProperty(this, "handleClickDummy", e => {
      e.stopPropagation();
    });

    _defineProperty(this, "getChecked", idOnly => {
      const items = [];

      for (const i of this.props.entity.items) {
        if (i.checked) {
          items.push(idOnly ? i.id : i);
        }
      }

      return items;
    });

    _defineProperty(this, "getForAction", n => {
      if (n) {
        return [n];
      } else {
        return this.getChecked(true);
      }
    });

    _defineProperty(this, "closeDetail", () => {
      if (this.props.tva) {
        this.props.tva.closeDetail(this.config.entity, this.config.root);
      }
    });

    _defineProperty(this, "handleChangeLimit", e => {
      if (this.props.tva) {
        this.props.tva.changeLimit(this.config.entity, e.target.value, this.config.root);
      }
    });
  }

  componentDidMount() {
    console.log(this.config.entity + ' did mount', this.props); //this.props.tva.loadDetail({id:this.reload}, this.config.entity, this.config.root)

    this.reload();
  }

  componentWillReceiveProps(p) {
    console.log(this.config.entity + ' will receive props'); // if(!this.props.entity.init && p.entity.init){
    //     this.reload();
    // }
  }

  componentWillMount() {
    console.log(this.config.entity + ' will mount', this.props);
  }

  componentWillUnmount() {
    console.log(this.config.entity + ' will unmount');
  }

  render() {
    const e = this.props.entity;

    if (e == undefined) {
      return null;
    }

    if (e && e.showCustom) {
      return this.showCustom(e);
    }

    if (e && e.showDetail) {
      return React.createElement("div", {
        className: 'table-view-detail ' + this.props.className
      }, React.createElement("div", {
        className: "tv-header"
      }, typeof this.renderDetailHeader === "function" && this.renderDetailHeader(), React.createElement("button", {
        className: "btn btn-default btn-sm",
        onClick: this.closeDetail
      }, "\u0417\u0430\u043A\u0440\u044B\u0442\u044C")), React.createElement("div", {
        className: "tv-body"
      }, typeof this.renderDetails === "function" && this.renderDetails()), e.selectedItem && (e.selectedItem.loading || e.loadDetail) && React.createElement("div", {
        className: "tv-detail-progress"
      }));
    }

    return React.createElement("div", {
      className: 'table-view-outher ' + this.props.className
    }, React.createElement("div", {
      className: "tv-table"
    }, React.createElement("table", {
      className: "table table-bordered table-condensed"
    }, React.createElement("tbody", null, e.items.map((i, k) => this.renderRow(i, k)))), e.loading && React.createElement("div", {
      className: "progress-loading-block abs"
    }, "\u0417\u0410\u0413\u0420\u0423\u0416\u0410\u0415\u041C \u0414\u0410\u041D\u041D\u042B\u0415")), React.createElement("div", {
      className: "tv-right-panel"
    }, React.createElement("fieldset", null, React.createElement("legend", null, "\u041B\u0438\u043C\u0438\u0442 (", e.items.length, " \u0437\u0430\u043F\u0438\u0441\u0435\u0439)"), React.createElement("input", {
      className: "tv-rp-limit",
      onChange: this.handleChangeLimit,
      value: e.limit
    })), React.createElement("fieldset", null, React.createElement("legend", null, "\u0424\u0438\u043B\u044C\u0442\u0440\u044B"), e.filters.map((f, k) => React.createElement(FilterElement, {
      filter: f,
      entityName: this.config.entity,
      k: k,
      key: k,
      config: e.filterTypes,
      tva: this.props.tva
    })), React.createElement("button", {
      className: "btn btn-block btn-default",
      onClick: this.reload
    }, "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C")), this.renderActions && React.createElement("fieldset", null, React.createElement("legend", null, "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F"), this.renderActions())));
  }

}