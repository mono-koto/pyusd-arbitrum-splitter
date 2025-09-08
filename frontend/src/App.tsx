import { Routes, Route } from 'react-router-dom'
import { AppShell, Container } from '@mantine/core'
import { Header } from './components/Header'
import { HomePage } from './pages/HomePage'
import { CreateSplitterPage } from './pages/CreateSplitterPage'
import { SplitterStatusPage } from './pages/SplitterStatusPage'

function App() {
  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      
      <AppShell.Main>
        <Container size="md" px="md">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateSplitterPage />} />
            <Route path="/splitter/:address" element={<SplitterStatusPage />} />
          </Routes>
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}

export default App
