import React from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";
import Expo from "expo";

let green = "#477009";
let yellow = "#fcd062";

export default class App extends React.Component {
  state = {
    isReady: false
  };

  componentWillMount() {
    this._setupAsync();
  }

  _setupAsync = async () => {
    await Promise.all([
      this._loadFontAsync(),
      this._setupAudioAsync(),
      this._loadVideosAsync()
    ]);
    this.setState({ isReady: true });
  };

  _loadFontAsync = async () => {
    await Expo.Font.loadAsync({
      CooperBlack: require("./assets/CooperBlackRegular.ttf")
    });
  };

  _loadVideosAsync = async () => {
    await Expo.Asset.loadAsync([require("./assets/1.mp4")]);
  };

  _setupAudioAsync = async () => {
    await Expo.Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Expo.Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      interruptionModeAndroid: Expo.Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true
    });
  };

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: green,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
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
          <CatButton source={require("./assets/1.mp4")} />
          <CatButton source={require("./assets/2.mp4")} />
          <CatButton source={require("./assets/3.mp4")} />
        </View>

        {/* <View
          style={{
            flexDirection: "row"
          }}
        >
          <CatButton source={require("./assets/4.mp4")} />
          <CatButton source={require("./assets/5.mp4")} />
          <CatButton source={require("./assets/6.mp4")} />
        </View>

        <View
          style={{
            flexDirection: "row"
          }}
        >
          <CatButton source={require("./assets/7.mp4")} />
          <CatButton source={require("./assets/8.mp4")} />
          <CatButton source={require("./assets/9.mp4")} />
        </View> */}

      </View>
    );
  }
}

class CatButton extends React.Component {
  _resetAsync = async () => {
    await this._video.stopAsync();
    await this._video.setPositionAsync(0);
  };

  _playAsync = async () => {
    await this._video.playFromPositionAsync(0);
  };

  render() {
    let size = 100;
    return (
      <View style={{margin: 10}}>
        <TouchableHighlight
          onPress={() => {
            this._playAsync();
          }}
        >
          <View>
            <Expo.Video
              style={{
                height: this.props.height || this.props.size || size,
                width: this.props.height || this.props.width || size,
                backgroundColor: "white"
              }}
              source={this.props.source}
              shouldPlay={false}
              volume={1.0}
              rate={0.2}
              resizeMode={"cover"}
              onPlaybackStatusUpdate={status => {
                if (status.didJustFinish) {
                  this._resetAsync();
                }
              }}
              ref={c => {
                this._video = c;
              }}
            />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
