"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tableViewReducer;

var TV = _interopRequireWildcard(require("./tableViewConstants"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
  var newState = state;

  switch (action.type) {
    case TV.TABLEVIEW_SET_CUSTOM:
      if (pl.entity === name) {
        newState = _objectSpread({}, state, {
          showCustom: pl.id
        });
      }

      break;

    case TV.TABLEVIEW_RELOAD_REQ:
      if (pl.entity === name) {
        return _objectSpread({}, state, {
          loading: true,
          items: []
        });
      }

      break;

    case TV.TABLEVIEW_RELOAD_DONE:
      if (pl.entity === name) {
        newState = _objectSpread({}, state, {
          items: pl.items,
          loading: false,
          errMsg: undefined
        });
      }

      break;

    case TV.TABLEVIEW_RELOAD_ERR:
      if (pl.entity === name) {
        newState = _objectSpread({}, state, {
          loading: false,
          errMsg: pl.msg
        });
      }

      break;

    case TV.TABLEVIEW_SET_LIMIT:
      if (pl.entity === name) {
        if (parseInt(pl.value) > 0) {
          newState = _objectSpread({}, state, {
            limit: pl.value
          });
        }
      }

      break;

    case TV.TABLEVIEW_SET_FILTER_ACTIVE:
      if (pl.entity === name) {
        newState = _objectSpread({}, state);
        newState.filters[pl.id] = _objectSpread({}, newState.filters[pl.id], {
          active: pl.value
        });
      }

      break;

    case TV.TABLEVIEW_SET_FILTER_VALUE:
      if (pl.entity === name) {
        newState = _objectSpread({}, state);
        newState.filters[pl.id] = _objectSpread({}, newState.filters[pl.id], {
          value: pl.value
        });
      }

      break;

    case TV.TABLEVIEW_SET_ROW_CHECKED:
      {
        if (pl.entity === name) {
          newState = _objectSpread({}, state);

          if (parseInt(pl.id) === -1) {
            newState.items = state.items.slice();
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = newState.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var i = _step.value;
                i.checked = pl.checked;
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
          } else {
            newState.items[pl.id] = _objectSpread({}, newState.items[pl.id], {
              checked: pl.checked
            });
          }
        }

        break;
      }

    case TV.TABLEVIEW_SET_FILTER_COND:
      {
        if (pl.entity === name) {
          newState = _objectSpread({}, state);
          newState.filters[pl.id] = _objectSpread({}, newState.filters[pl.id], {
            cond: pl.cond
          });
        }

        break;
      }

    case TV.TABLEVIEW_SET_FILTER_TYPE:
      {
        if (pl.entity === name) {
          //console.log(pl, state);
          var _newState = _objectSpread({}, state);

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

          _newState.filters[pl.id] = filter;
        }

        break;
      }

    case TV.TABLEVIEW_OPEN_DETAIL:
      if (pl.entity === name) {
        newState = _objectSpread({}, state, {
          showDetail: true,
          detailMode: parseInt(pl.mode) ? pl.mode : 0
        });
      }

      break;

    case TV.TABLEVIEW_CLOSE_DETAIL:
      if (pl.entity === name) {
        newState = _objectSpread({}, state, {
          showDetail: false
        });
      }

      break;

    case name.toUpperCase() + '_LOAD_DONE':
      newState = _objectSpread({}, state, {
        items: pl.items
      });
      var filterConfig;

      if (pl.filterStates != null) {
        try {
          filterConfig = JSON.parse(pl.filterStates.config);
        } catch (e) {}

        var filterLimit = pl.filterStates.limit;

        if (!isNaN(parseInt(filterLimit)) && filterLimit > 0) {
          newState.limit = parseInt(filterLimit);
        }
      }

      var filterTypes = newState.filterTypes;
      var n = 0;
      var filters = [];

      if (filterConfig) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = filterConfig[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var fc = _step2.value;

            var _filter = _objectSpread({}, filterTypes[fc.filter], {
              type: fc.filter,
              active: fc.active,
              cond: fc.cond
            });

            if (fc.filter >= 0 && fc.filter < filterTypes.length && Array.isArray(filterTypes[fc.filter].variants) && filterTypes[fc.filter].variants.length > 0 && !(fc.value >= 0 && fc.value < filterTypes[fc.filter].variants.length)) {
              _filter.value = filterTypes[fc.filter].variants[0].value;
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
        filters = newState.filters;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = filters[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var f = _step3.value;
            var _config = filterTypes[f.type];

            if (_config.cond) {
              if (f.cond === undefined) {
                f.cond = '=';
              }
            }

            if (_config.variants && Array.isArray(_config.variants) && _config.variants.length > 0) {
              if (!(f.value >= 0 && f.value < _config.variants.length)) {
                f.value = _config.variants[0].value;
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
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }

      newState.init = true;
      newState.filters = filters;
      break;

    case name.toUpperCase() + '_LOAD_DETAIL_REQ':
      if (pl.entity === name) {
        newState = _objectSpread({}, state);
        newState.showDetail = true;
        newState.selectedItem = {
          checked: 0,
          items: []
        };
        newState.loadDetail = true;
        newState.loadDetailErr = false;
      }

      break;

    case name.toUpperCase() + '_LOAD_DETAIL_DONE':
      if (pl.entity === name) {
        newState = _objectSpread({}, state);
        newState.load = false;
        newState.loadErr = false;
        newState.loadDetail = false;
        newState.selectedItem = pl.data;
        newState.selectedItem.checked = 0;
      }

      break;

    case name.toUpperCase() + '_LOAD_DETAIL_ERR':
      if (pl.entity === name) {
        newState = _objectSpread({}, state);
        newState.showDetail = false;
        newState.loadDetail = false;
        newState.loadDetailErr = true;
      }

      break;
  }

  if (typeof selectedItemReducer === 'function') {
    if (newState === state) {
      newState = _objectSpread({}, newState);
    }

    if (newState.selectedItem === state.selectedItem) {
      newState.selectedItem = _objectSpread({}, state.selectedItem);
    }

    var selectedName;

    if (name.length > 4 && name.substr(name.length - 3, 3) === 'ies') {
      selectedName = name.substr(0, name.length - 3) + 'y';
    } else if (name[name.length - 1] === 's') {
      selectedName = name.substr(0, name.length - 1);
    } else {
      selectedName = name;
    }

    newState.selectedItem[selectedName] = selectedItemReducer(newState.selectedItem[selectedName], action);
  } else if (_typeof(selectedItemReducer) === 'object') {
    var changed = false;

    for (var key in selectedItemReducer) {
      if (selectedItemReducer.hasOwnProperty(key)) {
        var keyState = selectedItemReducer[key](newState.selectedItem[key], action);

        if (newState.selectedItem[key] !== keyState) {
          newState.selectedItem[key] = keyState;
          changed = true;
        }
      }
    }

    if (changed) {
      newState.selectedItem = _objectSpread({}, newState.selectedItem);
    }
  }

  return newState;
}