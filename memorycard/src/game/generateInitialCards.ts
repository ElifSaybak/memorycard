import { CardType } from './CardType'
import { Card } from './Card'
import { game } from './Game'

const cardTypes: CardType[] = [] // cardTypes dizisi oluşur
for (const cardType in CardType) {
  // CardType enumundaki her elemanı bu diziye ikişer kere eklenir
  const aCardType: CardType = CardType[cardType as keyof typeof CardType]
  cardTypes.push(aCardType)
  cardTypes.push(aCardType)
}

// Kartların karıştırılması ve rastgele bir başlangıç durumu için fonksiyon
// <T> Tür parametresi - herhangi bir türdeki diziyi kabul eder ve işler.
function shuffleArray<T>(array: T[]): T[] {
  // array: T[] karıştırılacak dizi
  const copy = [...array] // orijinal diziyi değiştirmeden işlem yapılmasını sağlar.
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]] // değiş-tokuş
  }
  return copy // karıştırılmış dizi
}

export function generateInitialCards(): Card[] {
  // Her kart tipi için Card sınıfından bir nesne oluşturulur ve cards adında bir diziye atanır
  const cards: Card[] = cardTypes.map((cardType) => new Card(cardType, game))
  return shuffleArray(cards)
}
