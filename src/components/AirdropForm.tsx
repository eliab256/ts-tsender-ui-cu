"use client";
import InputField from "@/components/UI/InputField";
import TransactionDetails from "@/components/UI/TransactionDetails";
import { useState, useMemo } from "react";
import { chainsToTSender, tsenderAbi, erc20Abi } from "@/constants";
import { useChainId, useConfig, useAccount, useWriteContract } from "wagmi";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { calculateTotal } from "@/utils/CalculateTotal/calculateTotal";
import { type Address } from "viem";

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipients, setRecipients] = useState("");
  const [amounts, setAmounts] = useState("");

  const chainId = useChainId();
  const config = useConfig();
  const account = useAccount();
  const total: number = useMemo(() => calculateTotal(amounts), [amounts]);
  const { data: hash, isPending, writeContractAsync } = useWriteContract();

  async function getApprovedAmount(tSenderAddress: string | null): Promise<number> {
    if (!tSenderAddress) {
      alert("TSender address not found for this chain.");
      return 0;
    }

    const response = await readContract(config, {
      abi: erc20Abi,
      address: tokenAddress as Address,
      functionName: "allowance",
      args: [account.address, tSenderAddress as Address],
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

    if (approvedAmount < total) {
      const approvalHash = await writeContractAsync({
        abi: erc20Abi,
        address: tokenAddress as Address,
        functionName: "approve",
        args: [tSenderAddress as Address, BigInt(total)],
      });
      const approvalReceipt = await waitForTransactionReceipt(config, {
        hash: approvalHash,
      });

      await writeContractAsync({
        abi: tsenderAbi,
        address: tSenderAddress as Address,
        functionName: "airdropERC20",
        args: [
          tokenAddress,
          // Comma or new line separated
          recipients
            .split(/[,\n]+/)
            .map((addr) => addr.trim())
            .filter((addr) => addr !== ""),
          amounts
            .split(/[,\n]+/)
            .map((amt) => amt.trim())
            .filter((amt) => amt !== ""),
          BigInt(total),
        ],
      });
    } else {
      await writeContractAsync({
        abi: tsenderAbi,
        address: tSenderAddress as Address,
        functionName: "airdropERC20",
        args: [
          tokenAddress,
          // Comma or new line separated
          recipients
            .split(/[,\n]+/)
            .map((addr) => addr.trim())
            .filter((addr) => addr !== ""),
          amounts
            .split(/[,\n]+/)
            .map((amt) => amt.trim())
            .filter((amt) => amt !== ""),
          BigInt(total),
        ],
      });
    }
  }

  return (
    <div>
      <div className="pt-[5px]">
        <InputField label="Token Address" placeholder="0x..." value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} />
      </div>

      <div className="pt-[5px]">
        <InputField
          label="Recipients (comma or new line separated)"
          placeholder="0x123...,0x456..."
          value={recipients}
          large={true}
          onChange={(e) => setRecipients(e.target.value)}
        />
      </div>

      <div className="pt-[5px]">
        <InputField
          label="Amounts (wei; comma or new line separated)"
          placeholder="100, 200, 300"
          value={amounts}
          large={true}
          onChange={(e) => setAmounts(e.target.value)}
        />
      </div>
      <div className="pt-[5px]">
        <TransactionDetails tokenAddress={tokenAddress as Address} amountWei={total} />
      </div>

      <div className="pt-[5px]">
        <button
          onClick={handleSubmit}
          className="mx-auto flex items-center justify-center bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-50"
        >
          Send Tokens
        </button>
      </div>
    </div>
  );
}
