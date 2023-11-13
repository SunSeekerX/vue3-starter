import { createI18n } from 'vue-i18n'

// import { storageAppLocale } from '@/constant'
import zh_CN from './lang/zh-cn'
import en_US from './lang/en'
import zh_TW from './lang/zh-tw'

const isProd = import.meta.env.PROD

function onGetEnvLocale() {
  let localeKey = null
  let localeName = null
  const query = location.href
  let vars = query.split('lang=')
  if (vars && vars.length > 0 && vars[1] == 'zh_CN') {
    localeKey = 'zh-CN'
    localeName = '简体中文'
  } else if (vars && vars.length > 0 && vars[1] == 'en') {
    localeKey = 'en'
    localeName = 'English'
  } else if (vars && vars.length > 0 && vars[1] == 'zh_TW') {
    localeKey = 'zh-TW'
    localeName = '繁体中文'
  }
  // if (!localeKey) {
  //   const appLocale = storage.getStorageSync(storageAppLocale, true)
  //   if (appLocale) {
  //     localeKey = appLocale.localeKey
  //     localeName = appLocale.localeName
  //   }
  // }

  if (!localeKey) {
    let lang = navigator.language || navigator.userLanguage
    lang = lang.substr(0, 2)
    if (lang === 'zh') {
      localeKey = 'zh-CN'
      localeName = '简体中文'
    } else if (lang === 'en') {
      localeKey = 'en'
      localeName = 'English'
    } else if (lang === 'zh-TW') {
      localeKey = 'zh-TW'
      localeName = '繁体中文'
    }
  }

  if (!localeKey) {
    localeKey = import.meta.env.VITE_DEFAULT_LOCALE_KEY
    localeName = import.meta.env.VITE_DEFAULT_LOCALE_NAME
  }

  return {
    localeKey,
    localeName,
  }
}

export const { localeKey, localeName } = onGetEnvLocale()

export const i18n = createI18n({
  locale: localeKey,
  fallbackLocale: 'en',
  silentTranslationWarn: isProd,
  messages: {
    en: en_US,
    'zh-CN': zh_CN,
    'zh-TW': zh_TW,
  },
})
