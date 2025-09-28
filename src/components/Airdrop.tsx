import { useConnection, useWallet } from "@solana/wallet-adapter-react"

export function Airdrop() {
const wallet = useWallet();
const {connection} = useConnection()

async function SendRequest() {
    if (!wallet.publicKey) {
        alert("Wallet not connected!");
        return;
    }
    await connection.requestAirdrop(wallet.publicKey, 1000000000);
    alert("airdropped sol");
}

    return <div>
        hi from air drop

<input type="text" placeholder="Amount" />
<button onClick={SendRequest}>send AirDrop</button>
    </div>
}