import React, { Component, PropTypes } from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import Fontawesomeicons from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'react-native-fetch-blob'
import ProgressBar from 'react-native-progress/Bar';

export default class DownloadChapter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.progress = 0;
    this.state.podcast = props.podcast;
    this.state.filePath = props.filePath;
  }

  downloadAudio({url}, cb) {
    RNFetchBlob
      .config({
        fileCache : true,
        path: this.state.filePath
      })
      .fetch('GET', url)
      .progress((received, total) => {
        const progress = (received / total);
        this.setState({progress});
      })
      .then((res) => {
        console.log('The file saved to ', res.path())
        console.log(res);
        this.setState({file: true, filePath: res.path()})
        if (typeof cb === 'function') {
          cb()
        }
      })
  }
  render () {
    const { progress } = this.state;
    const progresBar = (()=>{
      if (progress) {
        return (
            <View style={styles.container}>
                <ProgressBar
                    color={'black'}
                    progress={this.state.progress} width={200}
                />
                <Text>{Math.floor(this.state.progress*100)} %</Text>
            </View>)
      }
    })()
    return (
        <View style={styles.container}>
            {progresBar}
            <TouchableHighlight
                onPress={() => {
                  this.downloadAudio(this.state.podcast.enclosure.$)
                }}
            >
                <Fontawesomeicons
                    name="arrow-circle-o-down"
                    size={ 50 }
                    color="black"
                />
            </TouchableHighlight>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});
