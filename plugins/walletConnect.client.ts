import SignClient from "@walletconnect/sign-client";

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();

  const signClient = await SignClient.init({
    projectId: config.public.WALLET_CONNECT_PROJECT_ID,
    relayUrl: "wss://relay.walletconnect.com"
  });
  // Store variable
  nuxtApp.vueApp.provide("walletConnectSignClient", signClient);
  nuxtApp.provide("walletConnectSignClient", signClient);

  // Once Nuxt app is mounted
  nuxtApp.hooks.hook("app:mounted", () => {
    // Listen to Supabase auth changes
    // @ts-ignore
    signClient.on("session_event", ({ event }) => {
      console.log("HERE IS THE EVENT PLUGIN - ", event);
      // Handle session events, such as "chainChanged", "accountsChanged", etc.
    });

    signClient.on("session_update", ({ topic, params }) => {
      const { namespaces } = params;
      const _session = signClient.session.get(topic);
      // Overwrite the `namespaces` of the existing session with the incoming one.
      const updatedSession = { ..._session, namespaces };
      // Integrate the updated session state into your dapp state.
      // onSessionUpdate(updatedSession);
    });

    signClient.on("session_delete", () => {
      // Session was deleted -> reset the dapp state, clean up from user session, etc.
    });
  });
});
