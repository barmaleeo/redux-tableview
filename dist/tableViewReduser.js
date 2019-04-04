"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tableViewReducer;

var TV = _interopRequireWildcard(require("./tableViewConstants"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  loading: true,
  limit: 100,
  filters: [],
  items: [],
  selectedItem: {
    checked: 0,
    items: []
  }
};

function tableViewReducer(name) {
  var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : initialState;
  var action = arguments.length > 2 ? arguments[2] : undefined;
  var selectedItemReducer = arguments.length > 3 ? arguments[3] : undefined;
  var pl = action.payload;
  console.log('tableViewReducer ', action.type, name, pl);

  switch (action.type) {
    case TV.TABLEVIEW_SET_CUSTOM:
      if (pl.entity === name) {
        return _objectSpread({}, state, {
          showCustom: pl.id
        });
      } else {
        return state;
      }

    case TV.TABLEVIEW_RELOAD_REQ:
      if (pl.entity === name) {
        return _objectSpread({}, state, {
          loading: true,
          items: []
        });
      } else {
        return state;
      }

    case TV.TABLEVIEW_RELOAD_DONE:
      if (pl.entity === name) {
        return _objectSpread({}, state, {
          items: pl.items,
          loading: false,
          errMsg: undefined
        });
      } else {
        return state;
      }

    case TV.TABLEVIEW_RELOAD_ERR:
      if (pl.entity === name) {
        return _objectSpread({}, state, {
          loading: false,
          errMsg: pl.msg
        });
      } else {
        return state;
      }

    case TV.TABLEVIEW_SET_LIMIT:
      if (pl.entity === name) {
        if (parseInt(pl.value) > 0) {
          return _objectSpread({}, state, {
            limit: pl.value
          });
        }
      }

      return state;

    case TV.TABLEVIEW_SET_FILTER_ACTIVE:
      {
        if (pl.entity === name) {
          var newState = _objectSpread({}, state);

          newState.filters[pl.id] = _objectSpread({}, newState.filters[pl.id], {
            active: pl.value
          });
          return newState;
        } else {
          return state;
        }
      }

    case TV.TABLEVIEW_SET_FILTER_VALUE:
      {
        if (pl.entity === name) {
          var _newState = _objectSpread({}, state);

          _newState.filters[pl.id] = _objectSpread({}, _newState.filters[pl.id], {
            value: pl.value
          });
          return _newState;
        } else {
          return state;
        }
      }

    case TV.TABLEVIEW_SET_ROW_CHECKED:
      {
        if (pl.entity === name) {
          var _newState2 = _objectSpread({}, state);

          _newState2.items[pl.id] = _objectSpread({}, _newState2.items[pl.id], {
            checked: pl.checked
          });
          return _newState2;
        } else {
          return state;
        }
      }

    case TV.TABLEVIEW_SET_FILTER_COND:
      {
        if (pl.entity === name) {
          var _newState3 = _objectSpread({}, state);

          _newState3.filters[pl.id] = _objectSpread({}, _newState3.filters[pl.id], {
            cond: pl.cond
          });
          return _newState3;
        } else {
          return state;
        }
      }

    case TV.TABLEVIEW_SET_FILTER_TYPE:
      {
        if (pl.entity === name) {
          console.log(pl, state);

          var _newState4 = _objectSpread({}, state);

          var filter = _objectSpread({}, pl.filter);

          filter.type = pl.type;

          if (typeof filter.cond == 'string' && state.filters[pl.id].cond) {
            filter.cond = state.filters[pl.id].cond;
          } else if (filter.cond === true) {
            filter.cond = '=';
          }

          filter.active = state.filters[pl.id].active;

          if (filter.variants && filter.variants.length > 0) {
            filter.value = filter.variants[0].value;
          } else if (filter.number) {
            filter.value = 0;
          } else if (filter.date) {
            var date = new Date();
            filter.value = date.toLocaleDateString('ru');
          } else {
            filter.value = '';
          }

          _newState4.filters[pl.id] = filter;
          return _newState4;
        } else {
          return state;
        }
      }

    case TV.TABLEVIEW_OPEN_DETAIL:
      if (pl.entity === name) {
        return _objectSpread({}, state, {
          showDetail: true
        });
      } else {
        return state;
      }

    case TV.TABLEVIEW_CLOSE_DETAIL:
      if (pl.entity === name) {
        return _objectSpread({}, state, {
          showDetail: false
        });
      } else {
        return state;
      }

    case name.toUpperCase() + '_LOAD_DONE':
      {
        var newLoadState = _objectSpread({}, state, {
          items: pl.items
        });

        var filterConfig;

        if (pl.filterStates != null) {
          try {
            filterConfig = JSON.parse(pl.filterStates.config);
          } catch (e) {}

          var filterLimit = pl.filterStates.limit;

          if (!isNaN(parseInt(filterLimit)) && filterLimit > 0) {
            newLoadState.limit = parseInt(filterLimit);
          }
        }

        var filterTypes = newLoadState.filterTypes;
        var n = 0;
        var filters = [];

        if (filterConfig) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = filterConfig[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var fc = _step.value;

              var _filter = _objectSpread({}, filterTypes[fc.filter], {
                type: fc.filter,
                active: fc.active,
                cond: fc.cond
              });

              if (fc.filter >= 0 && fc.filter < filterTypes.length && Array.isArray(filterTypes[fc.filter].variants) && filterTypes[fc.filter].variants.length > 0 && !(fc.value >= 0 && fc.value < filterTypes[fc.filter].variants.length)) {
                _filter.value = 0;
              } else {
                _filter.value = fc.value;
              }

              _filter.token = filterTypes[fc.filter].token;
              _filter.having = filterTypes[fc.filter].having;
              _filter.date = filterTypes[fc.filter].date;
              _filter.like = filterTypes[fc.filter].like;
              _filter.variants = filterTypes[fc.filter].variants;
              filters.push(_filter);
              n++;
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

          for (n; n < filters.length; n++) {
            var config = filterTypes[n];
            var bf = filters[n];
            bf.token = config.token;
            bf.having = !!config.having;
            bf.date = !!config.date;
            bf.like = !!config.like;
            bf.variants = config.variants;
          }
        } else {
          filters = newLoadState.filters;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = filters[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var f = _step2.value;
              var _config = filterTypes[f.type];

              if (_config.cond) {
                if (f.cond === undefined) {
                  f.cond = '=';
                }
              }

              if (_config.variants && Array.isArray(_config.variants) && _config.variants.length > 0) {
                if (!(f.value >= 0 && f.value < _config.variants.length)) {
                  f.value = 0;
                }

                f.variants = _config.variants;
              } else if (_config.date) {
                var _date = new Date();

                f.value = _date.toLocaleDateString('ru');
              } else if (_config.number) {
                f.value = 0;
              } else {
                f.value = '';
              }

              f.token = _config.token;
              f.having = !!_config.having;
              f.like = !!_config.like;
              f.date = !!_config.date;
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }

        newLoadState.init = true;
        newLoadState.filters = filters;
        return newLoadState;
      }

    case name.toUpperCase() + '_LOAD_DETAIL_REQ':
      {
        if (pl.entity === name) {
          var _newState5 = _objectSpread({}, state);

          _newState5.loadDetail = true;
          _newState5.loadDetailErr = false;
          return _newState5;
        } else {
          return state;
        }
      }

    case name.toUpperCase() + '_LOAD_DETAIL_DONE':
      {
        if (pl.entity === name) {
          var _newState6 = _objectSpread({}, state);

          _newState6.load = false;
          _newState6.loadErr = false;
          _newState6.loadDetail = false;
          _newState6.selectedItem = pl.data;
          _newState6.selectedItem.checked = 0;
          return _newState6;
        } else {
          return state;
        }
      }

    case name.toUpperCase() + '_LOAD_DETAIL_ERR':
      {
        if (pl.entity === name) {
          var _newState7 = _objectSpread({}, state);

          _newState7.loadDetail = false;
          _newState7.loadDetailErr = true;
          return _newState7;
        } else {
          return state;
        }
      }

    default:
      if (typeof selectedItemReducer === 'function') {
        var _newState8 = _objectSpread({}, state);

        _newState8.selectedItem = _objectSpread({}, state.selectedItem);
        var selectedName;

        if (name[name.length - 1] === 's') {
          selectedName = name.substr(0, name.length - 1);
        } else {
          selectedName = name;
        }

        _newState8.selectedItem[selectedName] = selectedItemReducer(state.selectedItem[selectedName], action);
        return _newState8;
      }

      return state;
  }
}