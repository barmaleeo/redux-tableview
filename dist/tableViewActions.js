"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeDetail = closeDetail;
exports.openDetail = openDetail;
exports.setCustom = setCustom;
exports.loadDetail = loadDetail;
exports.changeLimit = changeLimit;
exports.setFilterActive = setFilterActive;
exports.setFilterCond = setFilterCond;
exports.setFilterType = setFilterType;
exports.setFilterValue = setFilterValue;
exports.setChecked = setChecked;
exports.reload = reload;

var TV = _interopRequireWildcard(require("./tableViewConstants"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

//import {cDate, mysqld} from './dateHelper'
function closeDetail(entity) {
  return {
    type: TV.TABLEVIEW_CLOSE_DETAIL,
    payload: {
      entity: entity
    }
  };
}

function openDetail(entity, mode) {
  return {
    type: TV.TABLEVIEW_OPEN_DETAIL,
    payload: {
      entity: entity,
      mode: mode
    }
  };
}

function setCustom(entity, id) {
  return {
    type: TV.TABLEVIEW_SET_CUSTOM,
    payload: {
      entity: entity,
      id: id
    }
  };
}

function loadDetail(i, entity) {
  var root = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'office';
  return function (dispatch, getState) {
    var mode = getState()[entity].detailMode;
    dispatch({
      type: entity.toUpperCase() + '_LOAD_DETAIL_REQ',
      payload: {
        entity: entity
      }
    }); //dispatch({type:TV.TABLEVIEW_OPEN_DETAIL, payload:{entity:entity}});

    window.$.get(root + '/get-' + entity + '-detail', {
      id: i.id,
      mode: mode
    }, function (r) {
      if (r.status === 'ok') {
        dispatch({
          type: entity.toUpperCase() + '_LOAD_DETAIL_DONE',
          payload: {
            entity: entity,
            data: r
          }
        });
      } else {
        dispatch({
          type: entity.toUpperCase() + '_LOAD_DETAIL_ERR',
          payload: {
            entity: entity,
            msg: r.msg
          }
        });
      }
    }, 'json').fail(function (e) {
      dispatch({
        type: entity.toUpperCase() + '_LOAD_DETAIL_ERR',
        payload: {
          entity: entity,
          msg: e.responseText
        }
      });
    });
  };
}

function changeLimit(entity, value) {
  return function (dispatch, getState) {
    dispatch({
      type: TV.TABLEVIEW_SET_LIMIT,
      payload: {
        entity: entity,
        value: value
      }
    });
    saveFilterState(getState()[entity]);
  };
}

function setFilterActive(entity, id, value) {
  return function (dispatch, getState) {
    dispatch({
      type: TV.TABLEVIEW_SET_FILTER_ACTIVE,
      payload: {
        entity: entity,
        id: id,
        value: value
      }
    });
    saveFilterState(getState()[entity]);
  };
}

function setFilterCond(entity, id, cond) {
  return function (dispatch, getState) {
    dispatch({
      type: TV.TABLEVIEW_SET_FILTER_COND,
      payload: {
        entity: entity,
        id: id,
        cond: cond
      }
    });
    saveFilterState(getState()[entity]);
  };
}

function setFilterType(entity, id, filter, type) {
  return function (dispatch, getState) {
    dispatch({
      type: TV.TABLEVIEW_SET_FILTER_TYPE,
      payload: {
        entity: entity,
        id: id,
        filter: filter,
        type: type
      }
    });
    saveFilterState(getState()[entity]);
  };
}

function setFilterValue(entity, id, value) {
  return function (dispatch, getState) {
    dispatch({
      type: TV.TABLEVIEW_SET_FILTER_VALUE,
      payload: {
        entity: entity,
        id: id,
        value: value
      }
    });
    saveFilterState(getState()[entity]);
  };
}

function setChecked(entity, id, checked) {
  return {
    type: TV.TABLEVIEW_SET_ROW_CHECKED,
    payload: {
      entity: entity,
      id: id,
      checked: checked
    }
  };
}

function reload(entity, filtersArray, limit) {
  var root = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'office';
  var loadParams = arguments.length > 4 ? arguments[4] : undefined;
  return function (dispatch, getState) {
    var filters = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = filtersArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var f = _step.value;

        if (f.active) {
          var filter = {
            type: f.token,
            value: f.value,
            condition: f.cond
          };

          if (f.like === true) {
            filter.like = true;
          }

          if (f.having === true) {
            filter.having = true;
          }

          if (f.date === true) {
            filter.date = true;
            var date = f.value.split('.');

            if (date.length === 3) {
              filter.value = date[2] + '-' + date[1] + '-' + date[0];
            } else {
              filter.value = f.value;
            }
          }

          filters.push(filter);
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

    dispatch({
      type: TV.TABLEVIEW_RELOAD_REQ,
      payload: {
        entity: entity
      }
    });
    window.$.get(root + '/get-' + entity.toLowerCase() + '-table', {
      filters: filters,
      limit: limit,
      params: loadParams
    }, function (r) {
      if (r.status === 'ok') {
        dispatch({
          type: TV.TABLEVIEW_RELOAD_DONE,
          payload: {
            entity: entity,
            items: r.items,
            params: loadParams
          }
        });
      } else {
        dispatch({
          type: TV.TABLEVIEW_RELOAD_ERR,
          payload: {
            entity: entity,
            msg: r.msg,
            params: loadParams
          }
        });
      }
    }, 'json').fail(function (e) {
      dispatch({
        type: TV.TABLEVIEW_RELOAD_ERR,
        payload: {
          entity: entity,
          msg: e.responseText,
          params: loadParams
        }
      });
    });
  };
}

function saveFilterState(state) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'office';
  var config = []; //let i = 0;

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = state.filters[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var f = _step2.value;
      var filter = {
        filter: f.type,
        active: f.active === true,
        value: f.value
      }; //filter.value = state.filterTypes[f.type].variants?state.filterTypes[f.type].variants[f.value].value:f.value;

      if (f.cond) {
        filter.cond = f.cond;
      }

      config.push(filter);
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

  window.$.get(root + '/save-filter-state', {
    config: JSON.stringify(config),
    type: state.saveType,
    limit: state.limit
  });
  console.log('filterConfiguration', config);
}