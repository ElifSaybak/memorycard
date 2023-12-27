import React, { useEffect, useRef, useState } from 'react'
import { View, Animated, Easing, Image, TouchableOpacity } from 'react-native'
import PresentMessage from './PresentMessage'
import { giftBox } from '../style/styles'

const GiftBox: React.FC = () => {
  const [pressed, setPressed] = useState(false)
  const [visible, setVisible] = useState(false)

  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]),
    ).start()
  }, [animatedValue])

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  })

  const openGift = () => {
    setPressed(true)
    setTimeout(() => {
      setVisible(true);
    }, 1200);
  }

  return (
    <View style={giftBox.container}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        <TouchableOpacity onPress={() => openGift()}>
          {pressed ? (
            <Image
              source={require('../images/open-present.png')}
              style={giftBox.openGift}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require('../images/close-present.png')}
              style={giftBox.closeGift}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      </Animated.View>

      {visible && (
        <PresentMessage visible={visible} onPress={() => setVisible(false)} />
      )}
    </View>
  )
}

export default GiftBox
