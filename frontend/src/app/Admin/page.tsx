'use client';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {votingAbi,votingAddress} from '../voting'; // Assuming ABI is in the same folder


const Admin: React.FC = () => {
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [userAddress, setUserAddress] = useState<string>('');
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        // Initialize the contract when the component mounts
        const initContract = async () => {
            if (window.ethereum) {
                try {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const signer = await provider.getSigner();
                    const votingContract = new ethers.Contract(votingAddress, votingAbi, signer);
                    
                    setContract(votingContract); // Save the contract instance
                } catch (error) {
                    console.error("Error initializing contract:", error);
                }
            } else {
                console.log("Ethereum provider not found");
            }
        };

        initContract();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!contract || !userAddress) {
            setStatus('Contract not initialized or invalid user address.');
            return;
        }

        try {
            const tx = await contract.authorize(userAddress);
            setStatus('Transaction sent. Waiting for confirmation...');
            await tx.wait(); // Wait for the transaction to be mined
            setStatus('User authorized successfully.');
        } catch (error) {
            console.error("Error authorizing user:", error);
            setStatus('Failed to authorize user.');
        }
    };

    return (
        <div className="admin-container">
            <h1 className="admin-title">Admin Panel</h1>
            <form onSubmit={handleSubmit} className="admin-form">
                <label className="admin-label">
                    User Address:
                    <input
                        type="text"
                        className="admin-input"
                        value={userAddress}
                        onChange={(e) => setUserAddress(e.target.value)}
                        placeholder="0x1234..."
                        required
                    />
                </label>
                <button type="submit" className="admin-button">Authorize User</button>
            </form>
            {status && <p className="admin-status">{status}</p>} {/* Display status messages */}
        </div>
    );
};

export default Admin;
