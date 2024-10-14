'use client';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Login: React.FC = () => {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const checkConnection = async () => {
            if (typeof window.ethereum !== 'undefined') {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.listAccounts();
                setIsConnected(accounts.length > 0);
            }
        };
        checkConnection();
    }, []); // This effect runs once when the component mounts

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            setIsConnected(true);
        } else {
            alert("Please install MetaMask!");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {isConnected ? (
                <div className="flex flex-col items-center justify-center space-y-4 mt-4">
                    <p className="text-green-600">Wallet connected successfully!</p>
                    <a href="/Voting" className="bg-green-600 hover:bg-green-900 hover:text-white text-white py-2 px-6 rounded-lg">Go to Voting</a>
                    <a href="/Results" className="bg-green-600 hover:bg-green-900 hover:text-white text-white py-2 px-6 rounded-lg">Go to Results</a>
                </div>
            ) : (
                <button onClick={connectWallet} className="btn bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg">Connect Wallet</button>
            )}
        </div>
    );
};

export default Login;
