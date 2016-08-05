import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';

import ParsedText from 'react-native-parsed-text';

const styles = StyleSheet.create({
  bubble: {
    borderRadius: 15,
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 10,
    paddingTop: 8,
    flex: 1,
  },
  image: {
    height: 250,
    width: 250,
  },
  text: {
    color: '#000',
  },
  textLeft: {
  },
  textRight: {
    color: '#fff',
  },
  textCenter: {
    textAlign: 'center',
  },
  bubbleLeft: {
    marginRight: 70,
    backgroundColor: '#e6e6eb',
  },
  bubbleRight: {
    marginLeft: 70,
    backgroundColor: '#007aff',
  },
  bubbleCenter: {
    backgroundColor: '#eeeeee',
    alignSelf: 'center',
    width: Dimensions.get('window').width - 10,
  },
  bubbleError: {
    backgroundColor: '#e01717',
  },
});

export default class Bubble extends React.Component {

  componentWillMount() {
    Object.assign(styles, this.props.styles);
  }

  renderText(text = '', position) {
    if (this.props.renderCustomText && this.props.renderCustomText(this.props) !==false) {
      return this.props.renderCustomText(this.props);
    }

    if (this.props.parseText === true) {
      return (
        <ParsedText
          style={[styles.text, (position === 'left' ? styles.textLeft : position === 'right' ? styles.textRight : styles.textCenter)]}
          parse={
            [
              {
                type: 'url',
                style: {
                  textDecorationLine: 'underline',
                },
                onPress: this.props.handleUrlPress,
              },
              {
                type: 'phone',
                style: {
                  textDecorationLine: 'underline',
                },
                onPress: this.props.handlePhonePress,
              },
              {
                type: 'email',
                style: {
                  textDecorationLine: 'underline',
                },
                onPress: this.props.handleEmailPress,
              },
            ]
          }
        >
          {text}
        </ParsedText>
      );
    }

    return (
      <Text
          style={[
              styles.text,
              (position === 'left')
                  ? styles.textLeft
                  : (position === 'right')
                      ? styles.textRight
                      : styles.textCenter
          ]}
      >
        {text}
      </Text>
    );
  }

  getBubbleContent = () => {
      if (this.props.hasOwnProperty('type') && this.props.type === 'image') {
          return (
              <View style={{
                  width: Dimensions.get('window').width * 0.66,
                  height: Dimensions.get('window').height * 0.41,
              }}>
                {this.props.name}
                <Image
                      source={
                          {uri: this.props.text}
                      }
                      style={{
                          width: Dimensions.get('window').width * 0.65,
                          height: Dimensions.get('window').height * 0.4,
                          marginTop: 5,
                          alignSelf: 'flex-end',
                      }}
                />
              </View>
          );
      } else {
            return (
              <View style={[(this.realLength(this.props.text) > 35 ) ? {flex: 1} : {}]}>
                <View style={[styles.bubble,
                  (this.props.position === 'left' ? styles.bubbleLeft : this.props.position === 'right' ? styles.bubbleRight : styles.bubbleCenter),
                  (this.props.status === 'ErrorButton' ? styles.bubbleError : null),
                  {}
                  ]}
                >
                  {this.props.name}
                  {this.renderText(this.props.text, this.props.position)}
                </View>
            </View>
        );
      }
  };

  realLength = (str) => {
    return str.replace(/[^\x00-\xff]/g, "**").length; // [^\x00-\xff] - Matching non double byte character
  };

  render() {
    return this.getBubbleContent();
  }
}

Bubble.propTypes = {
  position: React.PropTypes.oneOf(['left', 'right', 'center']),
  status: React.PropTypes.string,
  text: React.PropTypes.string,
  renderCustomText: React.PropTypes.func,
  styles: React.PropTypes.object,
  parseText: React.PropTypes.bool,
  name: React.PropTypes.element,
  handleUrlPress: React.PropTypes.func,
  handlePhonePress: React.PropTypes.func,
  handleEmailPress: React.PropTypes.func,
};
