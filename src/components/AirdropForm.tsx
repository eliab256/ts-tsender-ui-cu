"use client";
import InputField from "@/components/UI/InputField";
import { useState } from "react";

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recepients, setRecepients] = useState("");
  const [amounts, setAmounts] = useState("");

  async function handleSubmit() {
    console.log("submitting airdrop");
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
      <button onClick={handleSubmit}>Send Tokens</button>
    </div>
  );
}
