import {
  Title,
  Text,
  Button,
  Card,
  Stack,
  Group,
  Badge,
  Alert,
  Box,
  Flex,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useAccount, useChainId } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { notifications } from "@mantine/notifications";
import {
  IconArrowRight,
  IconInfoCircle,
  IconWallet,
} from "@tabler/icons-react";

export function HomePage() {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const { open } = useAppKit();

  const isArbitrumSepolia = chainId === 421614;
  const isArbitrumOne = chainId === 42161;

  const handleWalletConnect = async () => {
    try {
      open({ view: "Connect" });
    } catch (error) {
      console.error("Failed to open wallet connect modal:", error);
      notifications.show({
        title: "Connection Error",
        message: "Failed to open wallet connection. Please try again.",
        color: "red",
      });
    }
  };

  const handleNetworkSwitch = async () => {
    try {
      open({ view: "Networks" });
    } catch (error) {
      console.error("Failed to open network switch modal:", error);
      notifications.show({
        title: "Network Error",
        message: "Failed to open network selection. Please try again.",
        color: "red",
      });
    }
  };

  return (
    <Stack gap="xl" mt="xl">
      {/* Hero Section */}
      <Box ta="center">
        <Title order={1} size="h1" mb="md">
          PYUSD SimpleSplitter
        </Title>
        <Text size="lg" c="dimmed" mb="xl" mx="auto" maw={600}>
          Simple, transparent, efficient PYUSD splitter on Arbitrum. Use it for
          revenue sharing, payments, and group expenses.
        </Text>

        {/* Network Info */}
        {isConnected && (
          <Alert
            variant="light"
            color="gray"
            icon={<IconInfoCircle size={16} />}
          >
            <Group justify="space-between">
              <div>
                <Text size="sm" fw={500}>
                  Connected: {address}
                </Text>
                <Text size="xs" c="dimmed">
                  Network:{" "}
                  {isArbitrumSepolia
                    ? "Arbitrum Sepolia (Testnet)"
                    : isArbitrumOne
                    ? "Arbitrum One (Mainnet)"
                    : "Unsupported Network"}
                </Text>
              </div>
              {(isArbitrumSepolia || isArbitrumOne) && (
                <Badge color="green">Ready</Badge>
              )}
            </Group>
          </Alert>
        )}
      </Box>

      {/* How It Works */}
      <Flex align="stretch" gap="md" direction={{ base: "column", sm: "row" }}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Text fw={500}>1. Create Splitter</Text>
            <Badge color="blue" variant="light">
              Deploy
            </Badge>
          </Group>
          <Text size="sm" c="dimmed">
            Set up a new splitter by defining recipients and their percentage
            shares. Each splitter is a minimal proxy contract.
          </Text>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Text fw={500}>2. Send PYUSD</Text>
            <Badge color="green" variant="light">
              Transfer
            </Badge>
          </Group>
          <Text size="sm" c="dimmed">
            Anyone can send PYUSD tokens to your splitter contract. The tokens
            will accumulate until distribution is triggered.
          </Text>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Text fw={500}>3. Distribute</Text>
            <Badge color="violet" variant="light">
              Split
            </Badge>
          </Group>
          <Text size="sm" c="dimmed">
            Call the distribute function to automatically split all accumulated
            PYUSD according to the predefined percentages.
          </Text>
        </Card>
      </Flex>

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
    </Stack>
  );
}
