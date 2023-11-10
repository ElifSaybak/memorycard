/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Board } from './src/component/Board';
import { observer } from 'mobx-react-lite';
import { game } from './src/model/Game';

const App = observer(() => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    game.startGame() // İlk açıldığında oyunu başlatır
  }, [])

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text style={styles.text}>{game.moves} moves</Text>
        <Board cards={game.cards} />
        {game.isCompleted && <Text style={styles.text}>Congratulations!</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}
)

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 16,
    marginHorizontal: 16,
  }
});

export default App;
