import * as React from 'react'
import {
    Animated,
    Easing,
    GestureResponderEvent,
    PanResponder,
    PanResponderGestureState,
    Text,
    useWindowDimensions,
    View,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { Game } from '../game/Game'
import { winOverlayTouch } from '../style/styles'
import { useTranslation } from 'react-i18next'
interface Props {
    game: Game
    onClose: () => void
}

export const WinOverlayTouch = observer(({ game, onClose }: Props) => {
    const { t } = useTranslation()
    // useWindowDimensions hook'u, cihazın ekran boyutlarını almak için kullanılıyor. 
    const { height: screenHeight } = useWindowDimensions() // screenHeight değişkeni, ekranın yüksekliğini saklar.

    // animatedBottomRef referansı, Animated.Value kullanılarak animasyonlu bir değer saklar.
    const animatedBottomRef = React.useRef(new Animated.Value(screenHeight))

    // Dokunmatik Hareketlerin Kontrolü
    const panResponder = React.useRef(
        PanResponder.create({ // dokunmatik hareketlerin nasıl ele alınacağını tanımlanır.
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true, //
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            onPanResponderGrant: ( // kullanıcı ekranı basılı tuttuğunda
                _event: GestureResponderEvent,
                _gestureState: PanResponderGestureState,
            ) => {
                // @ts-ignore
                console.log('_value', animatedBottomRef.current._value)
                // @ts-ignore
                animatedBottomRef.current.setOffset(animatedBottomRef.current._value) // mevcut değerini kaydeder ve offset ayarlar.
            },

            onPanResponderMove: ( // kullanıcı ekran üzerinde hareket ettiğinde tetiklenir.
                event: GestureResponderEvent,
                gestureState: PanResponderGestureState,
            ) => {
                animatedBottomRef.current.setValue(-gestureState.dy) // kullanıcının hareketine bağlı günceller
            },

            onPanResponderRelease: ( // Kullanıcı dokunmatik hareketi bıraktığında tetiklenir. 
                event: GestureResponderEvent,
                gestureState: PanResponderGestureState,
            ) => {
                // Eğer kullanıcı belirli bir hızda veya mesafede ekranı yukarı kaydırdıysa, ekranı kapatır
                if (gestureState.dy < -180 || Math.abs(gestureState.vy) > 0.5) {
                    Animated.timing(animatedBottomRef.current, {
                        toValue: screenHeight,
                        duration: 300,
                        easing: Easing.linear,
                        useNativeDriver: false,
                    }).start(() => {
                        onClose()
                    })
                } else { // Aksi halde, ekranın pozisyonunu sıfırlar.
                    animatedBottomRef.current.flattenOffset()

                    Animated.timing(animatedBottomRef.current, {
                        toValue: 0,
                        duration: 100,
                        easing: Easing.cubic,
                        useNativeDriver: false,
                    }).start()
                }
            },
        }),
    ).current

    // bileşen render edildiğinde ekranın altından yukarı doğru çıkması için animasyonu başlatır.
    React.useEffect(() => {
        Animated.timing(animatedBottomRef.current, {
            toValue: 0,
            duration: 800,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false, // 'top' is not supported by native animated module
        }).start()
    }, [screenHeight])

    const bottom = animatedBottomRef.current

    const message = t('game_info', { moves: game.moves, seconds: game.timer.seconds });

    return (
        <Animated.View style={[winOverlayTouch.main, { height: screenHeight, bottom }]}>
            <Text style={winOverlayTouch.title}>{t("congratulation")}</Text>
            <Text style={winOverlayTouch.text}>{message}</Text>
            {/* Hareket edilecek bileşen */}
            <View {...panResponder.panHandlers} style={winOverlayTouch.moveUp}>
                <Text style={winOverlayTouch.moveText}>{t("move_up")}</Text>
            </View>
        </Animated.View>
    )
}
)

