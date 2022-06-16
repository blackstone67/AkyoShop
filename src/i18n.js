import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';

import { transitionEN } from './locales/en/transitionEN';

import { transitionVI } from './locales/vi/transitionVI';

i18n.use(initReactI18next).init({
  resources: {
    vi: {
      translation: transitionVI,
    },
    en: {
      translation: transitionEN,
    },
  },
  lng: 'vi',

  keySeparator: false,

  //   fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
