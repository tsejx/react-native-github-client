import AsyncStorage from '@react-native-community/async-storage';
import GitHubTrending from 'GitHubTrending';

import { FLAG_STORAGE } from 'constants/flag';

export default class Request {

  constructor(flag) {
    this.flag = flag;
    if (flag === FLAG_STORAGE.trending) this.trending = new GitHubTrending();
  }

  fetchNetRepository(url) {
    return new Promise((resolve, reject) => {
      if (this.flag !== FLAG_STORAGE.trending) {
        fetch(url)
          .then(response => response.json())
          .catch(error => {
            reject(error);
          })
          .then(responseData => {
            if (this.flag === FLAG_STORAGE.mine && responseData) {
              this.saveRespository(url, responseData);
              resolve(responseData);
            } else if (responseData && responseData.items) {
              this.saveRespository(url, responseData.items);
              resolve(responseData.items);
            } else {
              reject(new Error('responseData is null'));
            }
          });
      } else {
        this.trending
          .fetchTrending(url)
          .then(items => {
            if (!items) {
              reject(new Error('responseData is null'));
              return;
            }
            resolve(items);
            this.saveRespository(url, items);
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  }

  async saveRespository(url, items, callBack) {
    if (!url || !items) return;
    let wrapData;
    if (this.flag === FLAG_STORAGE.mine) {
      wrapData = { item: items, update_date: new Date().getTime() };
    } else {
      wrapData = { items: items, update_date: new Date().getTime() };
    }
    await AsyncStorage.setItem(url, JSON.stringify(wrapData), callBack);
  }

  async emoveRepository(url) {
    await AsyncStorage.removeItem(url, (error, result) => {
      if (error) console.log(error);
    });
  }
}
