import Types from './types';
import FetchData from '../services/FetchData';
import { _projectModel, handleData } from './ActionUtil';
const FLAG_STORAGE = { popular: 'popular', trending: 'trending' };
import handleOriginalData from 'utils/handleOriginalData';
import InitialValue from 'constants/initialValue';

/**
 * 获取最热数据的异步action
 * @param storeName
 * @param url
 * @return {function}
 */
export function onRefreshTrending(storeName, url, favoriteDao) {
  return dispatch => {
    dispatch({
      type: Types.TRENDING_REFRESH,
      storeName: storeName,
    });

    let fetchData = new FetchData();

    // 异步Action与数据流
    fetchData
      .get(url, FLAG_STORAGE.trending) // 异步action与数据流
      .then(res => {
        const dataSource = handleOriginalData(res);

        const showData =
          InitialValue.pageSize > dataSource.length
            ? dataSource
            : dataSource.slice(0, InitialValue.pageSize);

        dispatch({
          type: Types.TRENDING_REFRESH_SUCCESS,
          storeName,
          showItems: showData,
          items: dataSource,
          pageNo: 1,
        });
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
 * @param dataSource 原始数据
 * @param callBack 回调函数,可以通过回调函数来向调用页面通信: 比如异常信息的展示,没有更多等
 * @returns {function(*)}
 */
export function onLoadMoreTrending(storeName, pageNo, dataSource = [], favoriteDao, callBack) {
  return dispatch => {
    setTimeout(() => {
      // 模拟网络请求
      if ((pageNo - 1) * InitialValue.pageSize >= dataSource.length) {
        //  已加载完全部数据
        if (typeof callBack === 'function') {
          callBack('no more');
        }
        dispatch({
          type: Types.TRENDING_LOAD_MORE_FAIL,
          error: 'no more',
          storeName: storeName,
          pageNo: --pageNo,
          showItems: dataSource,
        });
      } else {
        //  本次和载入的最大数量
        let max =
          InitialValue.pageSize * pageNo > dataSource.length
            ? dataSource.length
            : InitialValue.pageSize * pageNo;

        dispatch({
          type: Types.TRENDING_LOAD_MORE_SUCCESS,
          storeName: storeName,
          pageNo: pageNo,
          showItems: dataSource.slice(0, max),
        });
      }
    }, 500);
  };
}
