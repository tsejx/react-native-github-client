import Types from '../actions/types';

const defaultState = {
  theme: '#0557FF',
};
/**
 * popular: {
 *      java: {
 *          iems: [],
 *          isLoading: false
 *      },
 *      ios: {
 *          iems: [],
 *          isLoading: false
 *      }
 * }
 * 0.State，横向发展
 * 1.如何动态配置Store，而动态获取Store（难点：动态获取StoreKey不稳定）
 * @param {*} state
 * @param {*} action
 * @return {{theme: (*|onAction|string)}}
 */
export default function onAction(state = defaultState, action) {
  // console.log('!!!!', action.type, action, state);
  switch (action.type) {
    // 下拉刷新
    case Types.TRENDING_REFRESH:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          items: action.items,
          isLoading: true,
          hideLoadingMore: true,
        },
      };
    // 下拉刷新成功
    case Types.TRENDING_REFRESH_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          // 原始数据
          items: action.items,
          // 当前要展示的数据
          showItems: action.showItems,
          pageNo: action.pageNo,
          isLoading: false,
          hideLoadingMore: false,
        },
      };

    // 下拉刷新失败
    case Types.TRENDING_REFRESH_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false,
        },
      };
    // 上拉加载更多成功
    case Types.TRENDING_LOAD_MORE_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          // items: action.items,
          showItems: action.showItems,
          pageNo: action.pageNo,
          hideLoadingMore: false,
        },
      };
    // 上拉加载更多失败
    case Types.TRENDING_LOAD_MORE_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          showItems: action.showItems,
          pageNo: action.pageNo,
          hideLoadingMore: true,
        },
      };
    default:
      return state;
  }
}
