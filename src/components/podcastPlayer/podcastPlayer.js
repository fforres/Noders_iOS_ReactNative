import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Fontawesomeicons from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'react-native-fetch-blob'
import DownloadChapter from './downloadChapter';
import PlayChapter from './playChapter';
const FS = RNFetchBlob.fs;

export default class podcastPlayer extends Component {
  constructor(props) {
    super(props);
    const { podcast } = props;
    const filePath = FS.dirs.DocumentDir + '/' + podcast.enclosure.$.url.split('/').pop();
    this.state = {
      podcast,
      filePath
    };
  }

  componentDidMount(){
    FS.exists(this.state.filePath)
      .then((data) => {
        if (data) {
          this.setState({saved: true})
        }
      })
  }
  render() {
    const { podcast, saved, filePath } = this.state;
    const status = () => {
      if (saved) {
        return <PlayChapter podcast={{...podcast}}  filePath={filePath}/>
      } else {
        return <DownloadChapter podcast={{...podcast}}  filePath={filePath}/>
      }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{podcast.title}</Text>
            <Text style={styles.newPubDate}>{podcast.newPubDate}</Text>
            {status()}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    padding: 10,
  },
  title: {
    fontSize: 25
  },
  newPubDate: {
    fontSize: 15
  }
});
