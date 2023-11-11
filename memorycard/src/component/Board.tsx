import React from 'react'
import { StyleSheet } from 'react-native'
import { Card } from '../game/Card'
import { CardView } from './CardView'
import { Color } from '../style/Color'
import LinearGradient from 'react-native-linear-gradient'
import { GAP_SIZE, useCardSize } from '../style/sizes'

export function Board({ cards }: { cards: Card[] }) {
    const { boardSize, cardSize } = useCardSize() // her bir kartın boyutu hesaplanır

    return (
        <LinearGradient // çekici bir görsel efekt ekler
            colors={[Color.teal, Color.purple]} // gradyanın başlangıç ve bitiş renklerini belirler.
            useAngle={true} // gradyanın açısal olup olmadığını beliler.
            angle={135} // gradyanın derece cinsinden açısını belirler.
            style={[styles.containerPortrait, { width: boardSize }]}
        >
            {cards.map((card, index) => (
                <CardView
                    card={card}
                    key={index}
                    cardSize={cardSize}
                    margin={GAP_SIZE / 2}
                />
            ))}
        </LinearGradient>
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
