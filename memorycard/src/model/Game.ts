import { autorun, makeAutoObservable } from 'mobx'
import { generateInitialCards } from './generateInitialCards'
import { Card } from './Card'
import reactotron from 'reactotron-react-native'
import { CardState } from './CardState'

export class Game {
  cards: Card[] = [] // kartların tutulduğu dizi
  clicks = 0 // tıklama sayısı - başlangıçta 0

  // Sınıfın tüm özelliklerini ve eylemlerini otomatik olarak izlenebilir yapar.
  // Böylece, değişiklikler MobX tarafından izlenir ve ilgili bileşenler otomatik olarak yeniden render edilir.
  constructor() {
    makeAutoObservable(this, {
      visibleCards: false,
    })
  }

  startGame() {
    reactotron.log!('startGame()')
    // generateInitialCards fonksiyonunu çağırır kartları karıştırır.
    this.cards = generateInitialCards()
  }

  onClick(card: Card) {
    reactotron.log!('onClick() card', card.type)
    if (this.noMatchedCards().length > 0) {
      // eşleşmeyen kart varsa işlem yapmadan döner
      return
    }
    this.clicks++ //tıklama sayısını arttırır
    card.state = CardState.Visible // kart durumunu günceller
    this.evaluateMatch()
  }

  evaluateMatch() {
    // mevcut durum için method
    const visibleCards = this.visibleCards() // görünen kartları visibleCards değişkenine ata.
    reactotron.log!!('visibleCards.length', visibleCards.length)
    if (visibleCards.length !== 2) {
      // görünen kartlar 2 ye eşit değilse işlem yapmaz
      return
    }

    // ki görünür kartın tipinin aynı olup olmadığı kontrol edilir
    if (visibleCards[0].type === visibleCards[1].type) {
      // her iki kartın da durumu CardState.Matched olarak güncellenir.
      // Bu, kartların eşleştiğini ve artık eşleşmiş olarak işaretlendiğini gösterir.
      visibleCards[0].state = CardState.Matched
      visibleCards[1].state = CardState.Matched
    } else {
      // Eğer kartlar eşleşmezse, her iki kartın da hide metodunu çağırarak kartları gizli duruma getirir
      visibleCards[0].hide()
      visibleCards[1].hide()
    }
  }

  get moves(): number {
    return Math.floor(this.clicks / 2) // Tıklama sayısının yarısını alır (her bir hareket iki tıklama olarak düşünülür).
  }

  get isCompleted(): boolean {
    return this.cards.every((card) => card.isMatched)
  }

  // helpers (noMatchedCards ve visibleCards yardımcı fonksiyonlar)
  noMatchedCards(): Card[] {
    // this.cards dizisindeki kartları filtreler ve sadece state özelliği CardState.NotMatched olan kartları döndürür.
    return this.cards.filter((card) => card.state === CardState.NotMatched)
  }

  visibleCards(): Card[] {
    // this.cards dizisindeki kartları filtreler ve sadece state özelliği CardState.Visible olan kartları döndürür.
    return this.cards.filter((card) => card.state === CardState.Visible)
  }
}

// Game sınıfının bir örneğini oluşturur ve dışa aktarır. Bu örnek uygulamanın her yerinden erişilebilir ve kullanılabilir olur.
export const game = new Game()

// autorun, MobX'in reaktif sistemine bir yan etki ekler. Bu yan etki, verilen fonksiyonun içindeki reaktif verilere herhangi bir değişiklik olduğunda tekrar çalıştırılmasını sağlar.
autorun(() => {
  if (__DEV__) {
    reactotron.log!('autorun game clicks', game.clicks, 'cards', game.cards)
  }
})
