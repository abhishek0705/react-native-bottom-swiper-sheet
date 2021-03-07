# react-native-bottom-swiper-sheet


- Highly customisable Bottom sheet
- Add Your own Component To Bottom Sheet
- Support Drag Down Gesture
- Support Both Android And iOS
- Smooth Animation
- Zero Configuration
- Zero dependency


## Installation

```
npm i react-native-bottom-swiper-sheet --save
```

### or

```
yarn add react-native-bottom-swiper-sheet
```

## Example

#### Functional component

```jsx
import React from 'react';
import { StyleSheet,Dimensions,Text } from 'react-native';
import BottomSheet from "react-native-bottom-swiper-sheet"

export default function BottomSwipeSheet(props) {
        return(
            <BottomSheet
                height = {400}
                closeOnDragDown = {true}
                closeOnPressMask = {true}
                topBarStyle = {styles.topBarStyle}
                backDropStyle = {{elevation:5}}
                sheetStyle = {{borderRadius:50}}
                swiperType="fullScreen"
            >
                <Text> react-native-bottom-swiper-sheet </Text>

            </BottomSheet>
        )
}

const styles                    = StyleSheet.create({
    topBarStyle                 : {
        width                   : 50,
        height                  : 5,
        borderRadius            : 2.5,
        backgroundColor         : "#000000"
    }
})

```


## Props

| Props            | Type     | Description                                             | Default  |
| ---------------- | -------- | ------------------------------------------------------- | -------- |
| height           | number   | Height of Bottom Sheet                                  | 200      |
| closeOnDragDown  | boolean  | Use gesture drag down to close Bottom Sheet             | true    |
| swiperType   |  string  | Custom swiper type | fullScreen  |
| closeOnPressMask | boolean  | Press the area outside to close Bottom Sheet            | true     |
| topBarStyle     | object   | Custom style to topBar of Bottom Sheet                            | {}       |
| backDropStyle     | object   | Custom style to backDropView of Bottom Sheet                            | {}       |
| sheetStyle     | object   | Custom style to Bottom Sheet                            | {}       |
| hideTopBar     | object   | hide topBar component                          | false       |




## Methods

| Method Name | Description        | parameters |
| ----------- | ------------------ | ----------- |
| open        | Open Bottom Sheet  | callback - function that will be called after popup opened|
| close       | Close Bottom Sheet | callback - function that will be called after popup closed.|

## Note

- If you have used elevation property (android) in your code, then you may need to set same elevation value to the backDropView of bottomSheet. 

## License

This project is licensed under the GNU General Public License v3.0

## Author

Made by [Abhishek Natani](https://github.com/abhi0705).
