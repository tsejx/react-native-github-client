import Types from './types';
import FetchData from '../services/FetchData';
import { _projectModel, handleData } from './ActionUtil';
const FLAG_STORAGE = { popular: 'popular', trending: 'trending' };

/**
 * 获取最热数据的异步action
 * @param storeName
 * @param url
 * @param pageSize
 * @return {function}
 */
export function onRefreshTrending(storeName, url, pageSize, favoriteDao) {
  return dispatch => {
    dispatch({
      type: Types.TRENDING_REFRESH_SUCCESS,
      storeName: storeName,
    });
    let dataStore = new FetchData();
    // 异步Action与数据流
    dataStore
      .get(url, FLAG_STORAGE.trending) // 异步action与数据流
      .then(data => {
        handleData(Types.TRENDING_REFRESH_SUCCESS, dispatch, storeName, data, pageSize, favoriteDao);
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: Types.TRENDING_REFRESH_FAIL,
          storeName,
          err,
        });
      });
  };
}

/**
 * 加载更多
 * @param storeName
 * @param pageNo 第几页
 * @param pageSize 每页展示条数
 * @param dataArray 原始数据
 * @param callBack 回调函数,可以通过回调函数来向调用页面通信: 比如异常信息的展示,没有更多等
 * @returns {function(*)}
 */
export function onLoadMoreTrending(storeName, pageNo, pageSize, dataArray = [], favoriteDao, callBack) {
  return dispatch => {
    setTimeout(() => {
      // 模拟网络请求
      if ((pageNo - 1) * pageSize >= dataArray.length) {
        //  已加载完全部数据
        if (typeof callBack === 'function') {
          callBack('no more');
        }
        dispatch({
          type: Types.TRENDING_LOAD_MORE_FAIL,
          error: 'no more',
          storeName: storeName,
          pageNo: --pageNo,
          projectModel: dataArray,
        });
      } else {
        //  本次和载入的最大数量
        let max = pageSize * pageNo > dataArray.length ? dataArray.length : pageSize * pageNo;

        _projectModel(dataArray.slice(0, max), favoriteDao, data => {
        dispatch({
          type: Types.TRENDING_LOAD_MORE_SUCCESS,
          storeName,
          pageNo,
          projectModel: data,
        });
        })
      }
    }, 500);
  };
}
