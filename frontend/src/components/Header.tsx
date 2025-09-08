import { Group, Text, Button, Container, Drawer, Burger, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Link } from 'react-router-dom'
import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import { notifications } from '@mantine/notifications'
import { IconArrowUpRight } from '@tabler/icons-react'

export function Header() {
  const { open } = useAppKit()
  const { address, isConnected } = useAppKitAccount()
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false)

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
    <>
      <Container size="md" h="100%" px="md">
        <Group h="100%" justify="space-between">
          <Group>
            <Text size="lg" fw={600} component={Link} to="/" c="blue">
              PYUSD SimpleSplitter
            </Text>
          </Group>

          {/* Desktop Navigation */}
          <Group visibleFrom="sm">
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

          {/* Mobile Hamburger */}
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
            size="sm"
          />
        </Group>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        position="right"
        size="sm"
        padding="md"
        hiddenFrom="sm"
        title="Menu"
      >
        <Stack gap="md">
          <Button
            component="a"
            href="https://github.com/mono-koto/pyusd-arbitrum-splitter"
            target="_blank"
            rel="noopener noreferrer"
            variant="subtle"
            rightSection={<IconArrowUpRight size={16} />}
            onClick={closeDrawer}
            fullWidth
            justify="flex-start"
          >
            GitHub
          </Button>
          
          <Button
            component={Link}
            to="/create"
            variant="filled"
            onClick={closeDrawer}
            fullWidth
            justify="flex-start"
          >
            Create Splitter
          </Button>
          
          <Button
            onClick={() => {
              handleWalletClick()
              closeDrawer()
            }}
            variant={isConnected ? "light" : "filled"}
            color="green"
            fullWidth
            justify="flex-start"
          >
            {isConnected ? formatAddress(address!) : 'Connect Wallet'}
          </Button>
        </Stack>
      </Drawer>
    </>
  )
}