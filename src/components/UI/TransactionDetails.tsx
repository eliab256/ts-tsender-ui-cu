import { useReadContracts } from "wagmi";
import { erc20Abi } from "@/constants";
import { type Address } from "viem";

interface TransactionDetailsProps {
  tokenAddress: Address;
  amountWei: number;
}

export default function TransactionDetails({ tokenAddress, amountWei }: TransactionDetailsProps) {
  const {
    data: tokenData,
    isLoading,
    error,
  } = useReadContracts({
    contracts: [
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "name",
      },
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "symbol",
      },
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "decimals",
      },
    ],
  });

  const tokenName = (tokenData?.[0]?.result as string) || "";
  const tokenSymbol = (tokenData?.[1]?.result as string) || "";
  const decimals = (tokenData?.[2]?.result as number) || 0;

  const formatBigNumber = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculateTokenAmount = (amountWei: number, decimals: number) => {
    if (formatBigNumber(amountWei / (10 * decimals)) === "NaN") {
      return "0";
    } else return formatBigNumber(amountWei / 10 ** decimals);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Transaction Details</h3>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            <span className="text-gray-600">Fetching token data...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Transaction Details</h3>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-red-600">Errore nel caricamento dei dettagli del token</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Transaction Details</h3>
      <div className="bg-white p-4 rounded-lg shadow-md space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Token Name:</span>
          <span className="font-medium">{tokenName}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Token Symbol:</span>
          <span className="font-medium">{tokenSymbol}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Amount (Wei):</span>
          <span className="font-medium">{formatBigNumber(amountWei)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Amount (Tokens):</span>
          <span className="font-medium">{calculateTokenAmount(amountWei, decimals)}</span>
        </div>
      </div>
    </div>
  );
}
