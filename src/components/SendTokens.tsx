import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import { useState } from "react";

export function SendTokens() {
    const wallet = useWallet();
    const {connection} = useConnection();
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function sendTokens() {
        if (!wallet.publicKey) {
            alert("Wallet not connected!");
            return;
        }

        if (!to.trim()) {
            alert("Please enter recipient address");
            return;
        }

        if (!amount || Number(amount) <= 0) {
            alert("Please enter valid amount");
            return;
        }

        setIsLoading(true);
        try {
            const transaction = new Transaction();
            transaction.add(SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: new PublicKey(to),
                lamports: Number(amount) * LAMPORTS_PER_SOL,
            }));

            const signature = await wallet.sendTransaction(transaction, connection);
            alert(`Transaction sent! Signature: ${signature}`);
            setTo('');
            setAmount('');
        } catch (error) {
            alert(`Transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="glass-card animate-scale-in" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: 'linear-gradient(135deg, #fb923c, #ef4444)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginRight: '12px' 
                }}>
                    <svg style={{ width: '20px', height: '20px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>Send SOL</h3>
            </div>

            <p style={{ color: '#d1d5db', marginBottom: '20px', lineHeight: '1.5', fontSize: '0.9rem' }}>
                Transfer SOL tokens to any Solana wallet address securely.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                    <label style={{ 
                        display: 'block', 
                        fontSize: '0.8rem', 
                        fontWeight: '500', 
                        color: '#d1d5db', 
                        marginBottom: '6px' 
                    }}>
                        Recipient Address
                    </label>
                    <input
                        type="text"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="Enter wallet address..."
                        className="input-modern"
                        style={{ width: '100%', padding: '12px 16px' }}
                    />
                </div>

                <div>
                    <label style={{ 
                        display: 'block', 
                        fontSize: '0.8rem', 
                        fontWeight: '500', 
                        color: '#d1d5db', 
                        marginBottom: '6px' 
                    }}>
                        Amount (SOL)
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="input-modern"
                            style={{ width: '100%', padding: '12px 16px' }}
                            min="0"
                            step="0.001"
                        />
                        <div style={{ 
                            position: 'absolute', 
                            right: '12px', 
                            top: '50%', 
                            transform: 'translateY(-50%)', 
                            color: '#9ca3af', 
                            fontSize: '0.8rem' 
                        }}>
                            SOL
                        </div>
                    </div>
                </div>

                <button 
                    onClick={sendTokens}
                    disabled={isLoading || !to.trim() || !amount || !wallet.publicKey}
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
                                Sending...
                            </>
                        ) : (
                            <>
                                <svg style={{ width: '18px', height: '18px', marginRight: '6px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                Send SOL
                            </>
                        )}
                    </span>
                </button>

                {to && amount && (
                    <div style={{ 
                        marginTop: '12px', 
                        padding: '12px', 
                        background: 'rgba(59, 130, 246, 0.2)', 
                        border: '1px solid #60a5fa', 
                        borderRadius: '6px' 
                    }}>
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            color: '#93c5fd', 
                            fontSize: '0.8rem' 
                        }}>
                            <svg style={{ width: '14px', height: '14px', marginRight: '6px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Sending {amount} SOL to {to.slice(0, 8)}...{to.slice(-8)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}