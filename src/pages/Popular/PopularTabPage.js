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
import ListItem from '../../components/ListItem';
import Toast from 'react-native-easy-toast';
const THEME_COLOR = 'red';
const PAGE_SIZE = 10;
type Props = {};
class PopularTab extends Component<Props> {
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
    const { onRefreshPopular, onLoadMorePopular } = this.props;
    const store = this.getStore();
    const url = this.generateFetchUrl(this.storeName);
    if (loadMore) {
      onLoadMorePopular(this.storeName, ++store.pageNo, PAGE_SIZE, store.items, callback => {
        this.refs.toast.show('沒有更多了～');
      });
    } else {
      onRefreshPopular(this.storeName, url, PAGE_SIZE);
    }
  }

  getStore() {
    const { popular } = this.props;
    let store = popular[this.storeName];
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
    const URL = 'https://api.github.com/search/repositories?q=';
    const QUERY_STR = '&sort=starts';
    return URL + key + QUERY_STR;
  }

  renderItem(data) {
    const { item } = data;
    return <ListItem item={item} onSelect={() => {}} />;
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
    const { popular } = this.props;

    let store = this.getStore();

    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => `${item.id}`}
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
  popular: state.popular,
});

const mapDispatchToProps = dispatch => ({
  onRefreshPopular: (storeName, url, pageSize) =>
    dispatch(actions.onRefreshPopular(storeName, url, pageSize)),
  onLoadMorePopular: (storeName, url, pageSize, items, callback) =>
    dispatch(actions.onLoadMorePopular(storeName, url, pageSize, items, callback)),
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
  welcome: {},
  indicatorContainer: {
    alignItems: 'center',
  },
  indicator: {
    color: 'red',
    fontSize: 10,
  },
});
