import Types from './types';
import FetchData from '../services/FetchData';
import { _projectModel, handleData } from './ActionUtil';
const FLAG_STORAGE = { popular: 'popular', trending: 'trending' };

/**
 * 获取最热数据的异步Action
 * @param {string} storeNames
 * @param {string} url
 * @param {number} pageSize
 * @param favoriteDao
 */
export function onRefreshPopular(storeName, url, pageSize, favoriteDao) {
  return dispatch => {
    // 刷新
    dispatch({
      type: Types.POPULAR_REFRESH,
      storeName: storeName,
    });

    let dataStore = new FetchData();

    // 异步Action与数据流
    dataStore
      .get(url, FLAG_STORAGE.popular)
      .then(data => {
        handleData(Types.POPULAR_REFRESH_SUCCESS, dispatch, storeName, data, pageSize, favoriteDao);
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

/**
 * 加载更多
 * @export
 * @param  {any} storeName
 * @param  {any} pageNo
 * @param  {any} pageSize
 * @param  {any} [dataArray=[]]
 * @param  {any} fanvoriteDao
 * @param  {any} callback
 * @return
 */
export function onLoadMorePopular(
  storeName,
  pageNo,
  pageSize,
  dataArray = [],
  favoriteDao,
  callback
) {
  console.log('onLoadMore:', storeName);
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
          projectModel: dataArray,
        });
      } else {
        // 本次和载入的最大数量
        let max = pageSize * pageNo > dataArray.length ? dataArray.length : pageSize * pageNo;

        _projectModel(dataArray.slice(0, max), favoriteDao, data => {
          dispatch({
            type: Types.POPULAR_LOAD_MORE_SUCCESS,
            storeName,
            pageNo,
            projectModel: data,
          });
        });
      }
    }, 500);
  };
}
