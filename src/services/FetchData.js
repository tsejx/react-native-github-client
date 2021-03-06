import { AsyncStorage, Alert } from 'react-native';
import Trending from 'GitHubTrending';
import { FLAG_STORAGE } from 'constants/flag';

export default class FetchData {
  saveData(url, data, callback) {
    if (!data || !url) {
      throw new Error(`'data' and 'url' must be defined`);
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
   * 获取数据,优先获取本地数据,如果无本地数据或本地数据过期则获取网络数据
   * @param url
   * @return {Promise}
   */
  get(url, flag) {
    return new Promise((resolve, reject) => {
      // 先获取本地数据
      this.fetchLocalData(url)
        .then(wrapData => {
          if (wrapData && FetchData.checkTimestampValid(wrapData.timestamp)) {
            // 本地有缓存并且缓存未过期
            resolve(wrapData);
          } else {
            // 本地缓存不存在或者本地缓存已经过期
            // 则重新从服务端获取数据
            this.fetchNetData(url, flag)
              .then(data => {
                resolve(this.wrapData(data));
              })
              .catch(err => {
                console.error(err);
                reject(err);
              });
          }
        })
        .catch(err => {
          // 捕获错误将重新进行网络请求
          this.fetchNetData(url, flag)
            .then(data => {
              resolve(this.wrapData(data));
            })
            .catch(err => {
              console.error(err);
              reject(err);
            });
        });
    });
  }

  /**
   * 获取本地数据
   * @param url
   * @return {Promise}
   */
  fetchLocalData(url) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (error, result) => {
        if (!error) {
          try {
            // 本地有缓存
            resolve(JSON.parse(result));
          } catch (e) {
            reject(e);
            console.log(e);
          }
        } else {
          reject(error);
          console.log(error);
        }
      });
    });
  }

  /**
   * 从网络获取数据
   * @param url
   * @param flag
   * @return {Promise}
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
          .catch(error => {
            reject(error);
          });
      } else {
        // GithubTrending页面解析库
        new Trending()
          .fetchTrending(url)
          .then(items => {
            if (!items) {
              throw new Error('responseData is null');
            }
            this.saveData(url, items);
            resolve(items);
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  }

  /**
   * 检查timestamp 是否在有效期内
   * @param timestamp 项目更新时间
   * @return {boolean} true 不需要更新, false 需要更新
   */

  static checkTimestampValid(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date();
    targetDate.setTime(timestamp);
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
