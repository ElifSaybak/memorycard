import { action, makeObservable, observable, runInAction } from 'mobx'
import { CardType, CardTypeInfo } from './CardType'
import { Game } from './Game'
import { CardState } from './CardState'
import reactotron from 'reactotron-react-native'
import { NO_MATCH_ANIMATION_DURATION } from '../component/CardView'
import { Color } from '../style/Color'

const BACKGROUND_COLOR_INVISIBLE = Color.coyote
const BACKGROUND_COLOR_VISIBLE = Color.hookers_green
const BACKGROUND_COLOR_MATCHED = Color.ash_gray
const BACKGROUND_COLOR_NOT_MATCHED = Color.rust

export class Card {
  // Card model sınıfı
  type: CardType // Kartın tipini tutar ve CardType enum'ından bir değer alır. Her kartın bir tipi olmalıdır ve bu, kartın hangi resme karşılık geldiğini belirleyecektir.
  typeName: string
  state: CardState = CardState.Invisible // Kartın başlangıç durumu CardState.Invisible. Bu başlangıçta görünmez olduğu anlamına gelir.
  game: Game // kartın ait olduğu oyunun bir referansını tutar.

  // Bu, Card sınıfının yapıcı metodudur.
  constructor(type: CardType, game: Game) {
    // Card sınıfının özelliklerini ve metodlarını MobX'in reaktif sistemine entegre eder.
    makeObservable(this, {
      // makeVisible, makeMatched ve hide methodları action = uygulamanın durumunu değiştirebileceğini ve bu değişikliklerin MobX taeafından izleyeceğini gösterir.
      state: observable,
      makeVisible: action,
      makeMatched: action,
      hide: action,
    })

    // Yapıcı fonksiyonda alınan parametreler (type,game), sınıfın özelliklerine atanır.
    this.type = type // type parametresi, CardType tipindendir.
    this.typeName = CardTypeInfo[type].typeName
    this.game = game // game parametresi, Game tipindendir.
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
    }, NO_MATCH_ANIMATION_DURATION)
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
