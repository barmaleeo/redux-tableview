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
        this.props.tva.reload(this.config.entity, this.props.entity.filters, this.props.entity.limit, this.config.root, this.props.loadParams);
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
    console.log(this.config.entity + ' did mount', this.props);

    if (this.props.init.init) {
      //this.props.tva.loadDetail({id:this.reload}, this.config.entity, this.config.root)
      this.reload();
    }
  }

  componentWillReceiveProps(p) {
    console.log(this.config.entity + ' will receive props');

    if (!this.props.init.init && p.init.init) {
      console.log('tableview Reload!!!');
      this.reload();
    }
  }

  componentWillMount() {
    console.log(this.config.entity + ' will mount', this.props);
  }

  componentWillUnmount() {
    console.log(this.config.entity + ' will unmount');
  }

  getDetailContent(e) {
    return /*#__PURE__*/React.createElement("div", {
      className: 'table-view-detail ' + this.props.className
    }, /*#__PURE__*/React.createElement("div", {
      className: "tv-header"
    }, typeof this.renderDetailHeader === "function" && this.renderDetailHeader(), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-default btn-sm",
      onClick: this.closeDetail
    }, "\u0417\u0430\u043A\u0440\u044B\u0442\u044C")), /*#__PURE__*/React.createElement("div", {
      className: "tv-body"
    }, typeof this.renderDetails === "function" && this.renderDetails()), e.selectedItem && (e.selectedItem.loading || e.loadDetail) && /*#__PURE__*/React.createElement("div", {
      className: "tv-detail-progress"
    }));
  }

  render() {
    const e = this.props.entity;

    if (e === undefined) {
      return null;
    }

    if (e && e.showDetail) {
      return this.getDetailContent(e);
    }

    const limit = e.limit ? e.limit : 0;
    let checked = 0;

    for (const i of e.items) {
      checked += i.checked ? 1 : 0;
    }

    return /*#__PURE__*/React.createElement("div", {
      className: 'table-view-outher ' + this.props.className
    }, e.showCustom > 0 && this.config.customMode !== 'tableTop' && this.renderCustom(e), (!(e.showCustom > 0) || this.config.customMode === 'stacked' || this.config.customMode === 'tableTop') && /*#__PURE__*/React.createElement("div", {
      className: "tv-o-main"
    }, /*#__PURE__*/React.createElement("div", {
      className: "tv-table"
    }, e.showCustom > 0 && this.config.customMode === 'tableTop' && this.renderCustom(e), /*#__PURE__*/React.createElement("div", {
      className: "table-scroll"
    }, /*#__PURE__*/React.createElement("table", {
      className: "table table-sm table-bordered table-condensed"
    }, /*#__PURE__*/React.createElement("tbody", null, e.items.map((i, k) => this.renderRow(i, k)))), e.loading && /*#__PURE__*/React.createElement("div", {
      className: "progress-loading-block abs"
    }, "\u0417\u0410\u0413\u0420\u0423\u0416\u0410\u0415\u041C \u0414\u0410\u041D\u041D\u042B\u0415"))), /*#__PURE__*/React.createElement("div", {
      className: "tv-right-panel"
    }, /*#__PURE__*/React.createElement("fieldset", null, /*#__PURE__*/React.createElement("legend", null, "\u041B\u0438\u043C\u0438\u0442 (", e.items.length, " \u0437\u0430\u043F\u0438\u0441\u0435\u0439)"), /*#__PURE__*/React.createElement("input", {
      className: "tv-rp-limit",
      onChange: this.handleChangeLimit,
      value: limit
    })), /*#__PURE__*/React.createElement("fieldset", null, /*#__PURE__*/React.createElement("legend", null, "\u0412\u044B\u0431\u0440\u0430\u043D\u043E (", checked, " \u0437\u0430\u043F\u0438\u0441\u0435\u0439)"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-sm btn-primary",
      onClick: this.props.tva.setChecked.bind(this, this.config.entity, -1, true)
    }, "\u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0432\u0441\u0435"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-sm btn-primary",
      onClick: this.props.tva.setChecked.bind(this, this.config.entity, -1, false)
    }, "\u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u0441\u0435"))), /*#__PURE__*/React.createElement("fieldset", null, /*#__PURE__*/React.createElement("legend", null, "\u0424\u0438\u043B\u044C\u0442\u0440\u044B"), e.filters.map((f, k) => /*#__PURE__*/React.createElement(FilterElement, {
      filter: f,
      entityName: this.config.entity,
      k: k,
      key: k,
      config: e.filterTypes,
      tva: this.props.tva
    })), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-block btn-default",
      onClick: this.reload
    }, "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C")), this.renderActions && /*#__PURE__*/React.createElement("fieldset", null, /*#__PURE__*/React.createElement("legend", null, "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F"), this.renderActions()))));
  }

}