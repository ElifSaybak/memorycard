import * as React from 'react'
import {
    Animated,
    Easing,
    GestureResponderEvent,
    PanResponder,
    PanResponderGestureState,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native'
import { Color } from '../style/Color'

interface Props {
    onClose: () => void
}

export function WinOverlayTouch({ onClose }: Props) {
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

    return (
        <Animated.View style={[styles.main, { height: screenHeight, bottom }]}>
            <Text style={styles.title}>Congratulations! You won!</Text>
            <Text style={styles.text}>With X moves and X seconds.</Text>
            <Text style={styles.text}>Woooooo!</Text>
            <View {...panResponder.panHandlers} style={styles.moveUp}>
                <Text>Move up</Text>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        padding: 10,
        zIndex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: Color.black,
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 10,
    },
    text: {
        color: Color.gray,
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
    },
    button: {
        backgroundColor: Color.teal,
        paddingHorizontal: 25,
        paddingVertical: 8,
        borderRadius: 5,
        marginTop: 5,
    },
    buttonText: {
        color: Color.white,
        fontWeight: 'bold',
        fontSize: 18,
    },
    moveUp: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.red,
        borderRadius: 50,
        marginTop: 50,
    },
})
