"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _DatePicker = _interopRequireDefault(require("./DatePicker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FilterElement =
/*#__PURE__*/
function (_Component) {
  _inherits(FilterElement, _Component);

  function FilterElement() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FilterElement);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FilterElement)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "handleChangeFilterType", function (e) {
      _this.props.tva.setFilterType(_this.props.entityName, _this.props.k, _this.props.config[e.target.value], e.target.value); //     //console.log('handleChangeFilterType', this.props.list, e);
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

    _defineProperty(_assertThisInitialized(_this), "handleChangeActive", function (e) {
      _this.props.tva.setFilterActive(_this.props.entityName, _this.props.k, e.target.checked);
    });

    _defineProperty(_assertThisInitialized(_this), "handleChangeCond", function (e) {
      _this.props.tva.setFilterCond(_this.props.entityName, _this.props.k, e.target.value); //     this.state.cond = this.refs.condition.value;
      //     this.setState(this.state, function(){
      //         if(this.props.onChange){this.props.onChange()}
      //     });
      //

    });

    _defineProperty(_assertThisInitialized(_this), "handleChangeValue", function (e) {
      //if(this.props.filter.variants){
      //    this.props.tva(this.props.k)
      //}else {
      _this.props.tva.setFilterValue(_this.props.entityName, _this.props.k, _this.props.filter.date ? e : e.target.value); //}

    });

    return _this;
  }

  _createClass(FilterElement, [{
    key: "render",
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
    value: function render() {
      var p = this.props;
      var s = this.state;
      var f = p.filter;
      var value;
      var valueClass = 'filter-input' + (f.cond || f.date ? '' : ' wide');

      if (f.variants && f.variants.length > 0) {
        //console.log('value ', f.value, f.variants, f.variants[f.value]);
        var title = f.value;

        for (var i in f.variants) {
          if (title == f.variants[i].value) {
            title = f.variants[i].name;
            break;
          }
        }

        value = _react.default.createElement("select", {
          ref: "value",
          onChange: this.handleChangeValue,
          className: valueClass,
          title: title,
          value: f.value
        }, f.variants.map(function (i, k) {
          return _react.default.createElement("option", {
            key: k,
            value: i.value
          }, i.name);
        }));
      } else if (f.date) {
        value = _react.default.createElement(_DatePicker.default, {
          className: valueClass,
          dpprops: {
            language: 'ru',
            dateFormat: 'dd-mm-yy',
            onSelect: this.handleChangeValue
          },
          value: f.value
        });
      } else {
        value = _react.default.createElement("input", {
          ref: "value",
          onChange: this.handleChangeValue,
          value: f.value ? f.value : '',
          className: valueClass
        });
      }

      return _react.default.createElement("div", {
        className: "filter-container",
        title: f.name
      }, _react.default.createElement("input", {
        ref: "active",
        type: "checkbox",
        className: "filter-on",
        onChange: this.handleChangeActive,
        checked: f.active
      }), _react.default.createElement("select", {
        ref: "type",
        className: "filter-type",
        value: f.type,
        onChange: this.handleChangeFilterType
      }, p.config.map(function (l, i) {
        return _react.default.createElement("option", {
          key: i,
          value: i
        }, l.name);
      })), f.cond || f.date ? _react.default.createElement("select", {
        ref: "condition",
        value: f.cond,
        onChange: this.handleChangeCond,
        className: "filter-condition"
      }, _react.default.createElement("option", {
        key: 0,
        value: ">"
      }, ">"), _react.default.createElement("option", {
        key: 1,
        value: ">="
      }, ">="), _react.default.createElement("option", {
        key: 2,
        value: "<"
      }, "<"), _react.default.createElement("option", {
        key: 3,
        value: "<="
      }, "<="), _react.default.createElement("option", {
        key: 4,
        value: "="
      }, "="), _react.default.createElement("option", {
        key: 5,
        value: "<>"
      }, "<>")) : '', value);
    }
  }]);

  return FilterElement;
}(_react.Component);

exports.default = FilterElement;