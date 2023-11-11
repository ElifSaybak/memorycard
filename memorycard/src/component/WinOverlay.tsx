import * as React from 'react'
import {
    Animated,
    Easing,
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
} from 'react-native'
import { Color } from '../style/Color'

// Props interface'i
interface Props { // Bu interface, bileşene geçirilecek prop'ları tanımlar.
    show: boolean // true or false
    onClose: () => void
}

export function WinOverlay({ show, onClose }: Props) { // Props tipinden "show" ve "onClose" prop'larını alır.
    // useWindowDimensions hook'u, cihazın ekran boyutlarını almak için kullanılıyor. screenHeight değişkeni, ekranın yüksekliğini saklar.
    const { height: screenHeight } = useWindowDimensions()
    // animatedValue, animasyon için bir başlangıç değeri (0) ile bir Animated.Value referansı oluşturur.
    const animatedValue = React.useRef(new Animated.Value(0))

    React.useEffect(() => { // useEffect hook'u, show prop'unun değerine bağlı olarak animasyonu tetikler.
        if (show) { // show true ise animatedValue değeri (1)'e animasyonlu bir şekilde geçiş yapar.
            Animated.timing(animatedValue.current, { // yukarıdan aşağıya iner
                toValue: 1,
                duration: 1000,
                easing: Easing.cubic,
                useNativeDriver: false,
            }).start()
        } else { // show false ise animatedValue değeri (0)'e animasyonlu bir şekilde geçiş yapar.
            Animated.timing(animatedValue.current, { // aşağıdan yukarı çıkar
                toValue: 0,
                duration: 800,
                easing: Easing.cubic,
                useNativeDriver: false,
            }).start()
        }
    }, [show, animatedValue])

    const top = animatedValue.current.interpolate({ // animatedValue'nin mevcut değerine bağlı hesaplanır.
        inputRange: [0, 1], // animatedValue'nin 0 ile 1 arasındaki değerlerini
        outputRange: [-screenHeight, 0], // bu aralık arasındaki piksel değerlerine dönüştürür.
    })

    return (
        <Animated.View style={[styles.main, { height: screenHeight, top }]}>
            <Text style={styles.title}>Congratulations! You won!</Text>
            <Text style={styles.text}>With X moves and X seconds.</Text>
            <Text style={styles.text}>Woooooo!</Text>
            <Pressable style={styles.button} onPress={() => onClose()}>
                <Text style={styles.buttonText}>Play again!</Text>
            </Pressable>
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
})
