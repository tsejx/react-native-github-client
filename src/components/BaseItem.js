import React from 'react';
import { TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

export default class BaseItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: this.props.projectModel.isFavorite,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const isFavorite = nextProps.projectModel.isFavorite;
    if (prevState.isFavorite !== isFavorite) {
      return { isFavorite };
    }
    return null;
  }

  updateFavoriteState(isFavorite) {
    this.props.projectModel.isFavorite = isFavorite;
    this.setState({ isFavorite });
  }

  handleFavoriteChange() {
    this.updateFavoriteState(!this.state.isFavorite);
    this.props.onFavorite(this.props.projectModel.item, !this.state.isFavorite);
  }

  renderFavoriteIcon() {
    return (
      <TouchableOpacity
        style={{ padding: 6 }}
        underlayColor="transparent"
        onPress={() => this.handleFavoriteChange()}
      >
        <FontAwesome
          name={this.state.isFavorite ? 'star' : 'star-o'}
          size={26}
          style={{ color: '#678' }}
        />
      </TouchableOpacity>
    );
  }
}

BaseItem.propTypes = {
  projectModel: PropTypes.object,
  onSelect: PropTypes.func,
  onFavorite: PropTypes.func,
};

BaseItem.defaultProps = {
  projectModel: {
    isFavorite: false,
  }
}