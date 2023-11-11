/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  Pressable,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Board } from './src/component/Board';
import { observer } from 'mobx-react-lite';
import { game } from './src/game/Game';
import { WinOverlayTouch } from './src/component/WinOverlayTouch';
import { useIsPortrait } from './src/util/useIsPortrait';
import { Color } from './src/style/Color';
import { InfoModal } from './src/component/InfoModal';
import { useCardSize } from './src/style/sizes'
import LinearGradient from 'react-native-linear-gradient'
import { app } from './src/style/styles';


const App = observer(() => {
  const isDarkMode = useColorScheme() === 'dark';
  const isPortrait = useIsPortrait() // portre (dikey) - yatay
  const { boardSize } = useCardSize()
  const [showInfoModal, setShowInfoModal] = useState(false)

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const textStyleTop = { fontSize: isPortrait ? 22 : 18 }
  const textStyleBottom = { fontSize: isPortrait ? 24 : 20 }
  const row2Style = {
    marginTop: isPortrait ? 12 : 3,
    marginBottom: isPortrait ? 15 : 2,
  }

  useEffect(() => {
    game.startGame() // İlk açıldığında oyunu başlatır
  }, [])

  return (
    <SafeAreaView style={[app.fullHeight, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <LinearGradient
        colors={[Color.teal, Color.purple]}
        useAngle={true}
        angle={135}
        style={[app.container]}
      >
        <View style={app.spaceTop} />
        <View style={[app.row1, { width: boardSize }]}>
          <Text style={[app.title, textStyleTop]}>Memory Game</Text>
          <Pressable
            style={({ pressed }) => [
              app.restartPressable,
              {
                backgroundColor: pressed ? Color.blue : Color.blueLight,
              },
            ]}
            onPress={() => {
              game.startGame() // baştan başlat
            }}>
            <Text style={textStyleTop}>Restart</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              app.infoPressable,
              {
                backgroundColor: pressed ? Color.teal : Color.tealLight,
              },
            ]}
            onPress={() => {
              setShowInfoModal(true)
            }}
          >
            <Text style={[app.infoText, textStyleTop]}>i</Text>
          </Pressable>
        </View>
        <View style={[app.row2, row2Style, { width: boardSize }]}>
          <Text style={[app.textBottom, textStyleBottom]}>{game.moves} moves</Text>
          <Text style={[app.textBottom, textStyleBottom]}>{game.timer.seconds} s</Text>
        </View>
        <Board cards={game.cards} />
        <View style={app.spaceBottom} />
      </LinearGradient>
      {/*  WinOverlay Oyun tamamlandıktan sonra ekrana gelecek olan bileşen */}
      {
        game.isCompleted && (
          <WinOverlayTouch
            game={game}
            onClose={() => {
              game.startGame()
            }}
          />
        )
      }
      {showInfoModal && <InfoModal onClose={() => setShowInfoModal(false)} />}
    </SafeAreaView>
  );
}
)


export default App;
