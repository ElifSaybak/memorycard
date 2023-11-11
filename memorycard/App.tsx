/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
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
import { WinOverlay } from './src/component/WinOverlay';
import { useIsPortrait } from './src/util/useIsPortrait';

const App = observer(() => {
  const isDarkMode = useColorScheme() === 'dark';

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
      {/*  WinOverlay Oyun tamamlandıktan sonra ekrana gelecek olan bileşen */}
      <WinOverlay show={game.isCompleted} onClose={() => game.startGame()} />
      <View style={styles.fullHeight}>
        <View style={styles.row}>
          <Text style={[styles.text, textStyle]}>Memory Game</Text>
          <Pressable
            onPress={() => {
              // Modal göster
            }}
          >
            <Text style={[styles.text, textStyle]}>Info</Text>
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
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    marginHorizontal: 16,
  },
});

export default App;
