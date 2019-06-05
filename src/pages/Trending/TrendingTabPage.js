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
} from 'react-native';
import { connect } from 'react-redux';
import actions from '../../actions/index';
import TrendingItem from '../../components/TrendingItem/index';
import Toast from 'react-native-easy-toast';
const THEME_COLOR = 'red';
const PAGE_SIZE = 10;

type Props = {};
class TrendingTab extends Component<Props> {
  constructor(props) {
    super(props);
    const { tabLabel } = this.props;
    this.storeName = tabLabel;
    this.renderItem = this.renderItem.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  loadData(loadMore) {
    const { onRefreshTrending, onLoadMoreTrending } = this.props;
    const store = this.getStore();
    const url = this.generateFetchUrl(this.storeName);
    if (loadMore) {
      onLoadMoreTrending(this.storeName, ++store.pageNo, PAGE_SIZE, store.items, callback => {
        this.refs.toast.show('沒有更多了～');
      });
    } else {
      onRefreshTrending(this.storeName, url, PAGE_SIZE);
    }
  }

  getStore() {
    const { trending } = this.props;
    let store = trending[this.storeName];
    if (!store) {
      store = {
        items: [],
        isLoading: false,
        // 需要显示的数据
        projectModes: [],
        // 默认隐藏加载更多
        hideLoadingMore: true,
      };
    }
    return store;
  }

  generateFetchUrl(key) {
    const URL = 'https://github.com/trending/';
    const QUERY_STR = '?since=daily';
    return URL + key + QUERY_STR;
  }

  renderItem(data) {
    const { item } = data;
    return <TrendingItem item={item} onSelect={() => {}} />;
  }

  genIndicator() {
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
          data={store.projectModes}
          renderItem={data => this.renderItem(data)}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={THEME_COLOR}
              tintColor={THEME_COLOR}
              colors={[THEME_COLOR]}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
            />
          }
          ListFooterComponent={() => this.genIndicator()}
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

const mapStateToProps = state => ({
  trending: state.trending,
});

const mapDispatchToProps = dispatch => ({
  onRefreshTrending: (storeName, url, pageSize) =>
    dispatch(actions.onRefreshTrending(storeName, url, pageSize)),
  onLoadMoreTrending: (storeName, url, pageSize, items, callback) =>
    dispatch(actions.onLoadMoreTrending(storeName, url, pageSize, items, callback)),
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
  indicatorContainer: {
    alignItems: 'center',
  },
  indicator: {
    color: 'red',
    fontSize: 10,
  },
});
