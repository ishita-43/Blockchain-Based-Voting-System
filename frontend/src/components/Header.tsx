'use client';  
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {votingAbi, votingAddress} from '../app/voting'; 

const Header: React.FC = () => {
    const [userAddress, setUserAddress] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const initContractAndCheckOwner = async () => {
            if (window.ethereum) {
                try {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const signer = await provider.getSigner();
                    const userAddr = await signer.getAddress();
                    setUserAddress(userAddr);

                    const votingContract = new ethers.Contract(votingAddress, votingAbi, signer);

                    const owner = await votingContract.owner();

                    if (userAddr.toLowerCase() === owner.toLowerCase()) {
                        setIsAdmin(true);
                    }
                } catch (error) {
                    console.error("Error initializing contract or checking owner:", error);
                }
            } else {
                console.log("Ethereum provider not found");
            }
        };

        initContractAndCheckOwner();
    }, []);

    return (
        <header>
            <nav className="bg-grey-30 bg-transparent">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="Login">Login</a></li>
                    <li><a href="Voting">Voting</a></li>
                    <li><a href="Results">Results</a></li>
                    {isAdmin && <li><a href="Admin">Admin</a></li>}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
