import { makeAutoObservable } from 'mobx'
import { CardType } from './CardType'
import { Game } from './Game'

export class Card {
  // Card model sınıfı
  type: CardType // Kartın tipini tutar ve CardType enum'ından bir değer alır. Her kartın bir tipi olmalıdır ve bu, kartın hangi resme karşılık geldiğini belirleyecektir.
  isVisible: boolean = false // kartın görünürlük durumunu tutar ve varsayılan olarak false değerine sahiptir. Bu, kartın başlangıçta görünmez olduğu anlamına gelir.
  game: Game // kartın ait olduğu oyunun bir referansını tutar.

  // Bu, Card sınıfının yapıcı metodudur. Bir Card nesnesi oluşturulurken CardType tipinden bir type parametresi alır ve bu parametreyi sınıfın type özelliğine atar.
  constructor(type: CardType, game: Game) {
    // Otomatik olarak izlenebilir yapmak için MobX tarafından kullanılan bir fonksiyon
    makeAutoObservable(this, { 
      // type ve game özelliklerini izleme X - değerler değişirse MobX tarafından herhangi bir eylem gerçekleştirmez
      type: false,
      game: false,
    })

    this.type = type
    this.game = game
  }

  // makeVisible ismindeki bu metot her çağrıldığında, isVisible özelliği true değerine ayarlanır.
  makeVisible() {
    this.isVisible = true
    this.game.incrementClicks() // oyunun tıklama sayısını arttırmak için
  }
}
