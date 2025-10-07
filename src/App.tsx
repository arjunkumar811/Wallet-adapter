import './App.css'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';
import { Airdrop } from './components/Airdrop';

function App() {

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div style={{ 
        position: 'absolute', 
        inset: '0', 
        background: 'linear-gradient(135deg, #0f0c29 0%, #24243e 50%, #302b63 100%)', 
        opacity: '0.9' 
      }}></div>
      
      <div style={{ 
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 20% 20%, rgba(138, 43, 226, 0.8) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(30, 144, 255, 0.6) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(255, 20, 147, 0.4) 0%, transparent 50%)',
        animation: 'float 8s ease-in-out infinite'
      }}></div>
      
      <div style={{ 
        position: 'relative', 
        zIndex: '10', 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '20px 16px' 
      }}>
        <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/FffcU9C6hYnq9sIaWyD2ByCpIQAI07z_"}>
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <div className="animate-slide-in">
                <header style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <h1 style={{ 
                    fontSize: '3.5rem', 
                    fontWeight: 'bold', 
                    color: 'white', 
                    marginBottom: '8px',
                    textShadow: '0 4px 20px rgba(138, 43, 226, 0.5)'
                  }} className="animate-float">
                    <span style={{ 
                      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)', 
                      WebkitBackgroundClip: 'text', 
                      backgroundClip: 'text', 
                      color: 'transparent',
                      backgroundSize: '400% 400%',
                      animation: 'gradientShift 3s ease infinite'
                    }}>
                      Solana Faucet
                    </span>
                  </h1>
                  <p style={{ 
                    color: '#e2e8f0', 
                    fontSize: '1.125rem', 
                    fontWeight: '300',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                  }}>
                    Get free SOL tokens, check balance, sign messages & transfer tokens
                  </p>
                </header>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: '16px', 
                  marginBottom: '24px' 
                }} className="animate-scale-in">
                  <WalletMultiButton className="btn-primary" />
                  <WalletDisconnectButton className="btn-secondary" />
                </div>
                
                <main style={{ maxWidth: '100%', margin: '0 auto' }}>
                  <Airdrop/>
                </main>
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </div>
      
      <div style={{ 
        position: 'absolute', 
        top: '10%', 
        left: '5%', 
        width: '200px', 
        height: '200px', 
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)', 
        borderRadius: '50%', 
        mixBlendMode: 'multiply', 
        filter: 'blur(40px)', 
        opacity: '0.3',
        animation: 'floatSlow 6s ease-in-out infinite'
      }}></div>
      <div style={{ 
        position: 'absolute', 
        bottom: '10%', 
        right: '5%', 
        width: '250px', 
        height: '250px', 
        background: 'linear-gradient(45deg, #a8e6cf, #45b7d1)', 
        borderRadius: '50%', 
        mixBlendMode: 'multiply', 
        filter: 'blur(40px)', 
        opacity: '0.4',
        animation: 'floatSlow 8s ease-in-out infinite reverse'
      }}></div>
      <div style={{ 
        position: 'absolute', 
        top: '30%', 
        right: '15%', 
        width: '180px', 
        height: '180px', 
        background: 'linear-gradient(45deg, #feca57, #ff9ff3)', 
        borderRadius: '50%', 
        mixBlendMode: 'multiply', 
        filter: 'blur(40px)', 
        opacity: '0.35',
        animation: 'floatSlow 7s ease-in-out infinite'
      }}></div>
      <div style={{ 
        position: 'absolute', 
        top: '60%', 
        left: '10%', 
        width: '220px', 
        height: '220px', 
        background: 'linear-gradient(45deg, #96ceb4, #f38ba8)', 
        borderRadius: '50%', 
        mixBlendMode: 'multiply', 
        filter: 'blur(40px)', 
        opacity: '0.3',
        animation: 'floatSlow 9s ease-in-out infinite reverse'
      }}></div>
    </div>
  )
}

export default App
