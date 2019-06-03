import { AsyncStorage } from 'react-native';
import { FLAG_STORAGE } from 'constants';

export default class DataStore {
  saveData(url, data, callback) {
    if (!data || !url) {
      return;
    }
    AsyncStorage.setItem(url, JSON.stringify(this.wrapData(data)), callback);
  }

  wrapData(data) {
    return {
      data: data,
      timestamp: new Date().getTime(),
    };
  }
  /**
   * 获取本地数据
   * @param {string} url
   */
  fetchLocalData(url) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(e);
            console.error(e);
          }
        } else {
          reject(error);
          console.error(error);
        }
      });
    });
  }

  /**
   * 从网络获取数据
   * @param {string} url
   * @param {string} flag
   */
  fetchNetData(url, flag) {
    return new Promise((resolve, reject) => {
      if (flag !== FLAG_STORAGE.trending) {
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Network response was not ok.');
          })
          .then(responseData => {
            this.saveData(url, responseData);
            resolve(responseData);
          })
          .catch(error => reject(error));
      } else {
        new Trending()
          .fetchTreanding(url)
          .then(items => {
            if (!items) {
              throw new Error('responseData is null');
            }
            this.saveData(url, itens);
            resolve(items);
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  }
  /**
   * 获取数据
   * @param {string} url
   * @return {Promise}
   */
  fetchData(url) {
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url)
        .then(wrapData => {
          if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
            resolve(wrapData);
          } else {
            this.fetchNetData(url, flag)
              .then(data => {
                resolve(this._wrapData(data));
              })
              .catch(error => {
                reject(error);
              });
          }
        })
        .catch(error => {
          this.fetchNetData(url, flag)
            .then(data => {
              resolve(this._wrapData());
            })
            .catch(error => {
              reject(error);
            });
        });
    });
  }

  static checkTimestampValid(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date();
    targetData.setTime(timestamp);
    if (currentDate.getMonth() !== targetDate.getMonth()) {
      return false;
    }
    if (currentDate.getDate() !== targetDate.getDate()) {
      return false;
    }
    if (currentDate.getHours() - targetDate.getHours() > 4) {
      // 有效期4个小时
      return false;
    }
    if (currentDate.getMinutes() - targetDate.getMinutes() > 1) {
      return false;
    }
    return true;
  }
}
