<script lang="ts" setup>
const destination = ref("");
const amount = ref(0);

const sessionTopic = useState("session-topic", () => "");
const newWalletState = useState("new-wallet-state", () => [
  {
    address: "",
    assets: "",
    type: "",
    balance: 0,
  },
]);
const { $walletConnectSignClient } = useNuxtApp();

const signMessage = async () => {
  const response = await $walletConnectSignClient.request({
    // chainId: chainId, // "eip155:1",
    // @ts-ignore
    topic: sessionTopic.value, // session.topic
    chainId: "eip155:1",
    request: {
      id: 1,
      jsonrpc: "2.0",
      method: "personal_sign",
      params: [
        "0x1d85568eEAbad713fBB5293B45ea066e552A90De",
        "0x7468697320697320612074657374206d65737361676520746f206265207369676e6564",
      ],
    },
  });
  console.log("WalletConenct Response - ", response);
  return response;
};

const sendEthTransaction = async () => {
  console.log({
    from: newWalletState.value[0].address,
    to: destination.value,
    value: amount.value,
  });
  const response = await $walletConnectSignClient.request({
    // @ts-ignore
    topic: sessionTopic.value, // session.topic
    chainId: "eip155:1",
    request: {
      id: 1,
      jsonrpc: "2.0",
      method: "eth_sendTransaction",
      params: [
        {
          from: newWalletState.value[0].address,
          to: destination.value,
          value: amount.value,
        },
      ],
    },
  });
  console.log("WalletConenct Response - ", response);
  return response;
};
</script>

<template>
  <div>
    <div class="py-4 my-4">
      <h2 class="text-xl font-semibold py-2">CONNECT WALLET</h2>
      <WalletConnectModal class="py-2 my-2" />
      <div class="py-2">
        <h4 class="font-medium text-lg">Wallet State</h4>
        {{ newWalletState[0].address }}
      </div>
      <div class="py-2">
        <h4 class="font-medium text-lg">Session Topic</h4>
        {{ sessionTopic }}
      </div>
    </div>
    <div class="py-4 my-4">
      <h2 class="text-xl font-semibold py-2">TEST personal_sign</h2>
      <p class="py-2">This should work successfully</p>
      <button
        @click="signMessage"
        class="bg-gray-500 py-3 px-4 rounded-md hover:bg-gray-800 text-white"
      >
        SIGN MESSAGE
      </button>
    </div>
    <div class="py-4 my-4">
      <h2 class="text-xl font-semibold py-2">TEST eth_sendTransaction</h2>
      <p class="py-2">This fails</p>
      <label for="destination" class="ml-1 font-medium text-gray-500">
        Destination Address
      </label>
      <input
        type="text"
        v-model="destination"
        class="ml-1 w-full block rounded-md border border-gray-300 bg-white py-3 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900"
      />
      <label for="amount" class="ml-1 font-medium text-gray-500">
        Amount
      </label>
      <input
        type="number"
        v-model="amount"
        class="ml-1 w-full block rounded-md border border-gray-300 bg-white py-3 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900"
      />
      <button
        @click="sendEthTransaction"
        class="bg-gray-500 py-3 px-4 rounded-md hover:bg-gray-800 text-white my-4"
      >
        SEND TRANSACTION
      </button>
    </div>
  </div>
</template>
