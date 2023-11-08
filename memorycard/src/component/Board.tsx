import React from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native'
import { Card } from '../model/Card'
import { CardView } from './CardView'
import { CardType } from '../model/CardType'

const cardTypes: CardType[] = [] // cardTypes dizisi oluşur
for (const cardType in CardType) {
    // CardType enumundaki her elemanı bu diziye ikişer kere eklenir
    const aCardType: CardType = CardType[cardType as keyof typeof CardType]
    cardTypes.push(aCardType)
    cardTypes.push(aCardType)
}

// Her kart tipi için Card sınıfından bir nesne oluşturulur ve cards adında bir diziye atanır
const cards: Card[] = cardTypes.map((cardType) => new Card(cardType))

export function Board() {
    const size = useCardSize() // her bir kartın boyutu hesaplanır

    return (
        <View style={styles.container}>
            {cards.map((card, index) => (
                <CardView card={card} key={index} cardSize={size} gapSize={GAP_SIZE} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 8,
    },
})

const COLUMN_COUNT = 4 // sütun sayısı
export const GAP_SIZE = 8 // kartlar arası boşluk

function useCardSize(): number {
    // Ekran genişliğini alır
    const windowWidth = useWindowDimensions().width

    // Ekran genişliğinden, sütunlar arasındaki ve dış kenarların toplam boşluk miktarı çıkarıldıktan sonra kalan alanın sütun sayısına bölünmesiyle yapılır
    const size = (windowWidth - GAP_SIZE * 2 * (COLUMN_COUNT + 1)) / COLUMN_COUNT
    return size
}
