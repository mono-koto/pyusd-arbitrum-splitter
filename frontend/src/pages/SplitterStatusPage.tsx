import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Title,
  Card,
  Stack,
  Button,
  Text,
  Group,
  Badge,
  Divider,
  Box,
  Progress,
  Table,
  Alert,
  CopyButton,
  ActionIcon,
  Tooltip,
  LoadingOverlay,
  NumberFormatter
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconCopy, IconCheck, IconExternalLink, IconCoins, IconInfoCircle } from '@tabler/icons-react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, usePublicClient, useChainId } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'
import { isAddress, formatUnits} from 'viem'
import { SIMPLE_SPLITTER_ABI } from '../contracts/SimpleSplitter'
import { ERC20_ABI } from '../contracts/ERC20'
import { PYUSD_ADDRESSES } from '../config/pyusd'


const getPYUSDAddress = (chainId: number) => {
  return PYUSD_ADDRESSES[chainId]
}

// Helper function to get block explorer URL based on chain ID
const getBlockExplorerUrl = (chainId: number, address: string) => {
  
  const explorers: Record<number, string> = {
    42161: 'https://arbiscan.io', // Arbitrum One
    421614: 'https://sepolia.arbiscan.io', // Arbitrum Sepolia
  }

  const baseUrl = explorers[chainId] || 'https://arbiscan.io' // Default to Arbitrum One
  return `${baseUrl}/address/${address}`
}

interface Recipient {
  address: string
  share: bigint
  percentage: number
  balance: bigint
}

