import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  DeviceEventEmitter,
} from 'react-native';
import { connect } from 'react-redux';

import actions from '../../actions/index';

import TrendingItem from 'components/TrendingItem';

import Toast from 'react-native-easy-toast';
import NavigationUtil from '../../navigator/NavigationUtil';
import FavoriteDao from '../../expand/FavoriteDao';
import FavoriteUtil from '../../model/FavoriteUtil';
import { FLAG_STORAGE } from 'constants/flag';

import api from 'constants/api';

const THEME_COLOR = 'red';
const PAGE_SIZE = 10;
const EVENT_TYPE_TIME_SPAN_CHANGE = 'EVENT_TYPE_TIME_SPAN_CHANGE';

const favoriteDao = new FavoriteDao(FLAG_STORAGE.trending);

type Props = {};
class TrendingTab extends Component<Props> {
  constructor(props) {
    super(props);
    const { tabLabel, timeSpan } = this.props;
    this.storeName = tabLabel;
    this.timeSpan = timeSpan;
    this.renderItem = this.renderItem.bind(this);
  }
  componentDidMount() {
    this.loadData();
    this.timeSpanChangeListener = DeviceEventEmitter.addListener(
      EVENT_TYPE_TIME_SPAN_CHANGE,
      timeSpan => {
        this.timeSpan = timeSpan;
        this.loadData();
      }
    );
  }
  componentWillUnmount() {
    if (this.timeSpanChangeListener) {
      this.timeSpanChangeListener.remove();
    }
  }
  loadData(loadMore) {
    if (!loadMore) {
      this.onRefresh();
    } else {
      this.onLoadMore();
    }
  }

  onRefresh() {
    const url = api.trending({key: this.storeName, text: this.timeSpan.searchText })
    this.props.onRefreshTrending(this.storeName, url, favoriteDao);
  }

  onLoadMore() {
    const store = this.getStore();
    this.props.onLoadMoreTrending(
      this.storeName,
      ++store.pageNo,
      store.items,
      favoriteDao,
      callback => {
        this.refs.toast.show('沒有更多了～');
      }
    );
  }

  getStore() {
    const { trending } = this.props;
    let store = trending[this.storeName];
    if (!store) {
      store = {
        items: [],
        isLoading: false,
        // 需要显示的数据
        showItems: [],
        // 默认隐藏加载更多
        hideLoadingMore: true,
      };
    }
    // console.log('store', store)
    return store;
  }

  // generateFetchUrl(key) {
  //   const URL = 'https://github.com/trending/';
  //   const QUERY_STR = '?' + ;
  //   return URL + key + QUERY_STR;
  // }

  renderItem(data) {
    const { item } = data;
    return (
      <TrendingItem
        data={item}
        onSelect={() => {
          NavigationUtil.routeTo(
            {
              projectModel: item,
            },
            'DetailPage'
          );
        }}
        // onFavorite={(item, isFavorite) => {
        //   FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.trending);
        // }}
      />
    );
  }

  renderListFooter() {
    return this.getStore().hideLoadingMore ? null : (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator style={styles.indicator} />
        <Text>正在加载更多</Text>
      </View>
    );
  }

  render() {
    let store = this.getStore();
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => '' + item.fullName}
          data={store.showItems}
          renderItem={this.renderItem}
          refreshControl={
            <RefreshControl
              title="Loading"
              titleColor="#586069"
              tintColor="#586069"
              colors={['#586069']}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
            />
          }
          ListFooterComponent={() => this.renderListFooter()}
          onEndReached={() => {
            setTimeout(() => {
              // 滚动时两次调用onEndReached
              if (this.canLoadMore) {
                this.loadData(true);
                this.canLoadMore = false;
              }
            }, 100);
          }}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            this.canLoadMore = true;
          }}
        />
        <Toast ref="toast" position="center" />
      </View>
    );
  }
}

const mapStateToProps = state => ({ trending: state.trending });

const mapDispatchToProps = dispatch => ({
  onRefreshTrending: (storeName, url, pageSize, favoriteDao) =>
    dispatch(actions.onRefreshTrending(storeName, url, pageSize, favoriteDao)),

  onLoadMoreTrending: (storeName, url, pageSize, items, favoriteDao, callback) =>
    dispatch(actions.onLoadMoreTrending(storeName, url, pageSize, items, favoriteDao, callback)),
});

const TrendingTabPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendingTab);

export default TrendingTabPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  indicatorContainer: {
    alignItems: 'center',
  },
  indicator: {
    color: 'red',
    fontSize: 10,
  },
});
