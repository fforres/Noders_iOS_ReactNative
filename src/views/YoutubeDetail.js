import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

class YoutubeDetail extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.description}> YOUTUBE DETAIL </Text>
      </View>
    );
  }
}
let styles = StyleSheet.create({
  description: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222'
  }
});

export default YoutubeDetail;
