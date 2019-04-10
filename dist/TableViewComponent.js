"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./tableViewStyle.scss");

var _FilterElement = _interopRequireDefault(require("./FilterElement"));

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

var TableViewComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(TableViewComponent, _Component);

  function TableViewComponent() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TableViewComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TableViewComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "currentDetail", 0);

    _defineProperty(_assertThisInitialized(_this), "handleClickRow", function (i, k) {
      console.log(i, k);
      _this.currentDetail = i.id;

      _this.props.tva.loadDetail(i, _this.config.entity, _this.config.root);
    });

    _defineProperty(_assertThisInitialized(_this), "reloadDetail", function () {
      if (_this.props.tva) {
        _this.props.tva.loadDetail({
          id: _this.currentDetail
        }, _this.config.entity, _this.config.root);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "reload", function () {
      if (_this.props.tva) {
        _this.props.tva.reload(_this.config.entity, _this.props.entity.filters, _this.props.entity.limit, _this.config.root);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickChecked", function (n, checked, e) {
      e.stopPropagation();

      _this.props.tva.setChecked(_this.config.entity, n, checked, _this.config.root);
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickDummy", function (e) {
      e.stopPropagation();
    });

    _defineProperty(_assertThisInitialized(_this), "getChecked", function (idOnly) {
      var items = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _this.props.entity.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var i = _step.value;

          if (i.checked) {
            items.push(idOnly ? i.id : i);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return items;
    });

    _defineProperty(_assertThisInitialized(_this), "getForAction", function (n) {
      if (n) {
        return [n];
      } else {
        return _this.getChecked(true);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "closeDetail", function () {
      if (_this.props.tva) {
        _this.props.tva.closeDetail(_this.config.entity, _this.config.root);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleChangeLimit", function (e) {
      if (_this.props.tva) {
        _this.props.tva.changeLimit(_this.config.entity, e.target.value, _this.config.root);
      }
    });

    return _this;
  }

  _createClass(TableViewComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log(this.config.entity + ' did mount', this.props);

      if (this.props.init.init) {
        //this.props.tva.loadDetail({id:this.reload}, this.config.entity, this.config.root)
        this.reload();
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(p) {
      console.log(this.config.entity + ' will receive props');

      if (!this.props.init.init && p.init.init) {
        console.log('tableview Reload!!!');
        this.reload();
      }
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      console.log(this.config.entity + ' will mount', this.props);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      console.log(this.config.entity + ' will unmount');
    }
  }, {
    key: "getDetailContent",
    value: function getDetailContent(e) {
      return _react.default.createElement("div", {
        className: 'table-view-detail ' + this.props.className
      }, _react.default.createElement("div", {
        className: "tv-header"
      }, typeof this.renderDetailHeader === "function" && this.renderDetailHeader(), _react.default.createElement("button", {
        className: "btn btn-default btn-sm",
        onClick: this.closeDetail
      }, "\u0417\u0430\u043A\u0440\u044B\u0442\u044C")), _react.default.createElement("div", {
        className: "tv-body"
      }, typeof this.renderDetails === "function" && this.renderDetails()), e.selectedItem && (e.selectedItem.loading || e.loadDetail) && _react.default.createElement("div", {
        className: "tv-detail-progress"
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var e = this.props.entity;

      if (e === undefined) {
        return null;
      }

      if (e && e.showDetail) {
        return this.getDetailContent(e);
      }

      var limit = e.limit ? e.limit : 0;
      return _react.default.createElement("div", {
        className: 'table-view-outher ' + this.props.className
      }, e.showCustom > 0 && this.config.customMode === 'stacked' && this.showCustom(e), (!(e.showCustom > 0) || this.config.customMode === 'stacked' || this.config.customMode === 'tableTop') && _react.default.createElement("div", {
        className: "tv-o-main"
      }, _react.default.createElement("div", {
        className: "tv-table"
      }, e.showCustom > 0 && this.config.customMode === 'tableTop' && this.showCustom(e), _react.default.createElement("div", {
        className: "table-scroll"
      }, _react.default.createElement("table", {
        className: "table table-bordered table-condensed"
      }, _react.default.createElement("tbody", null, e.items.map(function (i, k) {
        return _this2.renderRow(i, k);
      }))), e.loading && _react.default.createElement("div", {
        className: "progress-loading-block abs"
      }, "\u0417\u0410\u0413\u0420\u0423\u0416\u0410\u0415\u041C \u0414\u0410\u041D\u041D\u042B\u0415"))), _react.default.createElement("div", {
        className: "tv-right-panel"
      }, _react.default.createElement("fieldset", null, _react.default.createElement("legend", null, "\u041B\u0438\u043C\u0438\u0442 (", e.items.length, " \u0437\u0430\u043F\u0438\u0441\u0435\u0439)"), _react.default.createElement("input", {
        className: "tv-rp-limit",
        onChange: this.handleChangeLimit,
        value: limit
      })), _react.default.createElement("fieldset", null, _react.default.createElement("legend", null, "\u0424\u0438\u043B\u044C\u0442\u0440\u044B"), e.filters.map(function (f, k) {
        return _react.default.createElement(_FilterElement.default, {
          filter: f,
          entityName: _this2.config.entity,
          k: k,
          key: k,
          config: e.filterTypes,
          tva: _this2.props.tva
        });
      }), _react.default.createElement("button", {
        className: "btn btn-block btn-default",
        onClick: this.reload
      }, "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C")), this.renderActions && _react.default.createElement("fieldset", null, _react.default.createElement("legend", null, "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F"), this.renderActions()))));
    }
  }]);

  return TableViewComponent;
}(_react.Component);

exports.default = TableViewComponent;