// ReactotronConfig.ts
import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';

// Reactotron'un tip tanımlamasını genişletmek için bir deklarasyon birleştirmesi yapılır
declare global {
  interface Console {
    tron: typeof Reactotron;
  }
}

// Birleşik deklarasyonla `tron` özelliği Console nesnesine eklenir
console.tron = Reactotron;

// `setAsyncStorageHandler` AsyncStorage'nin tipini bekler,
// bu yüzden onu doğrudan göndermek yeterlidir.
export default Reactotron.setAsyncStorageHandler!(AsyncStorage)
  .configure() // Bağlantı ve iletişim ayarlarını kontrol eder
  .useReactNative() // Tüm yerleşik React Native eklentilerini ekler
  .connect(); // Bağlanmayı başlatır

if (__DEV__) {
  Reactotron.clear!(); // Ekrandaki logları temizler
  console.log('Reactotron Configured');
}
