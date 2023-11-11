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

const App = observer(() => {
  const isDarkMode = useColorScheme() === 'dark';
  const [showInfoModal, setShowInfoModal] = useState(false)

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const fontSize = useIsPortrait() ? 22 : 18
  const textStyle = { fontSize }

  useEffect(() => {
    game.startGame() // İlk açıldığında oyunu başlatır
  }, [])

  return (
    <SafeAreaView style={[styles.fullHeight, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.fullHeight}>
        <View style={styles.row}>
          <Text style={[styles.text, textStyle]}>Memory Game</Text>
          <Pressable
            style={({ pressed }) => [
              styles.infoPressable,
              {
                backgroundColor: pressed ? Color.teal : 'transparent',
              },
            ]}
            onPress={() => {
              setShowInfoModal(true)
            }}
          >
            <Text style={[styles.infoText, textStyle]}>i</Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, textStyle]}>{game.moves} moves</Text>
          <Text style={[styles.text, textStyle]}>{game.timer.seconds} seconds</Text>
          <Pressable
            onPress={() => {
              game.startGame() // baştan başlat
            }}>
            <Text style={[styles.text, textStyle]}>Restart</Text>
          </Pressable>
        </View>
        <Board cards={game.cards} />
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
  centerVertical: {
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: '600',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  infoPressable: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    borderRadius: 25,
    borderColor: Color.teal,
  },
  infoText: {
    fontWeight: '600',
  },
});

export default App;
