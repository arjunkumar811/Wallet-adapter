import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { ShowSolBalance } from "./ShowBalance";
import { SignMessage } from "./SignMessage";
import { SendTokens } from "./SendTokens";

export function Airdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState("");

  async function SendRequest() {
    if (!wallet.publicKey) {
      alert("Wallet not connected!");
      return;
    }

    const sol = Number(amount);
    if (!sol || sol <= 0) {
      alert("Enter valid amount");
      return;
    }

    await connection.requestAirdrop(wallet.publicKey, sol * 1_000_000_000);
    alert(`Airdropped ${sol} SOL`);
  }

  return (
    <div>
      <input
        type="number"
        placeholder="Amount in SOL"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={SendRequest}>Airdrop</button>
      <ShowSolBalance />
      <SignMessage />
      <SendTokens />
    </div>
  );
}

