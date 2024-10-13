'use client';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';  // Import ethers
import votingAbi from '../voting.json';  // Import ABI from voting.json

declare global {
    interface Window {
        ethereum: any;  // Extend the Window interface to include ethereum
    }
}

interface Voter {
    voted: boolean;
    vote : Number
    authorized: boolean;
}

const Voting: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [selectedCandidate, setSelectedCandidate] = useState<string>("");
    const [selectedCandidateInd, setSelectedCandidateInd] = useState<Number | null>(null);
    const [contract, setContract] = useState<ethers.Contract | null>(null);  // Update contract type
    const [hasVoted, setHasVoted] = useState<boolean>(false);  // New state to track if user has voted
    const [votedCandidate, setVotedCandidate] = useState<string>("");  // New state to store the voted candidate
    const [userAccount, setUserAccount] = useState<string>("");  // New state for user account address

    useEffect(() => {
        const checkConnection = async () => {
            if (window.ethereum) {
                try {
                    // Request accounts from the Ethereum provider
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    setIsConnected(accounts.length > 0);
                    
                    if (accounts.length > 0) {
                        const userAddress = accounts[0];
                        setUserAccount(userAddress);  // Set the user account address

                        // Set up ethers provider and contract
                        const provider = new ethers.BrowserProvider(window.ethereum);
                        const signer = await provider.getSigner();
                        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";  // Replace with your contract address
                        const votingContract = new ethers.Contract(contractAddress, votingAbi, signer);
                        
                        setContract(votingContract); 
                        
                        // Fetch voter data from the contract using the mapping
                        const voter = await votingContract.voters(userAddress);
                        console.log("Voter data:", voter);
                        
                        // Check if the user has voted
                        const hasVoted = voter.voted;
                        setHasVoted(hasVoted);
                    }
                } catch (error) {
                    console.error("Error connecting to Ethereum or contract:", error);
                }
            } else {
                console.log("Ethereum object not found");
            }
        };
        
        checkConnection();
    }, [userAccount]);  // Added dependency on userAccount to avoid stale values
    

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (selectedCandidate) {
            if(contract){
                const transaction = await contract.vote(selectedCandidateInd);
                await transaction.wait();
                setMessage(`You have voted for ${selectedCandidate}!`);
            }
            else{
                setMessage(`Please try in a while`);
            }
        } else {
            setMessage("Please select a candidate before voting.");
        }
    };

    if (!isConnected) {
        return (
            <>
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-center mb-5">Please <a href="/Login" className=" btn">Connect</a> your wallet to vote.</p>
            </div>
            </>
        );
    }

    if (hasVoted) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-center mb-5">You have voted!</p>
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
                    <ol className="list-none">  {/* Remove space-y-4 to avoid extra spacing */}
                    {[
                        "Anurag Singh Thakur", "Arun Ankesh Syal", "Garib Dass Katoch", 
                        "Gopi Chand Attari", "Hem Raj", "Jagdeep Kumar", "Nand Lal", 
                        "Ramesh Chand Sarthi", "Satpal Raizada", 
                        "Subedar Major Kulwant Singh Patial", "Sumit Rana", 
                        "Surender Kumar Gautam", "NOTA"
                    ].map((candidate, index) => (
                        <li key={index} className="mb-2">  {/* Added mb-2 for small margin between items */}
                            <label className="block text-gray-700">  {/* block makes it vertical */}
                                <input 
                                    type="radio" 
                                    name="candidate" 
                                    value={candidate} 
                                    className="mr-2" 
                                    checked={selectedCandidate === candidate}
                                    onChange={(e) => {
                                        setSelectedCandidate(e.target.value);
                                        setSelectedCandidateInd(index); // Corrected to use index directly
                                    }} 
                                /> 
                                {candidate}
                            </label>
                        </li>
                    ))}
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
