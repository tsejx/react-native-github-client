import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-easy-toast';
import PopularItem from 'components/PopularItem';
import { connect } from 'react-redux';
import api from 'constants/api';

import actions from '../../actions/index';

import FavoriteDao from '../../expand/FavoriteDao';
import FavoriteUtil from '../../model/FavoriteUtil';

import { FLAG_STORAGE } from 'constants/flag';

const favoriteDao = new FavoriteDao(FLAG_STORAGE.popular);

const THEME_COLOR = 'red';

class PopularTab extends Component {
  constructor(props) {
    super(props);
    const { tabLabel } = this.props;
    this.tabName = tabLabel;
    this.renderItem = this.renderItem.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  // 加载标签页数据
  loadData(loadMore) {
    if (!loadMore) {
      this.onRefresh();
    } else {
      this.onLoadMore();
    }
  }

  // 列表顶部下拉刷新
  onRefresh() {
    const url = api.search(this.tabName.toLowerCase());
    this.props.onRefreshPopular(this.tabName, url, favoriteDao);
  }

  // 列表触底加载更多
  onLoadMore() {
    const store = this.getStore();
    this.props.onLoadMorePopular(
      this.tabName,
      store.items,
      ++store.pageNo,
      favoriteDao,
      callback => {
        this.refs.toast.show('沒有更多了～');
      }
    );
  }

  // 获取当前标签页数据状态
  getStore() {
    let store = this.props.popular[this.tabName];
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
    return store;
  }

  renderItem(data) {
    const { item } = data;
    return (
      <PopularItem
        data={item}
        onSelect={() => {}}
        // 关联到BaseItem的handleFavoriteChange
        // onFavorite={(item, isFavorite) => {
        //   FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.popular);
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
    if (this.tabName === 'JavaScript') {
      console.log('this.store:', store);
    }
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => '' + (item.id || item.item.id)}
          data={store.showItems}
          renderItem={this.renderItem}
          // style={styles.flatList}
          // 改变ListView或FlatList这种类似的自由容物的控件
          contentContainerStyle={styles.flatList}
          // 列表顶部下拉刷新
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
          // 尾部组件
          ListFooterComponent={() => this.renderListFooter()}
          // 触底回调函数
          onEndReached={() => {
            setTimeout(() => {
              // 修复滚动时两次触发的问题
              if (this.canLoadMore) {
                this.loadData(true);
                this.canLoadMore = false;
              }
            }, 100);
          }}
          // 触底回调触发间隙
          onEndReachedThreshold={0.5}
          // 滚动动画开始时调用
          onMomentumScrollBegin={() => {
            this.canLoadMore = true;
          }}
        />
        <Toast ref="toast" position="center" />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  popular: state.popular,
});

const mapDispatchToProps = dispatch => ({
  onRefreshPopular: (storeName, url, favoriteDao) =>
    dispatch(actions.onRefreshPopular(storeName, url, favoriteDao)),

  onLoadMorePopular: (storeName, url, items, favoriteDao, callback) =>
    dispatch(actions.onLoadMorePopular(storeName, url, items, favoriteDao, callback)),
});

const PopularTabPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopularTab);

export default PopularTabPage;

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
