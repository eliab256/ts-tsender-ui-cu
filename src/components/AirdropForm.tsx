"use client";
import InputField from "@/components/UI/InputField";
import { useState, useMemo } from "react";
import { chainsToTSender, tsenderAbi, erc20Abi } from "@/constants";
import { useChainId, useConfig, useAccount } from "wagmi";
import { readContract } from "@wagmi/core";
import { calculateTotal } from "@/utils/CalculateTotal/calculateTotal";
type addressType = `0x${string}`;

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recepients, setRecepients] = useState("");
  const [amounts, setAmounts] = useState("");


  const chainId = useChainId();
  const config = useConfig();
  const account = useAccount();
  const total: number = useMemo(() => calculateTotal(amounts), [amounts]);


  async function getApprovedAmount(tSenderAddress: string | null): Promise<number> {
    if (!tSenderAddress) {
      alert("TSender address not found for this chain.");
      return 0;
    }

    const response = await readContract(config, {
      abi: erc20Abi,
      address: tokenAddress as addressType,
      functionName: "allowance",
      args: [account.address, tSenderAddress as addressType],
    });

    return response as number;
  }

  async function handleSubmit() {
    // 1a. If already approved, move to step 2
    // 1b. If not approved, Approve tsender contract to send our token
    // 2. Call the airdrop function on the tsender contract
    // 3. Wait for the transaction to be mined
    const tSenderAddress = chainsToTSender[chainId]["tsender"];
    const approvedAmount = await getApprovedAmount(tSenderAddress);
  }

  return (
    <div>
      <InputField label="Token Address" placeholder="0x..." value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} />
      <InputField
        label="Recipients (comma or new line separated)"
        placeholder="0x123...,0x456..."
        value={recepients}
        large={true}
        onChange={(e) => setRecepients(e.target.value)}
      />
      <InputField
        label="Amounts (wei; comma or new line separated)"
        placeholder="100, 200, 300"
        value={amounts}
        large={true}
        onChange={(e) => setAmounts(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="flex items-center justify-center bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-50"
      >
        Send Tokens
      </button>
    </div>
  );
}
