import { ColorScheme } from '@mantine/core'
import { create } from 'zustand'

const THEME_STORE_KEY = 'user.theme'

interface ThemeState {
  appTheme: ColorScheme | 'auto'
  uiTheme: ColorScheme | null
  toggleTheme: () => void
  initialize: () => void
}

let cancelListener: null | (() => void)

function setupAutoMode(onChange: (theme: ColorScheme) => void) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handleMediaQueryChange = (e: MediaQueryListEvent) => {
    onChange(e.matches ? 'dark' : 'light')
  }

  mediaQuery.addEventListener('change', handleMediaQueryChange)
  cancelListener = () => {
    mediaQuery.removeEventListener('change', handleMediaQueryChange)
  }
  onChange(mediaQuery.matches ? 'dark' : 'light')
}

const stored = localStorage.getItem(THEME_STORE_KEY) as ColorScheme | null

export const useTheme = create<ThemeState>((set, get) => ({
  appTheme: stored || 'auto',
  uiTheme: null,
  toggleTheme() {
    switch (get().appTheme) {
      case 'auto':
        set({ appTheme: 'light', uiTheme: 'light' })
        localStorage.setItem(THEME_STORE_KEY, 'light')
        cancelListener?.()
        cancelListener = null
        break
      case 'light':
        set({ appTheme: 'dark', uiTheme: 'dark' })
        localStorage.setItem(THEME_STORE_KEY, 'dark')
        break
      case 'dark':
        set({ appTheme: 'auto' })
        localStorage.setItem(THEME_STORE_KEY, 'auto')
        setupAutoMode(theme => set({ uiTheme: theme }))
    }
  },
  initialize() {
    if (get().appTheme === 'auto') {
      setupAutoMode(theme => set({ uiTheme: theme }))
    } else {
      set({ uiTheme: get().appTheme as ColorScheme })
    }
  }
}))
