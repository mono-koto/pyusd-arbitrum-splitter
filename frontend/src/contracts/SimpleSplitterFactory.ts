export const SIMPLE_SPLITTER_FACTORY_ABI = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_implementation",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createSplitter",
    inputs: [
      {
        name: "_recipients",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_shares",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    outputs: [
      {
        name: "splitter",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "implementation",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "SplitterCreated",
    inputs: [
      {
        name: "splitter",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "creator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "recipients",
        type: "address[]",
        indexed: false,
        internalType: "address[]",
      },
      {
        name: "shares",
        type: "uint256[]",
        indexed: false,
        internalType: "uint256[]",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "FailedDeployment",
    inputs: [],
  },
  {
    type: "error",
    name: "InsufficientBalance",
    inputs: [
      {
        name: "balance",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "needed",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
] as const;

export const SIMPLE_SPLITTER_FACTORY_ADDRESS = "0x5B0aDF5b6cD6E6e7e662F5eB51e165bAE9bcD4a6";