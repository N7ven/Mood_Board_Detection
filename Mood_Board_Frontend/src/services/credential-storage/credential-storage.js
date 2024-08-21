import { AppLanguageKeys, SessionTokenKeys } from './credential-storage-constants';

const getItem = localStorage.getItem.bind(localStorage);
const setItem = localStorage.setItem.bind(localStorage);
const removeItem = localStorage.removeItem.bind(localStorage);

export const setBearerToken = (token) => setItem(SessionTokenKeys.ID_TOKEN, token);
export const getBearerToken = () => getItem(SessionTokenKeys.ID_TOKEN);
export const removeBearerToken = () => removeItem(SessionTokenKeys.ID_TOKEN);
export const setAppLanguage = (lang) => setItem(AppLanguageKeys.APP_LANGUAGE, lang);
export const getAppLanguage = () => getItem(AppLanguageKeys.APP_LANGUAGE);
