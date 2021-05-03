import { I18nManager } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize'; // Use for caching/memoize for better performance

const translationGetters = {
    // lazy requires (metro bundler does not support symlinks)
    en: () => require('./en.json'),
    vi: () => require('./vi.json'),
    khm: () => require('./khm.json')
};

export const checkLanguageAvailible = (language) => {
    let _language = 'en';
    if (language === 'en' || language === 'vi' || language === 'kmh') {
        _language = language;
    }
    return _language;
};

export const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
);

export const setI18nConfigWithLanguageDevice = () => {
    // fallback if no available language fits
    const fallback = { languageTag: 'en', isRTL: false };
    // Method auto language with language device......
    const { languageTag, isRTL } =
        RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
        fallback;

    // clear translation cache
    translate.cache.clear();
    // update layout direction
    I18nManager.forceRTL(isRTL);
    // set i18n-js config
    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    i18n.locale = languageTag;
};
export const getCurrentLocaleLanguage = () => {
    return i18n.currentLocale();
};
export const setI18nConfig = (language = 'vn') => {
    console.log('setI18nConfig >> ', language);
    // fallback if no available language fits
    const fallback = { languageTag: language, isRTL: false };
    // Method auto language with language device......
    const { languageTag, isRTL } = fallback;
    // clear translation cache
    translate.cache.clear();
    // update layout direction
    I18nManager.forceRTL(isRTL);
    // set i18n-js config
    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    i18n.locale = languageTag;
    console.log('i18n', i18n);
};

/**
 *
 * @param {*} language
 * @param {*} callback ... ex: changeLanguage('en',this.forceUpdate())
 */
export const changeLanguage = (language, callback) => {
    setI18nConfig(language);
    callback;
};
