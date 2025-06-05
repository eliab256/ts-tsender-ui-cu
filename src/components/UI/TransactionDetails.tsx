import { useReadContracts } from "wagmi";
import { erc20Abi} from "@/constants";
import {type Address} from "viem";


interface TransactionDetailsProps {
    tokenAddress: Address;
    amountWei: number;
    amountToken: number;
}
function getNameAndSymbol(tokenAddress: Address): {
    name: string;
    symbol: string;
    decimals: number;
    isLoading: boolean;
    error: Error | null;
  }{
    const { data: tokenData, isLoading, error } = useReadContracts({
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

    const [nameResult, symbolResult, decimalsResult] = tokenData || [];
    const name = nameResult?.status === 'success' ? nameResult.result : null;
    const symbol = symbolResult?.status === 'success' ? symbolResult.result : null;
    const decimals = decimalsResult?.status === 'success' ? decimalsResult.result : null;
  
    return { name, symbol, decimals, isLoading, error };
  

}

export default function TransactionDetails({ tokenAddress, amountWei, amountToken }: TransactionDetailsProps) {
    
   

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
        <span className="font-medium">{amountWei.toLocaleString()}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-600">Amount (Tokens):</span>
        <span className="font-medium">
          {amountToken.toLocaleString()} {tokenSymbol}
        </span>
      </div>
    </div>
  </div>
 )
};