import React, { Component, PropTypes } from 'react';
import {
  AlertIOS,
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


export default class podcastPlayer extends Component {
  render() {
    const { podcast } = this.props;
    console.log(podcast);
    return (
      <View style={styles.container}>
        <Text>{podcast.title}</Text>
        <Text>{podcast.newPubDate}</Text>
        <Text>{podcast['itunes:duration']}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
