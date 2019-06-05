import Types from '../types';
import DataStorage from '../../expand/data/DataStore';
const FLAG_STORAGE = { popular: 'popular', trending: 'trending' };
import { handleData } from '../ActionUtil';

/**
 * 获取最热数据的异步Action
 * @param {string} storeNames
 * @param {string} url
 * @param {number} pageSize
 */
export function onRefreshPopular(storeName, url, pageSize) {
  return dispatch => {
    // 刷新
    dispatch({
      type: Types.POPULAR_REFRESH,
      storeName: storeName,
    });
    let dataStore = new DataStorage();
    // 异步Action与数据流
    dataStore
      .fetchData(url, FLAG_STORAGE.popular)
      .then(data => {
        handleData(Types.POPULAR_REFRESH_SUCCESS, dispatch, storeName, data, pageSize);
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: Types.POPULAR_REFRESH_FAIL,
          storeName,
          err,
        });
      });
  };
}

// function handleData(dispatch, storeName, data, pageSize) {
//   let fixItems = [];
//   if (data && data.data && data.data.items) {
//     fixItems = data.data.items;
//   }
//   dispatch({
//     type: Types.POPULAR_REFRESH_SUCCESS,
//     // 第一次要加载的数据
//     projectModes: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),
//     items: fixItems,
//     storeName,
//     pageNo: 1,
//   });
// }

export function onLoadMorePopular(storeName, pageNo, pageSize, dataArray = [], callback) {
  return dispatch => {
    setTimeout(() => {
      // 模拟网络请求
      if ((pageNo - 1) * pageSize >= dataArray.length) {
        // 已加载完全部数据
        if (typeof callback === 'function') {
          callback('没有更多了～');
        }
        dispatch({
          type: Types.POPULAR_LOAD_MORE_FAIL,
          error: '没有更多了～',
          storeName: storeName,
          pageNo: --pageNo,
          projectModes: dataArray,
        });
      } else {
        // 本次和载入的最大数量
        let max = pageSize * pageNo > dataArray.length ? dataArray.length : pageSize * pageNo;
        dispatch({
          type: Types.POPULAR_LOAD_MORE_SUCCESS,
          storeName,
          pageNo,
          projectModes: dataArray.slice(0, max),
        });
      }
    }, 500);
  };
}
