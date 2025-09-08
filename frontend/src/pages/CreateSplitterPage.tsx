import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Title,
  Card,
  Stack,
  Button,
  TextInput,
  NumberInput,
  Group,
  Text,
  ActionIcon,
  Alert,
  Badge,
  Divider,
  Box,
  Progress,
  Flex,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  IconTrash,
  IconPlus,
  IconInfoCircle,
} from "@tabler/icons-react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
} from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { isAddress, decodeEventLog } from "viem";
import {
  SIMPLE_SPLITTER_FACTORY_ABI,
} from "../contracts/SimpleSplitterFactory";
import { SPLITTER_FACTORY_ADDRESSES } from "../config/splitter";

interface Recipient {
  address: string;
  share: number;
}

interface SplitterForm {
  recipients: Recipient[];
}

export function CreateSplitterPage() {
  const { isConnected } = useAccount();
  const { open } = useAppKit();
  const navigate = useNavigate();
  const chainId = useChainId();
  // const [isCreating, setIsCreating] = useState(false)

  const {
    isPending: isCreating,
    writeContract,
    data: hash,
  } = useWriteContract({
    mutation: {
      onError: (error) => {
        // setIsCreating(false)
        console.error(error);
        notifications.show({
          title: "Transaction Failed",
          message: "An error occurred",
          color: "red",
        });
      },
    },
  });
  const {
    isLoading: isConfirming,
    isSuccess,
    error: receiptError,
    data: receipt,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const form = useForm<SplitterForm>({
    initialValues: {
      recipients: [
        { address: "", share: 50 },
        { address: "", share: 50 },
      ],
    },
    validate: {
      recipients: {
        address: (value: string) => {
          if (!value) return "Address is required";
          if (!isAddress(value)) return "Invalid Ethereum address";
          return null;
        },
        share: (value: number) => {
          if (!value || value <= 0) return "Share must be greater than 0";
          if (value > 100) return "Share cannot exceed 100%";
          return null;
        },
      },
    },
  });

  useEffect(() => {
    if (receiptError) {
      // setIsCreating(false)
      notifications.show({
        title: "Transaction Failed",
        message:
          "Transaction was sent but failed to confirm. Please check your transaction on the block explorer.",
        color: "red",
      });
    }
  }, [receiptError]);

  useEffect(() => {
    if (hash && !isConfirming && !isSuccess) {
      notifications.show({
        title: "Transaction Sent",
        message: "Your transaction has been sent and is being processed...",
        color: "blue",
      });
    }
  }, [hash, isConfirming, isSuccess]);

  // Handle successful transaction and extract splitter address
  useEffect(() => {
    if (isSuccess && receipt) {
      try {
        // Find the SplitterCreated event in the logs
        const splitterCreatedLog = receipt.logs.find((log) => {
          try {
            const decodedLog = decodeEventLog({
              abi: SIMPLE_SPLITTER_FACTORY_ABI,
              data: log.data,
              topics: log.topics,
            });
            return decodedLog.eventName === "SplitterCreated";
          } catch {
            return false;
          }
        });

        if (splitterCreatedLog) {
          const decodedLog = decodeEventLog({
            abi: SIMPLE_SPLITTER_FACTORY_ABI,
            data: splitterCreatedLog.data,
            topics: splitterCreatedLog.topics,
          });

          if (decodedLog.eventName === "SplitterCreated") {
            const splitterAddress = decodedLog.args.splitter;

            notifications.show({
              title: "Splitter Created Successfully!",
              message: "Redirecting to splitter status page...",
              color: "green",
            });

            navigate(`/splitter/${splitterAddress}`);
          }
        }
      } catch (error) {
        console.error("Error extracting splitter address:", error);
        notifications.show({
          title: "Splitter Created",
          message:
            "Splitter was created successfully, but could not extract address for redirect.",
          color: "orange",
        });
      }
    }
  }, [isSuccess, receipt, navigate]);

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

  const addRecipient = () => {
    const currentTotal = form.values.recipients.reduce(
      (sum, r) => sum + r.share,
      0
    );
    const remainingShare = Math.max(1, 100 - currentTotal);

    form.insertListItem("recipients", { address: "", share: remainingShare });
  };

  const removeRecipient = (index: number) => {
    if (form.values.recipients.length <= 2) return;
    form.removeListItem("recipients", index);
  };

  const totalShares = form.values.recipients.reduce(
    (sum, recipient) => sum + recipient.share,
    0
  );
  const isValidTotal = totalShares === 100;

  const handleSubmit = async (values: SplitterForm) => {
    if (!isConnected) {
      notifications.show({
        title: "Wallet not connected",
        message: "Please connect your wallet first",
        color: "red",
      });
      return;
    }

    if (!isValidTotal) {
      notifications.show({
        title: "Invalid shares",
        message: "Total shares must equal 100%",
        color: "red",
      });
      return;
    }

    try {
      // setIsCreating(true)

      const addresses = values.recipients.map(
        (r) => r.address as `0x${string}`
      );
      const shares = values.recipients.map((r) => BigInt(r.share));

      writeContract({
        address: SPLITTER_FACTORY_ADDRESSES[chainId],
        abi: SIMPLE_SPLITTER_FACTORY_ABI,
        functionName: "createSplitter",
        args: [addresses, shares],
      });
    } catch (error) {
      console.error("Error creating splitter:", error);
      notifications.show({
        title: "Error",
        message: "Failed to create splitter",
        color: "red",
      });
    } finally {
      // setIsCreating(false)
    }
  };

  if (isSuccess) {
    // return (
    //   <Stack align="center" mt="xl">
    //     <Card shadow="sm" padding="xl" radius="md" withBorder ta="center" maw={500}>
    //       <IconCheck size={48} color="green" style={{ margin: '0 auto', marginBottom: 16 }} />
    //       <Title order={2} c="green" mb="md">
    //         Splitter Created Successfully!
    //       </Title>
    //       <Text mb="md">
    //         Your PYUSD splitter has been deployed to Arbitrum. Redirecting to status page...
    //       </Text>
    //     </Card>
    //   </Stack>
    // )
  }

  return (
    <Stack gap="xl" mt="xl">
      <Box ta="center">
        <Title order={1} size="h2">
          Create New PYUSD Splitter
        </Title>
        <Text c="dimmed" mt="sm">
          Set up automatic token distribution to multiple recipients
        </Text>
      </Box>

      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        maw={600}
        mx="auto"
        w="100%"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <Text fw={500} size="lg">
              Recipients & Shares
            </Text>

            {form.values.recipients.map((_, index) => (
              <Card key={index} padding="md" withBorder>
                <Flex align="flex-start" gap="md" direction={{ base: "column", sm: "row" }} maw="100%">
                  <TextInput
                    label={`Recipient ${index + 1} Address`}
                    placeholder="0x..."
                    {...form.getInputProps(`recipients.${index}.address`)}
                    style={{ flex: 2, width: "100%" }}
                  />
                  <NumberInput
                    label="Share (%)"
                    placeholder="0"
                    min={1}
                    max={100}
                    {...form.getInputProps(`recipients.${index}.share`)}
                    style={{ flex: 1, width: "100%" }}
                  />
                  {form.values.recipients.length > 2 && (
                    <ActionIcon
                      color="red"
                      variant="light"
                      onClick={() => removeRecipient(index)}
                      size="lg"
                    >
                      <IconTrash size={18} />
                    </ActionIcon>
                  )}
                </Flex>
              </Card>
            ))}

            <Group justify="space-between" align="center">
              <Button
                variant="light"
                leftSection={<IconPlus size={16} />}
                onClick={addRecipient}
                disabled={form.values.recipients.length >= 10}
              >
                Add Recipient
              </Button>

              <Group>
                <Text size="sm">Total:</Text>
                <Badge
                  color={isValidTotal ? "green" : "red"}
                  variant={isValidTotal ? "light" : "filled"}
                >
                  {totalShares}%
                </Badge>
              </Group>
            </Group>

            <Progress
              value={totalShares}
              color={
                isValidTotal ? "green" : totalShares > 100 ? "red" : "blue"
              }
              size="lg"
            />

            {!isValidTotal && (
              <Alert color="orange" icon={<IconInfoCircle size={16} />}>
                Total shares must equal exactly 100% to create the splitter
              </Alert>
            )}

            <Divider />

            <Stack gap="xs">
              <Text fw={500}>How it works:</Text>
              <Text size="sm" c="dimmed">
                1. Your splitter will be deployed as a minimal proxy clone
                (~2,100 gas)
              </Text>
              <Text size="sm" c="dimmed">
                2. Each recipient will receive their percentage of any PYUSD
                sent to the splitter
              </Text>
              <Text size="sm" c="dimmed">
                3. Anyone can call distribute() to automatically send tokens to
                all recipients
              </Text>
            </Stack>

            <Button
              type={isConnected ? "submit" : "button"}
              loading={isCreating || isConfirming}
              disabled={isConnected && !isValidTotal}
              size="lg"
              fullWidth
              onClick={!isConnected ? handleWalletConnect : undefined}
            >
              {isCreating || isConfirming
                ? "Creating Splitter..."
                : !isConnected
                ? "Connect Wallet to Create Splitter"
                : "Create Splitter"}
            </Button>
          </Stack>
        </form>
      </Card>
    </Stack>
  );
}
