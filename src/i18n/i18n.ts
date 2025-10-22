import { createI18n } from "vue-i18n";
import es from './es.json';
import en from './en.json';

const i18n = createI18n({
    legacy: false,
    locale: 'es',
    fallbackLocale: 'en',
    messages: {
        es: es,
        en: en
    }
});

export default i18n;
