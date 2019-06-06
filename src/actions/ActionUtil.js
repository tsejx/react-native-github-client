export function handleData(actionType, dispatch, storeName, data, pageSize) {
  let fixItems = [];
  if (data && data.data) {
    if (Array.isArray(data.data)) {
      fixItems = data.data;
    } else if (Array.isArray(data.data.items)) {
      fixItems = data.data.items;
    }
  }
  const temp = pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize);
  console.log('<==handleData==>', temp);
  dispatch({
    type: actionType,
    // 第一次要加载的数据
    projectModes: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),
    items: fixItems,
    storeName,
    pageNo: 1,
  });
}
