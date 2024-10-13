'use client';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {votingAbi, votingAddress} from '../voting';

declare global {
    interface Window {
        ethereum: any;
    }
}

interface Candidate {
    id: number;
    name: string;
    voteCount: number;
}

interface Voter {
    voted: boolean;
    authorized: boolean;
}

const Voting: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [hasVoted, setHasVoted] = useState<boolean>(false);
    const [userAccount, setUserAccount] = useState<string>("");
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    useEffect(() => {
        const checkConnection = async () => {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    setIsConnected(accounts.length > 0);

                    if (accounts.length > 0) {
                        const userAddress = accounts[0];
                        setUserAccount(userAddress);

                        const provider = new ethers.BrowserProvider(window.ethereum);
                        const signer = await provider.getSigner();
                        const votingContract = new ethers.Contract(votingAddress, votingAbi, signer);

                        setContract(votingContract);

                        const voter: Voter = await votingContract.voters(userAddress);
                        setIsAuthorized(voter.authorized);
                        setHasVoted(voter.voted);

                        const candidateList: Candidate[] = await votingContract.getCandidates();
                        setCandidates(candidateList.map((candidate: Candidate) => ({
                            id: candidate.id,
                            name: candidate.name,
                            voteCount: candidate.voteCount,
                        })));
                    }
                } catch (error) {
                    console.error("Error connecting to Ethereum or contract:", error);
                }
            } else {
                console.log("Ethereum object not found");
            }
        };

        checkConnection();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (selectedCandidateId !== null && contract) {
            try {
                const transaction = await contract.vote(selectedCandidateId);
                await transaction.wait();
                setMessage(`You have voted successfully!`);
            } catch (error) {
                console.error("Error submitting vote:", error);
                setMessage("Error while submitting vote.");
            }
        } else {
            setMessage("Please select a candidate before voting.");
        }
    };

    if (!isConnected) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-center mb-5">Please <a href="/Login" className="btn">Connect</a> your wallet to vote.</p>
            </div>
        );
    }

    if (!isAuthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-center mb-5">You are not authorized to vote!</p>
            </div>
        );
    }

    if (hasVoted) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-center mb-5">You have already voted!</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="container max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center mb-6">Himachal Pradesh Online Voting System</h1>
                <h2 className="text-center mb-4">Election Date: June 1st</h2>
                <h3 className="text-center font-semibold mb-4">Select Your Candidate</h3>

                <form onSubmit={handleSubmit} className="space-y-4 text-center">
                    <ol className="list-none">
                        {candidates.length > 0 ? (
                            candidates.map((candidate) => (
                                <li key={candidate.id} className="mb-2">
                                    <label className="block text-gray-700">
                                        <input
                                            type="radio"
                                            name="candidate"
                                            value={candidate.id}
                                            className="mr-2"
                                            checked={selectedCandidateId === candidate.id}
                                            onChange={() => setSelectedCandidateId(candidate.id)}
                                        />
                                        {candidate.name}
                                    </label>
                                </li>
                            ))
                        ) : (
                            <li>Loading candidates...</li>
                        )}
                    </ol>

                    <div className="flex justify-between mt-6">
                        <a href="/" className="btn bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg">Go to Home</a>
                        <button type="submit" className="btn bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">Submit Vote</button>
                    </div>
                </form>

                {message && <div className="mt-6 text-center text-green-500">{message}</div>}
            </div>
        </div>
    );
};

export default Voting;
