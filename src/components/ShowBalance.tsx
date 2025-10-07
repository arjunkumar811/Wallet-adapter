import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export function ShowSolBalance() {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [balance, setBalance] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function getBalance() { 
        if (wallet.publicKey) {
            setIsLoading(true);
            try {
                const balanceInLamports = await connection.getBalance(wallet.publicKey);
                setBalance(balanceInLamports / LAMPORTS_PER_SOL);
            } catch (error) {
                console.error("Failed to fetch balance:", error);
                setBalance(null);
            } finally {
                setIsLoading(false);
            }
        } else {
            setBalance(null);
        }
    }
    
    useEffect(() => {
        getBalance();
    }, [wallet.publicKey, connection]);

    return (
        <div className="glass-card animate-scale-in" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: 'linear-gradient(135deg, #4ade80, #3b82f6)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginRight: '12px' 
                }}>
                    <svg style={{ width: '20px', height: '20px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>Wallet Balance</h3>
            </div>

            <div style={{ textAlign: 'center' }}>
                {!wallet.publicKey ? (
                    <div style={{ color: '#9ca3af', padding: '24px 0' }}>
                        <svg style={{ width: '48px', height: '48px', margin: '0 auto 12px', opacity: '0.5' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p style={{ fontSize: '0.9rem' }}>Connect wallet to view balance</p>
                    </div>
                ) : isLoading ? (
                    <div style={{ padding: '24px 0' }}>
                        <div style={{ 
                            animation: 'spin 1s linear infinite', 
                            margin: '0 auto', 
                            width: '24px', 
                            height: '24px', 
                            border: '3px solid #a855f7', 
                            borderTopColor: 'transparent', 
                            borderRadius: '50%', 
                            marginBottom: '12px' 
                        }}></div>
                        <p style={{ color: '#d1d5db', fontSize: '0.9rem' }}>Loading balance...</p>
                    </div>
                ) : (
                    <div style={{ padding: '12px 0' }}>
                        <div className="animate-pulse-custom" style={{ 
                            fontSize: '2.5rem', 
                            fontWeight: 'bold', 
                            color: 'white', 
                            marginBottom: '6px' 
                        }}>
                            {balance !== null ? balance.toFixed(4) : '0.0000'}
                        </div>
                        <div style={{ fontSize: '1rem', color: '#d1d5db', fontWeight: '500', marginBottom: '12px' }}>SOL</div>
                        <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '12px' }}>
                            ≈ ${balance !== null ? (balance * 24.50).toFixed(2) : '0.00'} USD
                        </div>
                        <button 
                            onClick={getBalance}
                            className="btn-secondary"
                            style={{ fontSize: '0.8rem', padding: '8px 16px' }}
                        >
                            <svg style={{ width: '14px', height: '14px', marginRight: '6px', display: 'inline' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Refresh
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}