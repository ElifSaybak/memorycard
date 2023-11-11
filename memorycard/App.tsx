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

const App = observer(() => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    game.startGame() // İlk açıldığında oyunu başlatır
  }, [])

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        {/* Oyun tamamlandıktan sonra ekrana gelecek olan bileşen */}
        <WinOverlay show={game.isCompleted} onClose={() => game.startGame()} /> 
        <View style={styles.row}>
          <Text style={styles.text}>{game.moves} moves</Text>
          <Text style={styles.text}>{game.timer.seconds} seconds</Text>
          <Pressable
            onPress={() => {
              game.startGame() // baştan başlat
            }}>
            <Text style={styles.text}>Restart</Text>
          </Pressable>
        </View>
        <Board cards={game.cards} />
      </View>
    </SafeAreaView>
  );
}
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 16,
    marginHorizontal: 16,
  },
});

export default App;
