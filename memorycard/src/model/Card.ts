import { CardType } from './CardType'

export class Card {
  // Card model sınıfı
  type: CardType // Kartın tipini tutar ve CardType enum'ından bir değer alır. Her kartın bir tipi olmalıdır ve bu, kartın hangi resme karşılık geldiğini belirleyecektir.
  isVisible: boolean = false // kartın görünürlük durumunu tutar ve varsayılan olarak false değerine sahiptir. Bu, kartın başlangıçta görünmez olduğu anlamına gelir.

  // Bu, Card sınıfının yapıcı metodudur. Bir Card nesnesi oluşturulurken CardType tipinden bir type parametresi alır ve bu parametreyi sınıfın type özelliğine atar.
  constructor(type: CardType) {
    this.type = type
  }

  // makeVisible ismindeki bu metot her çağrıldığında, isVisible özelliği true değerine ayarlanır.
  makeVisible() {
    this.isVisible = true
  }
}
