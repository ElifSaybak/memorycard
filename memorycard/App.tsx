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
  StyleSheet,
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
import { GAP_SIZE, useCardSize } from './src/style/sizes'

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
    <SafeAreaView style={[styles.fullHeight, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={styles.container}>
        <View style={styles.spaceTop} />
        <View style={[styles.row1, { width: boardSize }]}>
          <Text style={[styles.title, textStyleTop]}>Memory Game</Text>
          <Pressable
            style={({ pressed }) => [
              styles.restartPressable,
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
              styles.infoPressable,
              {
                backgroundColor: pressed ? Color.teal : Color.tealLight,
              },
            ]}
            onPress={() => {
              setShowInfoModal(true)
            }}
          >
            <Text style={[styles.infoText, textStyleTop]}>i</Text>
          </Pressable>
        </View>
        <View style={[styles.row2, row2Style, { width: boardSize }]}>
          <Text style={[styles.textBottom, textStyleBottom]}>{game.moves} moves</Text>
          <Text style={[styles.textBottom, textStyleBottom]}>{game.timer.seconds} s</Text>
        </View>
        <Board cards={game.cards} />
        <View style={styles.spaceBottom} />
      </View>
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

const styles = StyleSheet.create({
  fullHeight: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  spaceTop: {
    flex: 1,
  },
  spaceBottom: {
    flex: 2,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: GAP_SIZE,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: GAP_SIZE,
  },
  title: {
    textAlignVertical: 'center',
  },
  textBottom: {
    fontWeight: 'bold',
  },
  infoPressable: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: Color.teal,
  },
  infoText: {
    fontWeight: '600',
  },
  restartPressable: {
    paddingHorizontal: 5,
    paddingBottom: 5,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: Color.blue,
  },
})

export default App;
