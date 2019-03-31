function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react'; //import Moment from 'moment';

export default class DatePicker extends React.Component {
  componentDidMount() {
    if (this.refs.datepicker.classList.contains('hasDatePicker')) return;
    window.$(this.refs.datepicker).datepicker({ ...this.props.dpprops
    });
  }

  render() {
    return React.createElement("input", _extends({
      type: "text",
      ref: "datepicker"
    }, this.props));
  }

}