export function SplitterStatusPage() {
  const { address } = useParams<{ address: string }>()
  const { isConnected } = useAccount()
  const { open } = useAppKit()
  const publicClient = usePublicClient()
  const [isDistributing, setIsDistributing] = useState(false)
  const [recipients, setRecipients] = useState<Recipient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  const chainId = useChainId();

  const isValidAddress = address && isAddress(address)

  // Read contract data
  const { data: recipientCount } = useReadContract({
    address: isValidAddress ? address as `0x${string}` : undefined,
    abi: SIMPLE_SPLITTER_ABI,
    functionName: 'recipientCount',
    query: { enabled: !!isValidAddress }
  })

  const { data: totalShares } = useReadContract({
    address: isValidAddress ? address as `0x${string}` : undefined,
    abi: SIMPLE_SPLITTER_ABI,
    functionName: 'totalShares',
    query: { enabled: !!isValidAddress }
  })

  const { data: splitterBalance, refetch: refetchBalance } = useReadContract({
    address: getPYUSDAddress(chainId),
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: isValidAddress ? [address as `0x${string}`] : undefined,
    query: { enabled: !!isValidAddress }
  })

  // Write contract functions
  const { writeContract, data: hash } = useWriteContract({
    mutation: {
      onError: (error) => {
        setIsDistributing(false)
        notifications.show({
          title: 'Transaction Failed',
          message: error.message || 'Unknown error occurred',
          color: 'red',
        })
      }
    }
  })

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  // Fetch recipient data
  useEffect(() => {
    async function fetchRecipients() {
      if (!isValidAddress || !recipientCount || recipientCount === 0n) {
        setIsLoading(false)
        return
      }

      try {
        const recipientData: Recipient[] = []
        
        for (let i = 0; i < Number(recipientCount); i++) {
          // We'll use a simpler approach and make direct calls using the public client
          // This is more appropriate for dynamic data fetching
          const recipientPromise = publicClient?.readContract({
            address: address as `0x${string}`,
            abi: SIMPLE_SPLITTER_ABI,
            functionName: 'recipients',
            args: [BigInt(i)],
          })
          
          const sharePromise = publicClient?.readContract({
            address: address as `0x${string}`,
            abi: SIMPLE_SPLITTER_ABI,
            functionName: 'shares',
            args: [BigInt(i)],
          })

          if (recipientPromise && sharePromise) {
            const [recipientAddr, share] = await Promise.all([recipientPromise, sharePromise])
            const percentage = totalShares ? Number((share as bigint) * 100n / totalShares) : 0
            
            // Calculate individual balance
            const balance = splitterBalance && totalShares ? 
              (splitterBalance * (share as bigint)) / totalShares : 0n

            recipientData.push({
              address: recipientAddr as `0x${string}`,
              share: share as bigint,
              percentage,
              balance
            })
          }
        }

        setRecipients(recipientData)
      } catch (error) {
        console.error('Error fetching recipient data:', error)
        notifications.show({
          title: 'Error',
          message: 'Failed to load splitter data',
          color: 'red',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecipients()
  }, [isValidAddress, address, recipientCount, totalShares, splitterBalance, publicClient])

  // Handle successful distribution
  useEffect(() => {
    if (isSuccess) {
      setIsDistributing(false)
      notifications.show({
        title: 'Distribution Complete!',
        message: 'PYUSD has been distributed to all recipients',
        color: 'green',
      })
      // Refetch balance after successful distribution
      refetchBalance()
    }
  }, [isSuccess, refetchBalance])

  const handleDistribute = async () => {
    if (!isConnected) {
      notifications.show({
        title: 'Wallet not connected',
        message: 'Please connect your wallet first',
        color: 'red',
      })
      return
    }

    if (!splitterBalance || splitterBalance === 0n) {
      notifications.show({
        title: 'No funds to distribute',
        message: 'This splitter has no PYUSD balance to distribute',
        color: 'orange',
      })
      return
    }

    try {
      setIsDistributing(true)
      
      writeContract({
        address: address as `0x${string}`,
        abi: SIMPLE_SPLITTER_ABI,
        functionName: 'distribute',
      })
      
    } catch (error) {
      console.error('Error distributing funds:', error)
      notifications.show({
        title: 'Error',
        message: 'Failed to distribute funds',
        color: 'red',
      })
      setIsDistributing(false)
    }
  }

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

  if (!address || !isValidAddress) {
    return (
      <Stack align="center" mt="xl">
        <Alert color="red" icon={<IconInfoCircle size={16} />}>
          Invalid splitter address provided
        </Alert>
      </Stack>
    )
  }

  return (
    <Stack gap="xl" mt="xl">
      <Box ta="center">
        <Title order={1} size="h2">
          PYUSD Splitter Status
        </Title>
        <Text c="dimmed" mt="sm">
          Monitor and distribute funds for your splitter
        </Text>
      </Box>

      <Card shadow="sm" padding="xl" radius="md" withBorder maw={800} mx="auto" w="100%">
        <LoadingOverlay visible={isLoading} />
        
        <Stack gap="lg">
          {/* Splitter Address */}
          <Box>
            <Text fw={500} size="lg" mb="sm">Splitter Address</Text>
            <Group gap="xs">
              <Text ff="monospace" size="sm">
                {address}
              </Text>
              <CopyButton value={address}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? 'Copied' : 'Copy address'}>
                    <ActionIcon variant="subtle" onClick={copy}>
                      {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
              <Tooltip label="View on block explorer">
                <ActionIcon
                  variant="subtle"
                  onClick={() => window.open(getBlockExplorerUrl(chainId, address), '_blank')}
                >
                  <IconExternalLink size={16} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Box>

          <Divider />

          {/* Total Balance */}
          <Box>
            <Group justify="space-between" align="center" mb="md">
              <Text fw={500} size="lg">Total PYUSD Balance</Text>
              <Badge 
                size="lg" 
                color={splitterBalance && splitterBalance > 0n ? 'green' : 'gray'}
                leftSection={<IconCoins size={16} />}
              >
                <NumberFormatter 
                  value={splitterBalance ? formatUnits(splitterBalance, 6) : '0'} 
                  thousandSeparator="," 
                  decimalScale={6}
                  suffix=" PYUSD"
                />
              </Badge>
            </Group>
            
            {splitterBalance && splitterBalance > 0n && (
              <Progress value={100} color="green" size="sm" />
            )}
          </Box>

          <Divider />

          {/* Recipients */}
          <Box>
            <Text fw={500} size="lg" mb="md">Recipients & Allocation</Text>
            
            {recipients.length > 0 ? (
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Recipient</Table.Th>
                    <Table.Th ta="center">Share %</Table.Th>
                    <Table.Th ta="right">PYUSD Amount</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {recipients.map((recipient, index) => (
                    <Table.Tr key={index}>
                      <Table.Td>
                        <Group gap="xs">
                          <Text ff="monospace" size="sm">
                            {`${recipient.address.slice(0, 6)}...${recipient.address.slice(-4)}`}
                          </Text>
                          <CopyButton value={recipient.address}>
                            {({ copied, copy }) => (
                              <ActionIcon size="xs" variant="subtle" onClick={copy}>
                                {copied ? <IconCheck size={12} /> : <IconCopy size={12} />}
                              </ActionIcon>
                            )}
                          </CopyButton>
                        </Group>
                      </Table.Td>
                      <Table.Td ta="center">
                        <Badge variant="light">
                          {recipient.percentage}%
                        </Badge>
                      </Table.Td>
                      <Table.Td ta="right">
                        <Text fw={500}>
                          <NumberFormatter 
                            value={formatUnits(recipient.balance, 6)} 
                            thousandSeparator="," 
                            decimalScale={6}
                            suffix=" PYUSD"
                          />
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            ) : (
              <Text c="dimmed" ta="center">No recipient data available</Text>
            )}
          </Box>

          <Divider />

          {/* Distribution Button */}
          <Button
            size="lg"
            fullWidth
            leftSection={<IconCoins size={20} />}
            onClick={isConnected ? handleDistribute : handleWalletConnect}
            loading={isDistributing || isConfirming}
            disabled={isConnected && (!splitterBalance || splitterBalance === 0n)}
            color={splitterBalance && splitterBalance > 0n ? 'green' : 'gray'}
          >
            {isDistributing || isConfirming ? 
              'Distributing...' : 
              !isConnected ? 'Connect Wallet to Distribute' :
              (!splitterBalance || splitterBalance === 0n) ? 'No Funds to Distribute' :
              `Distribute ${formatUnits(splitterBalance, 6)} PYUSD`
            }
          </Button>

          {/* Info */}
          <Alert color="blue" icon={<IconInfoCircle size={16} />}>
            <Text size="sm">
              Anyone can call the distribute function. The gas fee will be paid by the caller, 
              but all recipients will receive their proportional share of the PYUSD balance.
            </Text>
          </Alert>
        </Stack>
      </Card>
    </Stack>
  )
}