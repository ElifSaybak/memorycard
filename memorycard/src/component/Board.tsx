import React from 'react'
import { View } from 'react-native'
import { CardView } from './CardView'
import { Card } from '../game/Card'
import { GAP_SIZE, useCardSize } from '../style/sizes'
import { board } from '../style/styles'

export function Board({ cards }: { cards: Card[] }) {
    const { boardSize, cardSize } = useCardSize() // her bir kartın boyutu hesaplanır

    return (
        <View style={[board.containerPortrait, { width: boardSize }]}>
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