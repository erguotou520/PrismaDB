import { ActionIcon, Header, Title } from '@mantine/core'
import { IconMoon, IconSun } from '@tabler/icons-react'

import { useTheme } from '@/store/theme'

const AppHeader = () => {
  const { appTheme, toggleTheme } = useTheme()
  return (
    <Header height={36} px={12} className="flex items-center">
      <Title order={3}>PrismaDB</Title>
      <ActionIcon p={4} ml="auto" variant="light" onClick={toggleTheme}>
        {appTheme === 'auto' ? <span>A</span> : appTheme === 'dark' ? <IconMoon /> : <IconSun />}
      </ActionIcon>
    </Header>
  )
}

export default AppHeader
