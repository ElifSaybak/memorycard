import { useWindowDimensions } from 'react-native'

//Cihazın mevcut yönünün portre(dikey) modda olup olmadığının kontrolü
export function useIsPortrait(): boolean {
  const { width, height } = useWindowDimensions() // cihaz boyutlarını alır.
  // yükseklik genişlikten büyük ise portre(dikey)'dir.
  return height > width // (true or false)
}
