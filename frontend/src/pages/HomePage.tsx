import { 
  Title, 
  Text, 
  Button, 
  Card, 
  Stack, 
  Group,
  Badge,
  Alert,
  Box
} from '@mantine/core'
import { Link } from 'react-router-dom'
import { useAccount, useChainId } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'
import { notifications } from '@mantine/notifications'
import { IconArrowRight, IconInfoCircle, IconWallet } from '@tabler/icons-react'

export function HomePage() {
  const { isConnected, address } = useAccount()
  const chainId = useChainId()
  const { open } = useAppKit()
  
  const isArbitrumSepolia = chainId === 421614
  const isArbitrumOne = chainId === 42161

  const handleWalletConnect = async () => {
    try {
      open({ view: 'Connect' })
    } catch (error) {
      console.error('Failed to open wallet connect modal:', error)
      notifications.show({
        title: 'Connection Error',
        message: 'Failed to open wallet connection. Please try again.',
        color: 'red',
      })
    }
  }

  const handleNetworkSwitch = async () => {
    try {
      open({ view: 'Networks' })
    } catch (error) {
      console.error('Failed to open network switch modal:', error)
      notifications.show({
        title: 'Network Error',
        message: 'Failed to open network selection. Please try again.',
        color: 'red',
      })
    }
  }

  return (
    <Stack gap="xl" mt="xl">
      {/* Hero Section */}
      <Box ta="center">
        <Title order={1} size="h1" mb="md">
          PYUSD SimpleSplitter
        </Title>
        <Text size="lg" c="dimmed" mb="xl">
          Create transparent, gas-efficient token splitters for PYUSD on Arbitrum.
          Perfect for revenue sharing, payments, and group expenses.
        </Text>
        
        {!isConnected && (
          <Alert 
            variant="light" 
            color="blue" 
            title="Connect your wallet to get started"
            icon={<IconWallet size={16} />}
            mb="xl"
          >
            Connect your wallet to create and manage PYUSD splitters
          </Alert>
        )}

        {isConnected && !isArbitrumSepolia && !isArbitrumOne && (
          <Alert 
            variant="light" 
            color="orange" 
            title="Switch to Arbitrum network"
            icon={<IconInfoCircle size={16} />}
            mb="xl"
          >
            Please switch to Arbitrum One (mainnet) or Arbitrum Sepolia (testnet) to use the splitter
          </Alert>
        )}
      </Box>

      {/* Features Cards */}
      <Group grow align="stretch">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Text fw={500}>Gas Efficient</Text>
            <Badge color="green" variant="light">
              ~2,100 gas
            </Badge>
          </Group>
          <Text size="sm" c="dimmed">
            Uses OpenZeppelin Clones for minimal proxy deployment,
            making splitter creation extremely cost-effective.
          </Text>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Text fw={500}>Transparent</Text>
            <Badge color="blue" variant="light">
              On-chain
            </Badge>
          </Group>
          <Text size="sm" c="dimmed">
            All splitter logic is deployed on Arbitrum with
            verified contracts. No hidden fees or surprises.
          </Text>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Text fw={500}>Easy to Use</Text>
            <Badge color="violet" variant="light">
              Simple
            </Badge>
          </Group>
          <Text size="sm" c="dimmed">
            Create splitters with just recipient addresses and
            their percentage shares. Send tokens and distribute automatically.
          </Text>
        </Card>
      </Group>

      {/* Action Section */}
      <Card shadow="sm" padding="xl" radius="md" withBorder ta="center">
        <Title order={2} size="h2" mb="md">
          Ready to create your first splitter?
        </Title>
        <Text mb="xl" c="dimmed">
          Set up automatic PYUSD distribution to multiple recipients
        </Text>
        
        {isConnected && (isArbitrumSepolia || isArbitrumOne) ? (
          <Button
            component={Link}
            to="/create"
            size="lg"
            rightSection={<IconArrowRight size={18} />}
          >
            Get Started
          </Button>
        ) : !isConnected ? (
          <Button
            size="lg"
            onClick={handleWalletConnect}
            leftSection={<IconWallet size={18} />}
          >
            Connect Wallet to Get Started
          </Button>
        ) : (
          <Button
            size="lg"
            onClick={handleNetworkSwitch}
            leftSection={<IconWallet size={18} />}
            variant="light"
          >
            Switch to Arbitrum Network
          </Button>
        )}
      </Card>

      {/* Network Info */}
      {isConnected && (
        <Alert variant="light" color="gray" icon={<IconInfoCircle size={16} />}>
          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>Connected: {address}</Text>
              <Text size="xs" c="dimmed">
                Network: {isArbitrumSepolia ? 'Arbitrum Sepolia (Testnet)' : 
                         isArbitrumOne ? 'Arbitrum One (Mainnet)' : 
                         'Unsupported Network'}
              </Text>
            </div>
            {(isArbitrumSepolia || isArbitrumOne) && (
              <Badge color="green">Ready</Badge>
            )}
          </Group>
        </Alert>
      )}
    </Stack>
  )
}