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
// import { InfoModal } from './src/component/InfoModal';
import { useCardSize } from './src/style/sizes'
import LinearGradient from 'react-native-linear-gradient'
import { app } from './src/style/styles';
import { useTranslation } from 'react-i18next';
import i18next from './src/services/i18next';
import { Languages } from './src/component/Languages';


const App = observer(() => {
  const isDarkMode = useColorScheme() === 'dark';
  const isPortrait = useIsPortrait() // portre (dikey) - yatay
  const { boardSize } = useCardSize()
  const [visible, setVisible] = useState(false)
  const { t } = useTranslation()

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

  const changeLang = (lng: string) => {
    i18next.changeLanguage(lng)
    setVisible(false)
  }

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
        <Text style={[app.title, textStyleTop]}>{t("memory_game")}</Text>
        <View style={[app.row1, { width: boardSize }]}>
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
              app.lngPressable,
              {
                backgroundColor: pressed ? Color.teal : Color.tealLight,
              },
            ]}
            onPress={() => {
              setVisible(true)
            }}
          >
            <Text style={[app.lngText, textStyleTop]}>{t("change_language")}</Text>
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
      {visible && <Languages onClose={() => setVisible(false)} changeLng={changeLang} />}
    </SafeAreaView>
  );
}
)


export default App;
