import Types from '../../actions/types';

const defaultState = {
  theme: 'blue',
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
  switch (action.type) {
    // 下拉刷新成功
    case Types.POPULAR_REFRESH_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          // 原始数据
          items: action.items,
          // 当前要展示的数据
          projectModes: action.projectModes,
          isLoading: false,
          hideLoadingMore: false,
          pageNo: action.pageNo,
        },
      };
    // 下拉刷新
    case Types.POPULAR_REFRESH:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          // items: action.items,
          isLoading: true,
          hideLoadingMore: true,
        },
      };
    // 下拉刷新失败
    case Types.POPULAR_REFRESH_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false,
        },
      };
    // 上拉加载更多成功
    case Types.POPULAR_LOAD_MORE_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          // items: action.items,
          projectModes: action.projectModes,
          hideLoadingMore: false,
          pageNo: action.pageNo,
        },
      };
    // 上拉加载更多失败
    case Types.POPULAR_LOAD_MORE_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModes: action.projectModes,
          hideLoadingMore: true,
          pageNo: action.pageNo,
        },
      };
    default:
      return state;
  }
}
