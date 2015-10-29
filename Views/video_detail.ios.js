var React = require('react-native');
var ShareManagerIOS = require('NativeModules').ShareManagerIOS;
var YouTube = require('react-native-youtube');
var LoadingOverlay = require('./Extras/LoadingOverlay.ios.js');

var {
	Component,
	View,
	Image,
	WebView,
	Text,
	ScrollView,
	StyleSheet,
	TouchableOpacity
} = React;

var styles = StyleSheet.create({
	container: {
		backgroundColor: '#222',
		flex: 1
	},
	scrollviewWrapper: {
		flex: 1,
		backgroundColor: '#222'
	},
	thumbnail: {
		height: 280,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	videoTitle: {
		alignItems:'center',
		color: '#FFF',
		marginLeft: 15,
		marginTop: 10,
		fontFamily: 'Titillium Web',
		fontSize: 16,
		fontWeight: 'bold'	
	},
	descriptionText: {
		color: '#FFF',
		marginLeft: 30,
		marginTop: 10
	},
	sharelogo: {
		width: 30,
		height: 30,
		marginRight: 10		
	},
	buttonsContainer: {
		position: 'absolute',
		right: 0,
		bottom: 55,
		backgroundColor: 'transparent',
		flexDirection: 'row'
	},
	button: {
		borderRadius: 15,
		flex: 1,
		marginBottom: 5
	},
	playbtn: {
		height: 96,
		width: 96,
		backgroundColor: 'transparent'
	}
});

class VideoDetail extends Component {

	constructor(props){
		super(props);	
			this.state = {
			videoPlaying: false,
			isVisible: false
		}
	}

	_videoPlay(){		
		this.setState({
			isVisible: true,
			videoPlaying: true
		});
	}

	_videoReady(e){
		if (e.state == 'playing') {
			this.setState({
				isVisible: false,
				isPlaying: true
			});
		}
		if(e.state == 'paused') {
			this.setState({
				isPlaying: false
			});
		}
		if (e.state == 'ended') {
			this.setState({
				isPlaying: false
			});
			
		}
	}

	render() {
		return(
			<View style={{flex: 1}}>
				<ScrollView style={styles.scrollviewWrapper}>
					<View style={styles.container}>
						<Image style={styles.thumbnail} source={{uri: this.props.selectedVideo.snippet.thumbnails.high.url}}>
							<TouchableOpacity onPress={this._videoPlay.bind(this)} style={{backgroundColor: 'transparent'}}>
								<Image source={{uri: 'playbtn'}} style={styles.playbtn} />
							</TouchableOpacity>
						</Image>
						<Text style={styles.videoTitle}>{this.props.selectedVideo.snippet.title}</Text>
						<Text style={styles.descriptionText}>{this.props.selectedVideo.snippet.description}</Text>										
						<YouTube onChangeState={this._videoReady.bind(this)} videoId={this.props.selectedVideo.id} play={this.state.videoPlaying} playsInline={false} controls={1} hidden={false} />
					</View>					
				</ScrollView>
				<View style={styles.buttonsContainer}>
					<TouchableOpacity onPress={() => {}} style={styles.button}>
						<Image style={styles.sharelogo} source={{uri: 'facebooklogo'}} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => {}} style={styles.button}>
						<Image style={styles.sharelogo} source={{uri: 'twitterlogo'}} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => {ShareManagerIOS.shareWithWhatsapp("https://www.youtube.com/watch?v=" + this.props.selectedVideo.id, function() {})}} style={styles.button}>
						<Image style={styles.sharelogo} source={{uri: 'whatsapplogo'}} />
					</TouchableOpacity>
				</View>
				<LoadingOverlay isVisible={this.state.isVisible} icon="Circle"/>	
			</View>
		);
	}
}

module.exports = VideoDetail;