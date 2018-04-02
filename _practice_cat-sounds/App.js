import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

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

  _setupAsync = async () => {
    await Promise.all([this._setAudioModeAsync(), this._loadFontsAsync()]);
    this.setState({ isReady: true });
  };

  _setAudioModeAsync = async () => {
    await Expo.Audio.setAudioModeAsync({
      interruptionModeIOS: Expo.Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
      interruptionModeAndroid: Expo.Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false
    });
  };

  _loadFontsAsync = async () => {
    await Expo.Font.loadAsync({
      CooperBlack: require("./assets/CooperBlackRegular.ttf")
    });
  };

  _loadVideosAsync = async () => {
    await Expo.Asset.loadAsync([
      require("./assets/1.mp4"),
      require("./assets/2.mp4"),
      require("./assets/3.mp4"),
      require("./assets/4.mp4"),
      require("./assets/5.mp4"),
      require("./assets/6.mp4"),
      require("./assets/7.mp4"),
      require("./assets/8.mp4"),
      require("./assets/9.mp4"),
    ]);
  };

  render() {
    let size = 100;

    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      <View style={styles.container}>
        <Text
          style={{
            fontFamily: "CooperBlack",
            fontSize: 42,
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
          <CatVideo size={size} source={require("./assets/1.mp4")} />
          <CatVideo size={size} source={require("./assets/2.mp4")} />
          <CatVideo size={size} source={require("./assets/3.mp4")} />
        </View>

        <View
          style={{
            flexDirection: "row"
          }}
        >
          <CatVideo size={size} source={require("./assets/4.mp4")} />
          <CatVideo size={size} source={require("./assets/5.mp4")} />
          <CatVideo size={size} source={require("./assets/6.mp4")} />
        </View>

        <View
          style={{
            flexDirection: "row"
          }}
        >
          <CatVideo size={size} source={require("./assets/7.mp4")} />
          <CatVideo size={size} source={require("./assets/8.mp4")} />
          <CatVideo size={size} source={require("./assets/9.mp4")} />
        </View>
      </View>
    );
  }
}

class CatVideo extends React.Component {
  resetAsync = async () => {
    await this._video.stopAsync();
    await this._video.setPositionAsync(0);
  };

  playAsync = async () => {
    await this._video.replayAsync();
  };

  render() {
    return (
      <View
        style={{
          margin: 10
        }}
      >
        <TouchableHighlight
          onPress={() => {
            this.playAsync();
          }}
        >
          <View>
            <Expo.Video
              style={{
                height: this.props.height || this.props.size || 400,
                width: this.props.width || this.props.size || 400
              }}
              source={this.props.source}
              shouldPlay={true}
              isLooping={false}
              resizeMode="cover"
              ref={c => {
                this._video = c;
              }}
              onPlaybackStatusUpdate={status => {
                if (status.didJustFinish) {
                  this.resetAsync();
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
