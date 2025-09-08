import { Group, Text, Button, Container } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import { notifications } from '@mantine/notifications'
import { IconArrowUpRight } from '@tabler/icons-react'

export function Header() {
  const { open } = useAppKit()
  const { address, isConnected } = useAppKitAccount()

  const handleWalletClick = async () => {
    try {
      if (isConnected) {
        open({ view: 'Account' })
      } else {
        open({ view: 'Connect' })
      }
    } catch (error) {
      console.error('Wallet operation failed:', error)
      notifications.show({
        title: 'Connection Error',
        message: 'Failed to open wallet modal. Please try again.',
        color: 'red',
      })
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <Container size="md" h="100%" px="md">
      <Group h="100%" justify="space-between">
        <Group>
          <Text size="lg" fw={600} component={Link} to="/" c="blue">
            PYUSD SimpleSplitter
          </Text>
        </Group>

        <Group>
          <Button
            component="a"
            href="https://github.com/mono-koto/pyusd-arbitrum-splitter"
            target="_blank"
            rel="noopener noreferrer"
            variant="subtle"
            rightSection={<IconArrowUpRight size={16} />}
          >
            GitHub
          </Button>
          
          <Button
            component={Link}
            to="/create"
            variant="filled"
          >
            Create Splitter
          </Button>
          
          <Button
            onClick={handleWalletClick}
            variant={isConnected ? "light" : "filled"}
            color="green"
          >
            {isConnected ? formatAddress(address!) : 'Connect Wallet'}
          </Button>
        </Group>
      </Group>
    </Container>
  )
}