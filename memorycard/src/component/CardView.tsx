import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Card } from '../model/Card'
import { observer } from 'mobx-react-lite'
import Icon from 'react-native-vector-icons/FontAwesome'

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
        return (
            <Pressable
                style={[
                    styles.container,
                    { width: cardSize, height: cardSize, margin: gapSize },
                ]}
                onPress={() => {
                    card.makeVisible()
                }}>
                {card.isVisible && (
                    <View style={styles.center}>
                        <Icon name={card.type} size={30} color="#fff" />
                        <Text>{card.type}</Text>
                    </View>
                )}
            </Pressable>
        )
    },
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'brown',
        padding: 10,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
