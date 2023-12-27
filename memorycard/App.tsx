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
import { useCardSize } from './src/style/sizes'
import LinearGradient from 'react-native-linear-gradient'
import { app } from './src/style/styles';
import { useTranslation } from 'react-i18next';
import i18next from './src/services/i18next';
import { Languages } from './src/component/Languages';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"


const App = observer(() => {
  const isDarkMode = useColorScheme() === 'dark';
  const isPortrait = useIsPortrait() // portre (dikey) - yatay
  const { boardSize } = useCardSize()
  const [visible, setVisible] = useState(false)
  const { t } = useTranslation()

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const textStyleTitle = { fontSize: isPortrait ? 24 : 20 }
  const textStyleTop = { fontSize: isPortrait ? 16 : 14 }
  const textStyleBottom = { fontSize: isPortrait ? 16 : 14 }
  const textViewStyle = {
    marginTop: isPortrait ? 20 : 10,
    marginBottom: isPortrait ? 25 : 12,
  }

  useEffect(() => {
    game.startGame() // İlk açıldığında oyunu başlatır
  }, [])

  const changeLang = (lng: string) => { // lng seçilen dil
    i18next.changeLanguage(lng) // Dili değiştirir.
    setVisible(false)
  }

  return (
    <SafeAreaView style={[app.fullHeight, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={Color.battleship_gray} />

      <LinearGradient
        colors={[Color.hookers_green, Color.rust]}
        useAngle={true}
        angle={135}
        style={[app.container]}
      >
        <View style={app.titleView}>
          <Text style={[app.title, textStyleTitle]}>{t("memory_game")}</Text>
        </View>

        {/* <View style={app.spaceTop} /> */}

        <View style={[app.textView, textViewStyle, { width: boardSize }]}>
          <Text style={[app.textBottom, textStyleBottom]}>{t("moves")}: {game.moves}</Text>
          <View style={app.timerView}>
            <Text style={[app.textBottom, textStyleBottom]}>{t("seconds")}: {game.timer.seconds}</Text>
            <Icon name="timer-sand" size={20} color={Color.coyote} />
          </View>
        </View>

        <Board cards={game.cards} />

        <View style={[app.buttonView, { width: boardSize }]}>
          <Pressable
            style={({ pressed }) => [
              app.restartPressable,
              {
                backgroundColor: pressed ? Color.ash_gray : Color.hookers_green,
              },
            ]}
            onPress={() => {
              game.startGame() // baştan başlat
            }}>
            <Text style={[app.restartText, textStyleTop]}>{t("restart")}</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              app.lngPressable,
              {
                backgroundColor: pressed ? Color.ash_gray : Color.hookers_green,
              },
            ]}
            onPress={() => {
              setVisible(true)
            }}
          >
            <Text style={[app.lngText, textStyleTop]}>{t("change_language")}</Text>
          </Pressable>
        </View>

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
      {visible && (
        <Languages onClose={() => setVisible(false)} changeLng={changeLang} />
      )}
    </SafeAreaView>
  );
}
)


export default App;
