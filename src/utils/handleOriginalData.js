export default function handleOriginalData(data) {
  let dataList = [];
  if (data && data.data) {
    if (Array.isArray(data.data)) {
      dataList = data.data;
    } else if (Array.isArray(data.data.items)) {
      dataList = data.data.items;
    }
  }

  return dataList;
}
