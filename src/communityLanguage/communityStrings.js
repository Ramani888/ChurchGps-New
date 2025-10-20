import LocalizedStrings from 'react-native-localization';
import english_language from './en';
import arabic_language from './ar';
import german_language from './de';
import spanish_language from './es';
import french_language from './fr';
import japanese_language from './ja';
import lorean_language from './ko';

export const communityStrings = new LocalizedStrings({
  en: english_language,
  ar: arabic_language,
  de: german_language,
  es: spanish_language,
  fr: french_language,
  ja: japanese_language,
  ko: lorean_language,
});
