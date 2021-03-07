import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Animated, PanResponder, Dimensions, Keyboard, BackHandler } from 'react-native';
const SCREEN_HEIGHT = Dimensions.get("screen").height
const SCREEN_WIDTH = Dimensions.get("screen").width

export default function App(props) {
  const [popUpHeight, setPopUpHeight] = useState(400)
  const [popupPosition, setPopUpPosition] = useState(new Animated.Value(400))
  const [mainViewAnimation, setMainViewAnimation] = useState(new Animated.Value(0))
  const [popUpOpen, setPopUpOpen] = useState(false)

  useEffect(() => {
    if (props.swiperType) {
      setPopUpHeight(SCREEN_HEIGHT - 100)
      setPopUpPosition(new Animated.Value(SCREEN_HEIGHT - 100))
    } else {
      setPopUpHeight(props.height)
      setPopUpPosition(new Animated.Value(props.height))
    }
  }, [props])
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx * 3);
      },
      onPanResponderMove: (event, gestureState) => {
        let setPos = new Animated.Value(Math.max(0, 0 + gestureState.dy))
        setPopUpPosition(setPos);
      },
      onPanResponderRelease: (e, gesture) => {
        const shouldOpen = (gesture.vy < 0.8 && gesture.dy < (popUpHeight * 0.45));             //popup is opening or closing by swipe.(decision based on swiping speed and siped distance)
        Animated.spring(popupPosition, {      //animate popup position w.r.t swipe value
          toValue: shouldOpen ? 0 : popUpHeight,
          velocity: gesture.vy,
          tension: 80,
          friction: 20,
          useNativeDriver: true
        }).start();
        if (!shouldOpen) {
          close()                                 //close popup if swiping down
        }
      },
      onPanResponderTerminate: (evt, gestureState) => false
    })
  ).current

  const handleBackButtonClick = () => {
    if (props.closeOnHardwareBack) {
      close()
      return true;
    }
    return false;
  }

  const open = (callback) => {
    setPopUpOpen(true)
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    if (props.onOpen) {
      props.onOpen()
    }
    Animated.timing(popupPosition, {            //animate popup position to slide up
      toValue: 0,
      duration: 250,
      useNativeDriver: true
    }).start(
      () => {
        if (callback) {
          callback()
        }
      }
    );
    Animated.timing(mainViewAnimation, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }

  const close = (callback) => {
    Keyboard.dismiss()
    BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    if (props.onClose) {
      props.onClose()
    }
    Animated.timing(popupPosition, {         //animate popup position to slide down
      toValue: popUpHeight,
      duration: 250,
      useNativeDriver: true
    }).start(
      () => {
        setPopUpOpen(false)
        if (callback) {
          callback()
        }
      }
    );
    Animated.timing(mainViewAnimation, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }

  const renderTopBar = () => {
    if (!props.hideTopBar) {
      return (
        <View style={styles.topBarContainer}>
          <View style={[styles.topBar, props.topBarStyle]} />
        </View>
      )
    }
  }

  const backdrop = {                                              //animates backDrop position & opacity
    transform: [{
      translateY: mainViewAnimation.interpolate({
        inputRange: [0, 0.01],
        outputRange: [SCREEN_HEIGHT, 0],
        extrapolate: "clamp",
      }),
    }]
  };
  const popUp = {
    transform: [{
      translateY: popupPosition
    }]
  }

  return (
    <>
      <Animated.View style={[
        styles.backDropView,
        props.backDropStyle,
        backdrop]}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.backDropTouchable,
          ]}
          onPress={props.closeOnPressMask !== false ? () => close() : null}
        />
        <Animated.View
          {...props.closeOnDragDown !== false ? { ...panResponder.panHandlers } : null}
          style={[
            styles.subView,
            props.sheetStyle,
            { height: popUpHeight },
            popUp
          ]}
        >
          {renderTopBar()}
          {popUpOpen ?                     //unmount component on close
            props.children
            :
            null
          }
        </Animated.View>
      </Animated.View>
      {!popUpOpen && <TouchableOpacity onPress={() => open()}>
        <View style={styles.topBarContainer}>
          <View style={[styles.topBar, props.topBarStyle]} />
        </View>
      </TouchableOpacity>}
    </>
  )
}

const styles = StyleSheet.create({
  subView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white'
  },
  backDropView: {
    backgroundColor: "rgba(0,0,0,.5)",
    zIndex: 10,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  backDropTouchable: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  topBarContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    height: 5,
    width: 62,
    backgroundColor: '#d8d8d8',
    borderRadius: 2.5,
    marginTop: 8,
    marginBottom: 8
  },
});

