import ProjectModel from '../model/ProjectModel';
import Utils from '../utils/Utils';

export function handleData(actionType, dispatch, storeName, data, pageSize, favoriteDao) {
  let dataList = [];
  if (data && data.data) {
    if (Array.isArray(data.data)) {
      dataList = data.data;
    } else if (Array.isArray(data.data.items)) {
      dataList = data.data.items;
    }
  }
  // 首次加载数据
  const showItems = pageSize > dataList.length ? dataList : dataList.slice(0, pageSize);

  _projectModel(showItems, favoriteDao, data => {
    dispatch({
      type: actionType,
      // 第一次要加载的数据
      projectModel: data,
      items: dataList,
      storeName,
      pageNo: 1,
    });
  });


}

/**
 * 通过本地收藏状态包装每条仓库条目
 * @param  {any} showItems
 * @param  {any} favoriteDao
 * @param  {any} callback
 * @return {void}
 */
export async function _projectModel(showItems, favoriteDao, callback) {
  let keys = [];
  // try {
  //   // 获取收藏的key
  //   keys = await favoriteDao.getKeys();
  //   console.log('favoriteDao:', favoriteDao);
  // } catch (e) {
  //   console.log(e);
  // }

  try {
    //获取收藏的key
    keys = await favoriteDao.getKeys();
  } catch (e) {
    console.log(e);
  }

  let projectModel = [];
  for (let i = 0, len = showItems.length; i < len; i++) {
    projectModel.push(new ProjectModel(showItems[i], Utils.checkFavorite(showItems[i], keys)));
  }
  if (typeof callback === 'function') {
    callback(projectModel);
  }
}
