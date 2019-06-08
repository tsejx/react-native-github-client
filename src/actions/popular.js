import Types from './types';
import FetchData from '../services/FetchData';
import { _projectModel, handleData } from './ActionUtil';
import handleOriginalData from 'utils/handleOriginalData';
import InitialValue from 'constants/initialValue';
const FLAG_STORAGE = { popular: 'popular', trending: 'trending' };

/**
 * 获取最热数据的异步Action
 * @param {string} storeNames
 * @param {string} url
 * @param favoriteDao
 */
export function onRefreshPopular(storeName, url, favoriteDao) {
  return dispatch => {
    // 刷新
    dispatch({
      type: Types.POPULAR_REFRESH,
      storeName: storeName,
    });

    let fetchData = new FetchData();

    // 异步Action与数据流
    fetchData
      .get(url, FLAG_STORAGE.popular)
      .then(res => {
        const dataSource = handleOriginalData(res);

        const showData =
          InitialValue.pageSize > dataSource.length
            ? dataSource
            : dataSource.slice(0, InitialValue.pageSize);

        dispatch({
          type: Types.POPULAR_REFRESH_SUCCESS,
          storeName,
          showItems: showData,
          items: dataSource,
          pageNo: 1,
        });
      })
      .catch(err => {
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
 * @param  {any} [dataSource=[]]
 * @param  {any} fanvoriteDao
 * @param  {any} callback
 * @return
 */
export function onLoadMorePopular(
  storeName,
  dataSource = [],
  pageNo,
  favoriteDao,
  callback
) {
  return dispatch => {
    // 模拟网络请求
    setTimeout(() => {
      if ((pageNo - 1) * InitialValue.pageSize >= dataSource.length) {
        // 已加载完全部数据
        if (typeof callback === 'function') {
          callback();
        }

        dispatch({
          type: Types.POPULAR_LOAD_MORE_FAIL,
          storeName: storeName,
          pageNo: --pageNo,
          showItems: dataSource,
        });

      } else {
        // 本次和载入的最大数量
        let max = InitialValue.pageSize * pageNo > dataSource.length ? dataSource.length : InitialValue.pageSize * pageNo;

          dispatch({
            type: Types.POPULAR_LOAD_MORE_SUCCESS,
            storeName: storeName,
            pageNo: pageNo,
            showItems: dataSource.slice(0, max),
          });

      }
    }, 500);
  };
}
