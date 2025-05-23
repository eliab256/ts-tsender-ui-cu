"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { anvil, sepolia } from "wagmi/chains";

export default getDefaultConfig({
  appName: "TSender",
  projectId: null,
  chains: [sepolia, anvil],
  ssr: false,
});
