import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";

import Expo from "expo";

let green = "#477009";
let yellow = "#fcd602";

export default class App extends React.Component {
  state = {
    isReady: false
  };

  componentWillMount() {
    this._setupAsync();
  }

  _setupAudioAsync = async () => {
    await Expo.Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Expo.Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      interruptionModeAndroid: Expo.Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true
    });
  };

  _setupAsync = async () => {
    await Promise.all([this._setupAudioAsync(), this._loadAssetsAsync()]);
  };

  componentDidMount() {}

  _loadAssetsAsync = async () => {
    await Promise.all([
      Expo.Font.loadAsync({
        CooperBlack: require("./assets/CooperBlackRegular.ttf")
      }),
      Expo.Asset.fromModule(require("./assets/1.mp4")),
      Expo.Asset.fromModule(require("./assets/2.mp4")),
      Expo.Asset.fromModule(require("./assets/3.mp4")),
      Expo.Asset.fromModule(require("./assets/4.mp4")),
      Expo.Asset.fromModule(require("./assets/5.mp4")),
      Expo.Asset.fromModule(require("./assets/6.mp4")),
      Expo.Asset.fromModule(require("./assets/7.mp4")),
      Expo.Asset.fromModule(require("./assets/8.mp4")),
      Expo.Asset.fromModule(require("./assets/9.mp4")),
      Expo.Asset.fromModule(require("./assets/dog-barking.mp3")),
    ]);

    this.setState({ isReady: true });
  };

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      <View style={styles.container}>
        <Text
          style={{
            fontFamily: "CooperBlack",
            fontSize: 42,
            fontWeight: "bold",
            color: yellow
          }}
        >
          Cat Sounds
        </Text>
        <View
          style={{
            flexDirection: "row"
          }}
        >
          <VideoButton source={require("./assets/1.mp4")} />
          <VideoButton source={require("./assets/2.mp4")} />
          <VideoButton source={require("./assets/3.mp4")} />
        </View>
        <View
          style={{
            flexDirection: "row"
          }}
        >
          <VideoButton source={require("./assets/4.mp4")} />
          <VideoButton source={require("./assets/5.mp4")} />
          <VideoButton source={require("./assets/6.mp4")} />
        </View>
        <View
          style={{
            flexDirection: "row"
          }}
        >
          <VideoButton source={require("./assets/7.mp4")} />
          <VideoButton source={require("./assets/8.mp4")} />
          <VideoButton source={require("./assets/9.mp4")} />
        </View>
      </View>
    );
  }
}

class AudioButton extends React.Component {
  componentDidMount() {
    this._sound = Expo

  }

  render() {
    return (
      <Button title="Let the Dogs Out" onPress={() => {


      }} />
    );
  }
}

class VideoButton extends React.Component {
  _playAsync = async () => {
    await this._video.playFromPositionAsync(0);
  };

  _resetAsync = async () => {
    await this._video.stopAsync();
    await this._video.setPositionAsync(0);
  };

  render() {
    let buttonSize = 100;
    return (
      <View
        style={{
          marginHorizontal: 5,
          marginVertical: 5
        }}
      >
        <TouchableHighlight
          onPress={() => {
            this._playAsync();
          }}
        >
          <View>
            <Expo.Video
              style={{
                width: this.props.width || this.props.size || buttonSize,
                height: this.props.height || this.props.size || buttonSize
              }}
              shouldPlay={false}
              isLooping={false}
              resizeMode="cover"
              volume={1.0}
              rate={1.0}
              source={this.props.source}
              ref={c => {
                this._video = c;
              }}
              onPlaybackStatusUpdate={playbackStatus => {
                if (playbackStatus.didJustFinish) {
                  this._resetAsync();
                }
              }}
            />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: green,
    alignItems: "center",
    justifyContent: "center"
  }
});
