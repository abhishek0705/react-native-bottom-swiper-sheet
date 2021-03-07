import React from 'react'
import { StyleSheet, Text, View } from "react-native";
import BottomSheet from "./component/SwiperSheet";

export default App = () => {
  return (
    <BottomSheet
      height={400}
      closeOnDragDown={true}
      closeOnPressMask={true}
      topBarStyle={styles.topBarStyle}
      backDropStyle={{ elevation: 5 }}
      sheetStyle={{ borderRadius: 50 }}
      swiperType="fullScreen"
    >
      <Text> react-native-bottom-swiper-sheet </Text>

    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  topBarStyle: {
    width: 50,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#000000"
  }
})