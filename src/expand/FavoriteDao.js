import { AsyncStorage } from 'react-native';
const FAVORITE_KEY_PREFIX = 'favorite_';

export default class FavoriteDao {
  constructor(flag) {
    this.itemKey = FAVORITE_KEY_PREFIX + flag;
  }

  /**
   * 保存收藏项目信息
   * @param  {number} key 项目id
   * @param  {string} value 收藏的项目
   * @return {void}@memberof FavoriteDao
   */
  save(key, value) {
    AsyncStorage.setItem(key, value, (err, res) => {
      if (!err) {
        this.update(key, true);
      }
    });
  }

  remove(key) {
    AsyncStorage.removeItem(key, (err, res) => {
      if (!err) {
        this.update(key, false);
      }
    });
  }

  update(key, isSave) {
    AsyncStorage.getItem(this.itemKey, (err, res) => {
      if (!err) {
        let keys = [];

        if (res) {
          keys = JSON.parse(res);
        }

        let index = keys.indexOf(key);

        // 如果是添加且Key不存在则添加到数组中
        if (isSave && index === -1) {
          keys.push(key);
        }

        // 如果删除且Key存在则将其从数组中移除
        if (!isSave && index !== -1) {
          keys.splice(index, 1);
        }

        AsyncStorage.setItem(this.itemKey, JSON.stringify(keys));
      }
    });
  }

  getKeys() {
    return new Promise((res, rej) => {
      AsyncStorage.getItem(this.itemKey, (err, res) => {
        if (!err) {
          try {
            res(JSON.parse(res));
          } catch (e) {
            rej(err);
          }
        } else {
          rej(err);
        }
      });
    });
  }

  getAll() {
    return new Promise((res, rej) => {
      this.getKeys()
        .then(keys => {
          let items = [];
          if (keys) {
            AsyncStorage.multiGet(keys, (err, stores) => {
              try {
                stores.map((result, index, store) => {
                  let key = store[index][0];
                  let value = store[index][1];
                  if (value) {
                    item.push(JSON.parse(value));
                  }
                });
                res(items);
              } catch (e) {
                rej(e);
              }
            });
          } else {
            res(items);
          }
        })
        .catch(e => {
          rej(e);
        });
    });
  }
}
