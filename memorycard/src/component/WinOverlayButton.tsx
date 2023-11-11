import * as React from 'react'
import {
    Animated,
    Easing,
    Pressable,
    Text,
    useWindowDimensions,
} from 'react-native'
import { winOverlayButton } from '../style/styles'

// Props interface'i
interface Props { // Bu interface, bileşene geçirilecek prop'ları tanımlar.
    show: boolean // true or false
    onPlayAgainPress: () => void
}

export function WinOverlayButton({ show, onPlayAgainPress }: Props) { // Props tipinden "show" ve "onClose" prop'larını alır.
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
        <Animated.View style={[winOverlayButton.main, { height: screenHeight, top }]}>
            <Text style={winOverlayButton.title}>Congratulations! You won!</Text>
            <Text style={winOverlayButton.text}>With X moves and X seconds.</Text>
            <Text style={winOverlayButton.text}>Woooooo!</Text>
            <Pressable style={winOverlayButton.button} onPress={() => onPlayAgainPress()}>
                <Text style={winOverlayButton.buttonText}>Play again!</Text>
            </Pressable>
        </Animated.View>
    )
}


