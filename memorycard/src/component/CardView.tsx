import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Card } from '../model/Card'
import { observer } from 'mobx-react-lite'

// Bu interface, CardView bileşenine geçirilmesi gereken özelliklerin şeklini tanımlar.
interface CardViewProps {
    card: Card
    cardSize: number
    gapSize: number
}

// CardViewProps interfaceini kullanarak özelliklerini (props) değişkenlere "ayırma" işlemi yapar. 
// Observer izlenen verilere bağlar, değişikliklere yanıt olarak tekrar render eder.
export const CardView = observer(({ card, cardSize, gapSize }: CardViewProps) => {
    return (
        <View
            style={[
                styles.container,
                { width: cardSize, height: cardSize, margin: gapSize },
            ]}>
            <Pressable onPress={() => {
                card.makeVisible()
            }}>
                <Text>{card.type}</Text>
                <Text>isVisible: {card.isVisible.toString()}</Text>
            </Pressable>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#cccccc',
        borderWidth: 3,
        borderRadius: 8,
        borderColor: 'brown',
        padding: 10,
    },
})
