interface Language {
  name: string
  nativeName: string
}

interface Languages {
  [key: string]: Language
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const languagesList: Languages = {
  en: {
    name: 'English',
    nativeName: 'English',
  },
  ku: {
    name: 'Kurdish',
    nativeName: 'Kurdî, كوردی‎',
  },
  tr: {
    name: 'Turkish',
    nativeName: 'Türkçe',
  },
}

export default languagesList;
