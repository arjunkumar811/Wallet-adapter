
import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { useState } from 'react';

export function SignMessage() {
    const { publicKey, signMessage } = useWallet();
    const [message, setMessage] = useState('');
    const [signature, setSignature] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function onClick() {
        if (!publicKey) {
            alert('Wallet not connected!');
            return;
        }
        if (!signMessage) {
            alert('Wallet does not support message signing!');
            return;
        }
        
        if (!message.trim()) {
            alert('Please enter a message to sign');
            return;
        }

        setIsLoading(true);
        try {
            const encodedMessage = new TextEncoder().encode(message);
            const messageSignature = await signMessage(encodedMessage);

            if (!ed25519.verify(messageSignature, encodedMessage, publicKey.toBytes())) {
                throw new Error('Message signature invalid!');
            }
            
            const signatureBase58 = bs58.encode(messageSignature);
            setSignature(signatureBase58);
            alert(`Message signed successfully!`);
        } catch (error) {
            alert(`Error signing message: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="glass-card animate-scale-in" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: 'linear-gradient(135deg, #c084fc, #ec4899)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginRight: '12px' 
                }}>
                    <svg style={{ width: '20px', height: '20px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>Sign Message</h3>
            </div>

            <p style={{ color: '#d1d5db', marginBottom: '20px', lineHeight: '1.5', fontSize: '0.9rem' }}>
                Cryptographically sign a message to prove ownership of your wallet.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message here..."
                    className="input-modern"
                    style={{ width: '100%', height: '100px', resize: 'none', padding: '12px 16px' }}
                    rows={3}
                />

                <button 
                    onClick={onClick}
                    disabled={isLoading || !message.trim() || !publicKey}
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
                                Signing...
                            </>
                        ) : (
                            <>
                                <svg style={{ width: '18px', height: '18px', marginRight: '6px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                Sign Message
                            </>
                        )}
                    </span>
                </button>

                {signature && (
                    <div style={{ 
                        marginTop: '16px', 
                        padding: '12px', 
                        background: 'rgba(0, 0, 0, 0.3)', 
                        borderRadius: '6px', 
                        border: '1px solid #4b5563' 
                    }}>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: '600', color: '#d1d5db', marginBottom: '6px' }}>Signature:</h4>
                        <div style={{ 
                            fontSize: '0.7rem', 
                            color: '#9ca3af', 
                            fontFamily: 'monospace', 
                            wordBreak: 'break-all', 
                            background: '#1f2937', 
                            padding: '8px', 
                            borderRadius: '4px' 
                        }}>
                            {signature}
                        </div>
                        <button 
                            onClick={() => navigator.clipboard.writeText(signature)}
                            className="btn-secondary"
                            style={{ marginTop: '8px', fontSize: '0.8rem', padding: '6px 12px' }}
                        >
                            <svg style={{ width: '12px', height: '12px', marginRight: '6px', display: 'inline' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};