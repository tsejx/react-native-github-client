import { FLAG_STORAGE } from 'constants/flag'

export default class FavoriteUtil {
  /**
   * FavoriteIcon单击回调函数
   * @param favoriteDao
   * @param item
   * @param isFavorite
   * @param flag
   */
  static onFavorite(favoriteDao, item, isFavorite, flag) {
    const key = flag === FLAG_STORAGE.trending ? item.fullName : item.id.toString()
    if(isFavorite) {
      favoriteDao.save(key, JSON.stringify(item))
    } else {
      favoriteDao.remove(key)
    }
  }
}
