import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { ShowSolBalance } from "./ShowBalance";
import { SignMessage } from "./SignMessage";
import { SendTokens } from "./SendTokens";

export function Airdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);
    try {
      await connection.requestAirdrop(wallet.publicKey, sol * 1_000_000_000);
      alert(`Airdropped ${sol} SOL`);
      setAmount("");
    } catch (error) {
      alert("Airdrop failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '24px' 
      }}>
        <div className="glass-card animate-scale-in" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              background: 'linear-gradient(135deg, #60a5fa, #a855f7)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginRight: '12px' 
            }}>
              <svg style={{ width: '20px', height: '20px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>Request Airdrop</h2>
          </div>
          
          <p style={{ color: '#d1d5db', marginBottom: '20px', lineHeight: '1.5', fontSize: '0.9rem' }}>
            Get free SOL tokens for testing on Solana devnet. Maximum 2 SOL per request.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="number"
                placeholder="Amount in SOL"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input-modern"
                style={{ width: '100%', padding: '12px 16px' }}
                min="0"
                max="2"
                step="0.1"
              />
              <div style={{ 
                position: 'absolute', 
                right: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#9ca3af', 
                fontSize: '14px' 
              }}>
                SOL
              </div>
            </div>
            
            <button 
              onClick={SendRequest}
              disabled={isLoading || !amount || !wallet.publicKey}
              className="btn-primary"
              style={{ 
                width: '100%', 
                position: 'relative', 
                overflow: 'hidden',
                opacity: isLoading ? '0.75' : '1',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                padding: '12px 24px'
              }}
            >
              {isLoading && (
                <div className="loading-shimmer" style={{ position: 'absolute', inset: '0' }}></div>
              )}
              <span style={{ position: 'relative', zIndex: '10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isLoading ? (
                  <>
                    <svg style={{ animation: 'spin 1s linear infinite', marginLeft: '-4px', marginRight: '12px', height: '18px', width: '18px', color: 'white' }} fill="none" viewBox="0 0 24 24">
                      <circle style={{ opacity: '0.25' }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path style={{ opacity: '0.75' }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Request Airdrop'
                )}
              </span>
            </button>
          </div>
        </div>
        
        <ShowSolBalance />
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '24px' 
      }}>
        <SignMessage />
        <SendTokens />
      </div>
    </div>
  );
}

