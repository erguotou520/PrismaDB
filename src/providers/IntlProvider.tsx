import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { createIntl, createIntlCache, IntlProvider as ReactIntlProvider } from 'react-intl'

const LANGUAGE_STORE_KEY = 'user.language'

interface IntlProviderProps {
  children?: ReactNode
}

function loadLangs(lang: string) {
  return window.fetch(`/lang/${lang}.json`).then(resp => resp.json())
}

const browserLanguage = window.navigator.language
const currentLanguage = localStorage.getItem(LANGUAGE_STORE_KEY) || browserLanguage || 'en'

// This is optional but highly recommended
// since it prevents memory leak
const cache = createIntlCache()
let _lang: string = currentLanguage
let _messages: Record<string, string> = {}

export const intl = createIntl(
  {
    locale: _lang,
    messages: _messages,
    defaultLocale: currentLanguage
  },
  cache
)

export type IntlState = {
  lang: string
  setLang: (lang: string) => void
  messages: Record<string, string>
}

const IntlContext = createContext<IntlState>(
  // @ts-ignore
  null
)

const IntlProvider = ({ children }: IntlProviderProps) => {
  const [lang, _setLang] = useState(currentLanguage)
  const [messages, setMessages] = useState<Record<string, string>>({})

  const setLang = useCallback((lang: string) => {
    _setLang(lang)
    _lang = lang
    localStorage.setItem(LANGUAGE_STORE_KEY, lang)
  }, [])

  useEffect(() => {
    if (lang) {
      loadLangs(lang).then(json => {
        setMessages(json)
        _messages = json
      })
    }
  }, [lang])

  return (
    <IntlContext.Provider value={{ lang, setLang, messages }}>
      {messages && (
        <ReactIntlProvider messages={messages} locale={lang} defaultLocale={browserLanguage}>
          {children}
        </ReactIntlProvider>
      )}
    </IntlContext.Provider>
  )
}

export default IntlProvider

export function useAppIntl() {
  return useContext(IntlContext)
}
