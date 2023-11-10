import { makeAutoObservable, runInAction } from 'mobx'
import { CardType } from './CardType'
import { Game } from './Game'
import { CardState } from './CardState'
import reactotron from 'reactotron-react-native'

const BACKGROUND_COLOR_INVISIBLE = '#3D5161'
const BACKGROUND_COLOR_VISIBLE = '#02B3E4'
const BACKGROUND_COLOR_MATCHED = '#02CCBA'
const BACKGROUND_COLOR_NOT_MATCHED = ' rgb(233,93,93)'

export class Card {
  // Card model sınıfı
  type: CardType // Kartın tipini tutar ve CardType enum'ından bir değer alır. Her kartın bir tipi olmalıdır ve bu, kartın hangi resme karşılık geldiğini belirleyecektir.
  state: CardState = CardState.Invisible // Kartın başlangıç durumu CardState.Invisible. Bu başlangıçta görünmez olduğu anlamına gelir.
  game: Game // kartın ait olduğu oyunun bir referansını tutar.

  // Bu, Card sınıfının yapıcı metodudur. Bir Card nesnesi oluşturulurken CardType tipinden bir type parametresi alır ve bu parametreyi sınıfın type özelliğine atar.
  constructor(type: CardType, game: Game) {
    // Otomatik olarak izlenebilir yapmak için MobX tarafından kullanılan bir fonksiyon
    makeAutoObservable(this, {
      // type ve game özelliklerini izleme! X - değerler değişirse MobX tarafından herhangi bir eylem gerçekleştirmez
      type: false,
      game: false,
      backgroundColor: false,
    })

    this.type = type
    this.game = game
  }

  onClick() {
    if (this.state === CardState.Invisible) {
      // Kart invisible ise game.onClick çağırır.
      this.game.onClick(this)
    } else {
      reactotron.log!('onClick() ignored')
    }
  }

  makeVisible() {
    this.state = CardState.Visible // kartın durumunu visible yap
  }

  makeMatched() {
    this.state = CardState.Matched // kartın durumunu matched yap
  }

  hide() {
    this.state = CardState.NotMatched // kartın durumunu önce nomatched olarak değiştirir
    setTimeout(() => {
      // 1 sn sonra kartın durumunu invisible olarak değiştirir.
      runInAction(() => {
        // runInAction, MobX ile durum değişikliliğini işlemek içindir.
        this.state = CardState.Invisible
      })
    }, 1000)
  }

  // kartın tipi methodun ait oldugu nesnenin tipi ile eşleşiyor mu (true/false)
  matches(card: Card): boolean {
    return card.type === this.type
  }

  // isInVisible getter methodu
  // kart nesnesinin  mevcut state özelliği CardState.Invisible ile eşit mi? (true/false)
  get isInVisible(): boolean {
    return this.state === CardState.Invisible
  }

  // isVisible getter methodu
  // kart nesnesinin  mevcut state özelliği CardState.Visible ile eşit mi? (true/false)
  get isVisible(): boolean {
    return this.state === CardState.Visible
  }

  // isMatched getter methodu
  // kart nesnesinin  mevcut state özelliği CardState.Matched ile eşit mi? (true/false)
  get isMatched(): boolean {
    return this.state === CardState.Matched
  }

  // isNotMatched getter methodu
  // kart nesnesinin  mevcut state özelliği CardState.NotMatched ile eşit mi? (true/false)
  get isNotMatched(): boolean {
    return this.state === CardState.NotMatched
  }

  // Getter Methodu
  get backgroundColor(): string {
    // kartın durumuna göre arka plan renkleri döndürür.
    switch (this.state) {
      case CardState.Invisible:
        return BACKGROUND_COLOR_INVISIBLE
      case CardState.Visible:
        return BACKGROUND_COLOR_VISIBLE
      case CardState.Matched:
        return BACKGROUND_COLOR_MATCHED
      case CardState.NotMatched:
        return BACKGROUND_COLOR_NOT_MATCHED
    }
  }
}
