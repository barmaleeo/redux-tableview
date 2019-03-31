function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import DatePicker from './DatePicker';
export default class FilterElement extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {});

    _defineProperty(this, "handleChangeFilterType", e => {
      this.props.tva.setFilterType(this.props.entityName, this.props.k, this.props.config[e.target.value], e.target.value); //     //console.log('handleChangeFilterType', this.props.list, e);
      //     let id = this.refs.type.selectedOptions[0].dataset.id;
      //     let filter = this.props.list[id];
      //     filter.id = id;
      //     this.state.filter = filter;
      //     if(filter.cond){
      //         this.state.cond = '>';
      //     }else{
      //         this.state.cond = undefined;
      //     }
      //     if(this.state.filter.date){
      //         this.state.value = sds(new Date())
      //     }
      //     let s = this.state;
      //     this.setState(this.state,function(){
      //         if(this.state.filter.date){
      //             this.refs.value.value =s.value;
      //             $(this.refs.value).datepicker({
      //                 language: 'ru',
      //                 dateFormat: 'dd-mm-yy',
      //                 onSelect: this.handleChangeValue,
      //             });
      //         }else {
      //             $(this.refs.value).datepicker('destroy');
      //             $(this.refs.value).val('')
      //         }
      //         if(this.props.onChange){this.props.onChange()}
      //     });
    });

    _defineProperty(this, "handleChangeActive", e => {
      this.props.tva.setFilterActive(this.props.entityName, this.props.k, e.target.checked);
    });

    _defineProperty(this, "handleChangeCond", e => {
      this.props.tva.setFilterCond(this.props.entityName, this.props.k, e.target.value); //     this.state.cond = this.refs.condition.value;
      //     this.setState(this.state, function(){
      //         if(this.props.onChange){this.props.onChange()}
      //     });
      //
    });

    _defineProperty(this, "handleChangeValue", e => {
      //if(this.props.filter.variants){
      //    this.props.tva(this.props.k)
      //}else {
      this.props.tva.setFilterValue(this.props.entityName, this.props.k, this.props.filter.date ? e : e.target.value); //}
    });
  }

  // getFilterState = () => {
  //     if(this.state.filter.date){
  //         var date = $(this.refs.value).datepicker('getDate');
  //         if(date==null){
  //             date = new Date();
  //         }
  //         //date.setHours(date.getHours()+2);
  //         var value = mysqld(date);
  //         //console.log('date',date, value)
  //     } else{
  //         value = this.refs.value.value;
  //     }
  //     let filter =  {
  //         id: this.state.filter.id,
  //         active: this.state.active,
  //         type: this.refs.type.value,
  //         value: value
  //     };
  //     if(this.refs.value.selectedIndex){
  //         filter.variant = this.refs.value.selectedIndex;
  //     }
  //     if(this.state.filter.date!==undefined){
  //         filter.date = this.state.filter.date;
  //     }
  //     if(this.state.filter.timestamp!==undefined){
  //         filter.timestamp = this.state.filter.timestamp;
  //     }
  //     if(this.state.filter.like!==undefined){
  //         filter.like = this.state.filter.like;
  //     }
  //     if(this.state.filter.having!==undefined){
  //         filter.having = this.state.filter.having;
  //     }
  //     if(this.state.cond!==undefined){
  //         filter.condition = this.state.cond;
  //     }
  //     return filter;
  // };
  render() {
    let p = this.props;
    let s = this.state;
    let f = p.filter;
    let value;
    let valueClass = 'filter-input' + (f.cond || f.date ? '' : ' wide');

    if (f.variants && f.variants.length > 0) {
      //console.log('value ', f.value, f.variants, f.variants[f.value]);
      let title = f.value;

      for (let i in f.variants) {
        if (title == f.variants[i].value) {
          title = f.variants[i].name;
          break;
        }
      }

      value = React.createElement("select", {
        ref: "value",
        onChange: this.handleChangeValue,
        className: valueClass,
        title: title,
        value: f.value
      }, f.variants.map((i, k) => React.createElement("option", {
        key: k,
        value: i.value
      }, i.name)));
    } else if (f.date) {
      value = React.createElement(DatePicker, {
        className: valueClass,
        dpprops: {
          language: 'ru',
          dateFormat: 'dd-mm-yy',
          onSelect: this.handleChangeValue
        },
        value: f.value
      });
    } else {
      value = React.createElement("input", {
        ref: "value",
        onChange: this.handleChangeValue,
        value: f.value ? f.value : '',
        className: valueClass
      });
    }

    return React.createElement("div", {
      className: "filter-container",
      title: f.name
    }, React.createElement("input", {
      ref: "active",
      type: "checkbox",
      className: "filter-on",
      onChange: this.handleChangeActive,
      checked: f.active
    }), React.createElement("select", {
      ref: "type",
      className: "filter-type",
      value: f.type,
      onChange: this.handleChangeFilterType
    }, p.config.map((l, i) => React.createElement("option", {
      key: i,
      value: i
    }, l.name))), f.cond || f.date ? React.createElement("select", {
      ref: "condition",
      value: f.cond,
      onChange: this.handleChangeCond,
      className: "filter-condition"
    }, React.createElement("option", {
      key: 0,
      value: ">"
    }, ">"), React.createElement("option", {
      key: 1,
      value: ">="
    }, ">="), React.createElement("option", {
      key: 2,
      value: "<"
    }, "<"), React.createElement("option", {
      key: 3,
      value: "<="
    }, "<="), React.createElement("option", {
      key: 4,
      value: "="
    }, "="), React.createElement("option", {
      key: 5,
      value: "<>"
    }, "<>")) : '', value);
  }

}