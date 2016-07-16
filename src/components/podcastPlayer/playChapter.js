import React, { Component, PropTypes } from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import Fontawesomeicons from 'react-native-vector-icons/FontAwesome';
import Sound from 'react-native-sound';
import Slider from 'react-native-slider';

Sound.enableInSilenceMode(true);
import RNFetchBlob from 'react-native-fetch-blob'
const FS = RNFetchBlob.fs;

export default class PlayChapter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.playing = false;
    this.state.progress = 0;
    this.state.podcast = props.podcast;
    this.state.filePath = props.filePath;
  }
  loadAudio() {
    return FS.exists(this.state.filePath)
      .then((data) => {
        return new Promise((resolve, reject) => {
          if (data) {
            const audio = new Sound(this.state.filePath, '', (error) => {
              if (error) {
                reject('failed to load the sound', error)
              } else {
                this.setState({Audio: audio}, () => {
                  resolve();
                })
              }
            });
          } else {
            alert('Wow. Hay un problema con este capítulo. No puedo reproducirlo, puedes descargarlo nuevamente?');
          }
        })
      })
  }
  playAudio() {
    this.loadAudio().then(() => {
      if (!this.state.playing && this.state.Audio) {
        this.setState({
          playing: true
        }, () => {
          this.state.Audio.play();
          this.setState({audioCallback : (() => {
            return setInterval(() => {
              this.state.Audio.getCurrentTime((e) => {
                this.setState({currentTime:e});
                console.log(this.state.currentTime);
              })
            }, 1000).bind(this);
          })()
          });
        });
      }
    })
  }
  componentDidMount() {
    this.loadAudio();
  }
  pauseAudio() {
    if (this.state.playing && this.state.Audio) {
      this.setState({
        playing: false
      }, () => {
        this.state.Audio.pause();
      });
    }
  }
  deleteAudio() {
    this.pauseAudio();
    FS.exists(this.state.filePath)
      .then((data) => {
        if (data) {
          return FS.unlink(this.state.filePath);
        } else {
          throw Error('File does not exist')
        }
      })
      .then(() => {
        alert('File deleted');
      })
      .catch((e) => {
        console.log(e);
      })
  }
  render () {
    const { podcast, playing } = this.state;
    const currentButton = (() => {
      if (!playing) {
        return (
            <TouchableHighlight
                onPress={() => {
                  this.playAudio()
                }}
            >
                <Fontawesomeicons
                    name="play"
                    size={ 50 }
                    color="black"
                />
            </TouchableHighlight>);
      } else {
        return (
            <TouchableHighlight
                onPress={() => {
                  this.pauseAudio()
                }}
            >
                <Fontawesomeicons
                    name="pause"
                    size={ 50 }
                    color="black"
                />
            </TouchableHighlight>);
      }

    })()
    return (
        <View style={styles.container}>
            <View style={styles.sliderContainer}>
                <Slider
                    value={this.state.value}
                    onValueChange={(value) => this.setState({value})}
                />
                <Text>Value: {this.state.value}</Text>
            </View>
            <View style={styles.subContainer}>
                {currentButton}
                <TouchableHighlight
                    onPress={() => {
                      this.deleteAudio()
                    }}
                >
                    <Fontawesomeicons
                        name="trash"
                        size={ 50 }
                        color="black"
                    />
                </TouchableHighlight>
            </View>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  sliderContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});
