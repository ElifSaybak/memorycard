import { useWindowDimensions } from 'react-native'

const COLUMN_COUNT = 4 // sütun sayısı
export const GAP_SIZE = 8 // kartlar arası boşluk
const VERTICAL_SPACE_ON_LANDSCAPE = 110 // dikey boşluk

export function useCardSize(): { boardSize: number; cardSize: number } {
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
