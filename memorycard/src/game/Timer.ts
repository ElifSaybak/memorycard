import { action, makeObservable, observable, runInAction } from 'mobx'


// Dışarıya aktarılan Timer sınıfı
export class Timer {
  seconds = 0 // saniye başlangıç 0
  intervalId: NodeJS.Timeout | null = null // setInterval fonksiyonundan dönen zamanlayıcı kimliğini(ID) saklar. Başlangıçta null olduğu için zamanlayıcı çalışmıyor.

  constructor() { // Timer sınıfının bazı özelliklerini ve eylemlerini MobX'in reaktif sistemine entegre ediyor.
    makeObservable(this, {
      seconds: observable, // bu özellikteki değişiklikler izlenebilir ve UI güncellemelerini tetikleyebilir
      reset: action, // metodun uygulamanın durumunu değiştirebileceği ve bu değişikliklerin izleneceği anlamına gelir.
    })
  }

  start() {
    this.intervalId = setInterval(() => { //  setInterval kullanarak her saniye this.seconds'ı bir artırır.
      runInAction(() => { // bu durum değişikliğini MobX tarafından izlenebilir bir eylem olarak işaretler.
        this.seconds++
      })
    }, 1000)
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId) // zamanlayıcıyı durdurur.
    }
    this.intervalId = null // bu şekilde zamanlayıcı çalışmıyor
  }

  reset() {
    this.stop() // zamanlayıcıyı durdur
    this.seconds = 0 // sıfırlar
  }

  // isStarted bir getter metodu
  get isStarted(): boolean {
    return this.intervalId !== null // zamanlayıcının çalışıp çalışmadığını kontrol eder (true/false). null değilse çalışıyordur. 
  }
}
