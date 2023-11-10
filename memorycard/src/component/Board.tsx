import React from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native'
import { Card } from '../game/Card'
import { CardView } from './CardView'

export function Board({ cards }: { cards: Card[] }) {
    const { boardSize, cardSize } = useCardSize() // her bir kartın boyutu hesaplanır

    return (
        <View style={[styles.containerPortrait, { width: boardSize }]}>
            {cards.map((card, index) => (
                <CardView
                    card={card}
                    key={index}
                    cardSize={cardSize}
                    gapSize={GAP_SIZE}
                />
            ))}
        </View>
    )
}

const COLUMN_COUNT = 4 // sütun sayısı
export const GAP_SIZE = 8 // kartlar arası boşluk
const VERTICAL_SPACE_ON_LANDSCAPE = 80 // dikey boşluk

function useCardSize(): { boardSize: number; cardSize: number } {
    // Ekran genişliğini ve yüksekliğini alır
    const { width, height } = useWindowDimensions()
    const isPortrait = height > width // cihaz dik(portre modu) mi (true/false)
    const size = isPortrait ? width : height - VERTICAL_SPACE_ON_LANDSCAPE

    return {
        boardSize: size,
        // her bir kartın boyutu hesaplanır.
        cardSize: (size - GAP_SIZE * 2 * (COLUMN_COUNT + 1)) / COLUMN_COUNT,
    }
}

const styles = StyleSheet.create({
    containerPortrait: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: "center",
        padding: GAP_SIZE,
    },
})
