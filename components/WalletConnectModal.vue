<template>
  <button
    @click="connectWalletConnect"
    class="w-full rounded-md border inline-flex items-center justify-center border-gray-300 bg-white py-3 px-4 font-medium text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
  >
    <div class="h-10 w-10 flex-shrink-0">
      <img
        class="h-10 w-10 rounded-full"
        src="@/assets/images/walletconnect.svg"
        alt="walletconnect"
      />
    </div>
    <span class="ml-1">Connect WalletConnect</span>
  </button>
</template>

<script setup>
import { Web3Modal } from "@web3modal/standalone";

const config = useRuntimeConfig();
const projectId = config.public.WALLET_CONNECT_PROJECT_ID;

const chains = [
  "eip155:1", // ETH
  "eip155:10", // Optimism
  "eip155:100", // Gnosis
  "eip155:137", // Polygon
  "eip155:42161", // Avalanche
  "eip155:42220", // Celo
];
//   "cosmos:cosmoshub-4",
//   "solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ",
//   "polkadot:91b171bb158e2d3848fa23a9f1c25182",
//   "elrond:1",
//   "tron:0x2b6653dc",
// ];

// export const DEFAULT_TEST_CHAINS = [
//   // testnets
//   "eip155:5", // Ethereum Goerli
//   "eip155:420", // Optimism Goerli
//   "eip155:80001", // Polygon Mumbai
//   "eip155:421611",
//   "eip155:44787",
//   "solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K",
//   "polkadot:e143f23803ac50e8f6f8e62695d1ce9e",
//   "near:testnet",
//   "elrond:D",
//   'tron:0xcd8690dc',
// ];

const newWalletState = useState("new-wallet-state");
const sessionTopic = useState("session-topic");

const web3Modal = new Web3Modal({
  projectId: projectId,
  standaloneChains: chains,
  disableInjectedProvider: true,
});

const { $walletConnectSignClient } = useNuxtApp();

const connectWalletConnect = async () => {
  try {
    const { uri, approval } = await $walletConnectSignClient.connect({
      requiredNamespaces: {
        eip155: {
          methods: [
            "eth_requestAccounts",
            "eth_accounts",
            "eth_chainId",
            "eth_sendTransaction",
            "eth_signTransaction",
            "eth_sign",
            "eth_signTypedData",
            "personal_sign",
          ],
          chains: chains,
          events: ["accountsChanged"],
        },
        // cosmos: {
        //   methods: ["cosmos_signDirect", "cosmos_signAmino"],
        //   chains: ["cosmos:cosmoshub-4"],
        //   events: [],
        // },
        // solana: {
        //   methods: ["solana_signTransaction", "solana_signMessage"],
        //   chains: ["solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ"],
        //   events: [],
        // },
        // polkadot: {
        //   methods: ["polkadot_signTransaction", "polkadot_signMessage"],
        //   chains: ["polkadot:91b171bb158e2d3848fa23a9f1c25182"],
        //   events: [],
        // },
      },
    });

    if (uri) {
      web3Modal.openModal({
        uri,
        standaloneChains: chains,
        connectTo: "walletconnect",
      });
      const session = await approval();
      web3Modal.closeModal();
      console.log("SESSION - ", session);
      sessionTopic.value = session.topic;
      // console.log("SESSION - ", session?.namespaces);

      const eip155 = session?.namespaces["eip155"];
      const eth_accounts = [];
      if (eip155) {
        eip155["accounts"].forEach((account) =>
          eth_accounts.push(account.split(":").slice(-1)[0])
        );
        const uniqueEthAccounts = [...new Set(eth_accounts)];
        uniqueEthAccounts.forEach((account) => {
          newWalletState.value.push({
            address: account,
            assets: "ETH",
            accountType: "",
            balance: 0,
          });
        });
      }
      const solana = session?.namespaces["solana"];
      const solana_accounts = [];
      if (solana) {
        solana["accounts"].forEach((account) =>
          solana_accounts.push(account.split(":").slice(-1)[0])
        );
        const uniqueSolAccounts = [...new Set(solana_accounts)];
        uniqueSolAccounts.forEach((account) => {
          newWalletState.value.push({
            address: account,
            assets: "SOL",
            accountType: "",
            balance: 0,
          });
        });
      }

      const cosmos = session?.namespaces["cosmos"];
      const cosmos_accounts = [];
      if (cosmos) {
        cosmos["accounts"].forEach((account) =>
          cosmos_accounts.push(account.split(":").slice(-1)[0])
        );
        const uniqueCosmosAccounts = [...new Set(eth_accounts)];
        uniqueCosmosAccounts.forEach((account) => {
          newWalletState.value.push({
            address: account,
            assets: "ATOM",
            accountType: "",
            balance: 0,
          });
        });
      }
      // console.log(cosmos_accounts);

      const polkadot = session?.namespaces["polkadot"];
      const polkadot_accounts = [];
      if (polkadot) {
        polkadot["accounts"].forEach((account) =>
          polkadot_accounts.push(account.split(":").slice(-1)[0])
        );
        const uniquePolkadotAccounts = [...new Set(eth_accounts)];
        uniquePolkadotAccounts.forEach((account) => {
          newWalletState.value.push({
            address: account,
            assets: "DOT",
            type: "",
            balance: 0,
          });
        });
      }
      if (newWalletState.value[0].address == "") {
        newWalletState.value.splice(0, 1);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
