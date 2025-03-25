import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import viTranslation from '../locales/vi.json';

// Cấu hình i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      vi: {
        translation: viTranslation
      }
    },
    lng: 'vi', // Mặc định sử dụng tiếng Việt
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false // Không escape HTML
    }
  });

export default i18n; 