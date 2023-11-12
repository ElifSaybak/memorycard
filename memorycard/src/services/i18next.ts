import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../locales/en'
import tr from '../locales/tr'
import ku from '../locales/ku'

//  Her bir dil için çevirileri içeren bir nesne
export const languageResources = {
  // Her dil kodu (en, tr, ku), o dile ait çevirileri içeren bir nesneye eşlenir.
  en: { translation: en },
  tr: { translation: tr },
  ku: { translation: ku },
}

  // i18next'i initReactI18next eklentisiyle başlatır.
i18next.use(initReactI18next).init({//  react ile uyumlu bir şekilde çalışmasını sağlar
  compatibilityJSON: 'v3', //  i18next için JSON formatı uyumluluğunu belirtir
  lng: 'en', // varsayılan dil
  fallbackLng: 'en', // istenilen dil yoksa kullanılacak yedek dil
  resources: languageResources, // çevirilerin tanımlandığı languageResources nesnesi
})

export default i18next;
