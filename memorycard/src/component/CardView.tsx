import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Card } from '../game/Card'
import { observer } from 'mobx-react-lite'
import Icon from 'react-native-vector-icons/FontAwesome'
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated"

const MATCH_STEP_DURATION = 120
const NO_MATCH_STEP_DURATION = 120
export const NO_MATCH_ANIMATION_DURATION = NO_MATCH_STEP_DURATION * 5

function useMatchAnimation() {
    const runMatchAnimation = useSharedValue(false) // useSharedValue hook'u Reanimated kütüphanesinde bir değer saklamak için kullanılır. Başlangıç değeri false

    const matchAnimationStyle = useAnimatedStyle(() => { // useAnimatedStyle hook'u, animasyonlu bir stil nesnesi oluşturmak için kullanılır
        if (!runMatchAnimation.value) { // runMatchAnimation false ise
            return {
                transform: [{ scaleX: 1 }, { scaleY: 1 }], // kart normaldir.
            }
        }

        return {  // runMatchAnimation true ise (zıplar gibi) kart hareket eder.
            transform: [
                {
                    scaleX: withSequence(
                        withTiming(1.4, { duration: MATCH_STEP_DURATION }),
                        withTiming(0.7, { duration: MATCH_STEP_DURATION * 1.2 }),
                        withTiming(1.2, { duration: MATCH_STEP_DURATION * 1.4 }),
                        withTiming(0.9, { duration: MATCH_STEP_DURATION * 1.6 }),
                        withTiming(1, { duration: MATCH_STEP_DURATION * 1.8 }),

                    ),
                },
                {
                    scaleY: withSequence(
                        withTiming(0.6, { duration: MATCH_STEP_DURATION }),
                        withTiming(1.3, { duration: MATCH_STEP_DURATION * 1.2 }),
                        withTiming(0.8, { duration: MATCH_STEP_DURATION * 1.4 }),
                        withTiming(1.1, { duration: MATCH_STEP_DURATION * 1.6 }),
                        withTiming(1, { duration: MATCH_STEP_DURATION * 1.8 }),

                    ),
                },
            ],
        }
    })

    return { runMatchAnimation, matchAnimationStyle }
}


function useNoMatchAnimation() {
    const runNoMatchAnimation = useSharedValue(false) // useSharedValue hook'u Reanimated kütüphanesinde bir değer saklamak için kullanılır. Başlangıç değeri false

    const noMatchAnimationStyle = useAnimatedStyle(() => { // useAnimatedStyle hook'u, animasyonlu bir stil nesnesi oluşturmak için kullanılır
        if (!runNoMatchAnimation.value) { // runNoMatchAnimation false ise
            return {
                transform: [{ translateX: 0 }, { rotateZ: "0deg" }], // kart normal konumunda düz durur
            }
        }

        return { // runNoMatchAnimation true ise (iki yana sallanma(hayır der gibi)) gibi kart hareket eder.
            transform: [
                {
                    translateX: withSequence(
                        withTiming(15, { duration: NO_MATCH_STEP_DURATION }),
                        withTiming(-11.25, { duration: NO_MATCH_STEP_DURATION }),
                        withTiming(7.5, { duration: NO_MATCH_STEP_DURATION }),
                        withTiming(-3.75, { duration: NO_MATCH_STEP_DURATION }),
                        withTiming(0, { duration: NO_MATCH_STEP_DURATION }),

                    )
                },
                {
                    rotateZ: withSequence(
                        withTiming("6deg", { duration: NO_MATCH_STEP_DURATION }),
                        withTiming("-4.5deg", { duration: NO_MATCH_STEP_DURATION }),
                        withTiming("3deg", { duration: NO_MATCH_STEP_DURATION }),
                        withTiming("-1.5deg", { duration: NO_MATCH_STEP_DURATION }),
                        withTiming("0deg", { duration: NO_MATCH_STEP_DURATION }),
                    ),
                },
            ],
        }
    })

    return { runNoMatchAnimation, noMatchAnimationStyle }
}

// Bu interface, CardView bileşenine geçirilmesi gereken özelliklerin şeklini tanımlar.
interface CardViewProps {
    card: Card
    cardSize: number
    gapSize: number
}

// CardViewProps interfaceini kullanarak özelliklerini (props) değişkenlere "ayırma" işlemi yapar. 
// Observer izlenen verilere bağlar, değişikliklere yanıt olarak tekrar render eder.
export const CardView = observer(
    ({ card, cardSize, gapSize }: CardViewProps) => {
        const { runMatchAnimation, matchAnimationStyle } = useMatchAnimation()
        runMatchAnimation.value = card.isMatched //  kart eşleşme durumu(true) runMatchAnimation değerine atanır. noMatchAnimationStyle tetikler.

        const { runNoMatchAnimation, noMatchAnimationStyle } = useNoMatchAnimation()
        runNoMatchAnimation.value = card.isNotMatched         //  kart eşleşmeme durumu(true) runNoMatchAnimation değerine atanır. noMatchAnimationStyle tetikler.

        return (
            <Animated.View style={[matchAnimationStyle, noMatchAnimationStyle]}>
                <Pressable
                    style={[
                        styles.container,
                        {
                            width: cardSize,
                            height: cardSize,
                            margin: gapSize,
                            backgroundColor: card.backgroundColor,
                        },
                    ]}
                    onPress={() => {
                        card.onClick()
                    }}>
                    {!card.isInVisible && ( // kart görünmeyen durumda değilse (görünürse)
                        <View style={styles.center}>
                            <Icon name={card.type} size={30} color="#fff" />
                            <Text>{card.type}</Text>
                        </View>
                    )}
                </Pressable>
            </Animated.View>
        )
    },
)

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
