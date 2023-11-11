import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card } from '../game/Card'
import { CardView } from './CardView'
import { GAP_SIZE, useCardSize } from '../style/sizes'

export function Board({ cards }: { cards: Card[] }) {
    const { boardSize, cardSize } = useCardSize() // her bir kartın boyutu hesaplanır

    return (
        <View style={[styles.containerPortrait, { width: boardSize }]}>
            {cards.map((card, index) => (
                <CardView
                    card={card}
                    key={index}
                    cardSize={cardSize}
                    margin={GAP_SIZE / 2}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    containerPortrait: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: "center",
        padding: GAP_SIZE / 2,
        borderRadius: 10,
    },
})
