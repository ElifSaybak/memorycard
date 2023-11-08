import { autorun, makeAutoObservable } from 'mobx'
import { generateInitialCards } from './generateInitialCards'
import { Card } from './Card'
import reactotron from 'reactotron-react-native'

export class Game {
  cards: Card[] = [] // kartların tutulduğu dizi
  clicks = 0 // tıklama sayısı - başlangıçta 0

  // Sınıfın tüm özelliklerini ve eylemlerini otomatik olarak izlenebilir yapar.
  // Böylece, değişiklikler MobX tarafından izlenir ve ilgili bileşenler otomatik olarak yeniden render edilir.
  constructor() {
    makeAutoObservable(this)
  }

  startGame() {
    reactotron.log('startGame()')
    // generateInitialCards fonksiyonunu çağırır kartları karıştırır.
    this.cards = generateInitialCards()
  }

  incrementClicks() {
    this.clicks++ // tıklama sayısını arttırır
  }

  get moves() {
    return Math.floor(this.clicks / 2) // Tıklama sayısının yarısını alır (her bir hareket iki tıklama olarak düşünülür).
  }
}

// Game sınıfının bir örneğini oluşturur ve dışa aktarır. Bu örnek uygulamanın her yerinden erişilebilir ve kullanılabilir olur.
export const game = new Game()

// autorun, MobX'in reaktif sistemine bir yan etki ekler. Bu yan etki, verilen fonksiyonun içindeki reaktif verilere herhangi bir değişiklik olduğunda tekrar çalıştırılmasını sağlar.
autorun(() => {
  if (__DEV__) {
    reactotron.log('autorun game clicks', game.clicks, 'cards', game.cards)
  }
})
