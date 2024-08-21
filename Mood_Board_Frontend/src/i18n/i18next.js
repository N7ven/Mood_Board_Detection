import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as locales from './locales';

const resources = {
  ...Object.entries(locales).reduce(
    (acc, [ key, value ]) => ({
      ...acc,
      [key]: {
        translation: value
      }
    }),
    {}
  )
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
