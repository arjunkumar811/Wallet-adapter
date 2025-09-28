import './App.css'
import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import { Airdrop } from './components/Airdrop';

function App() {

  return (
    <>
      <div>
       <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/FffcU9C6hYnq9sIaWyD2ByCpIQAI07z_"} >
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                    <Airdrop/>
                    { /* Your app's components go here, nested within the context providers. */ }
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
       </div>
    </>
  )
}

export default App
