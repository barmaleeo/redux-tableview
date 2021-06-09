function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import DatePicker from './DatePicker';
export default class FilterElement extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {});

    _defineProperty(this, "handleChangeFilterType", e => {
      this.props.tva.setFilterType(this.props.entityName, this.props.k, this.props.config[e.target.value], e.target.value);
    });

    _defineProperty(this, "handleChangeActive", e => {
      this.props.tva.setFilterActive(this.props.entityName, this.props.k, e.target.checked);
    });

    _defineProperty(this, "handleChangeCond", e => {
      this.props.tva.setFilterCond(this.props.entityName, this.props.k, e.target.value);
    });

    _defineProperty(this, "handleChangeValue", e => {
      //if(this.props.filter.variants){
      //    this.props.tva(this.props.k)
      //}else {
      this.props.tva.setFilterValue(this.props.entityName, this.props.k, this.props.filter.date ? e : e.target.value); //}
    });
  }

  render() {
    let p = this.props; //let s = this.state;

    let f = p.filter;
    let value;
    let valueClass = 'filter-input' + (f.cond || f.date ? '' : ' wide');

    if (f.variants && f.variants.length > 0) {
      //console.log('value ', f.value, f.variants, f.variants[f.value]);
      let title = f.value;

      for (let v of f.variants) {
        if (title === v.value) {
          title = v.name;
          break;
        }
      }

      value = /*#__PURE__*/React.createElement("select", {
        ref: "value",
        onChange: this.handleChangeValue,
        className: valueClass,
        title: title,
        value: f.value
      }, f.variants.map((i, k) => /*#__PURE__*/React.createElement("option", {
        key: k,
        value: i.value
      }, i.name)));
    } else if (f.date) {
      value = /*#__PURE__*/React.createElement(DatePicker, {
        className: valueClass,
        onChange: () => {},
        dpprops: {
          language: 'ru',
          dateFormat: 'dd.mm.yy',
          onSelect: this.handleChangeValue
        },
        value: f.value ? f.value : ' '
      });
    } else {
      value = /*#__PURE__*/React.createElement("input", {
        ref: "value",
        onChange: this.handleChangeValue,
        value: f.value ? f.value : '',
        className: valueClass
      });
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "filter-container",
      title: f.name
    }, /*#__PURE__*/React.createElement("input", {
      ref: "active",
      type: "checkbox",
      className: "filter-on",
      onChange: this.handleChangeActive,
      checked: !!f.active
    }), /*#__PURE__*/React.createElement("select", {
      ref: "type",
      className: "filter-type",
      value: f.type,
      onChange: this.handleChangeFilterType
    }, p.config.map((l, i) => /*#__PURE__*/React.createElement("option", {
      key: i,
      value: i
    }, l.name))), f.cond || f.date ? /*#__PURE__*/React.createElement("select", {
      ref: "condition",
      value: f.cond,
      onChange: this.handleChangeCond,
      className: "filter-condition"
    }, /*#__PURE__*/React.createElement("option", {
      key: 0,
      value: ">"
    }, ">"), /*#__PURE__*/React.createElement("option", {
      key: 1,
      value: ">="
    }, ">="), /*#__PURE__*/React.createElement("option", {
      key: 2,
      value: "<"
    }, "<"), /*#__PURE__*/React.createElement("option", {
      key: 3,
      value: "<="
    }, "<="), /*#__PURE__*/React.createElement("option", {
      key: 4,
      value: "="
    }, "="), /*#__PURE__*/React.createElement("option", {
      key: 5,
      value: "<>"
    }, "<>")) : '', value);
  }

}