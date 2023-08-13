import { AppShell, Footer, Header, MantineProvider, Navbar } from '@mantine/core'
import { useEffect } from 'react'

import AppHeader from './layouts/Header'
import AppMenu from './layouts/Menu'
import IntlProvider from './providers/IntlProvider'
import { useTheme } from './store/theme'

function App() {
  const { initialize, uiTheme } = useTheme()

  useEffect(() => {
    initialize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return uiTheme ? (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: uiTheme }}>
      <IntlProvider>
        <AppShell
          padding="md"
          navbar={<AppMenu />}
          header={<AppHeader />}
          footer={
            <Footer height={60} p="xs">
              333
            </Footer>
          }
          styles={theme => ({
            main: {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
            }
          })}
        >
          content
        </AppShell>
      </IntlProvider>
    </MantineProvider>
  ) : (
    <></>
  )
}

export default App
