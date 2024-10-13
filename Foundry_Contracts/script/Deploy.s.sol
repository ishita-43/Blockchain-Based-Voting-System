// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {Script, console} from "forge-std/Script.sol";
import {Voting} from "../src/Voting.sol";

contract Deploy is Script {
    Voting public voting;

    function run() public returns(Voting) {
        vm.startBroadcast(msg.sender);
        voting = new Voting("Elections 2024");
        voting.addCandidate("Alice");
        voting.addCandidate("Bob");
        vm.stopBroadcast();
        console.log(voting.owner());
        return (voting);
    }
}

contract DeployWithData is Script {
    Voting public voting;

    function run() public returns(Voting) {
        vm.startBroadcast(msg.sender);
        voting = new Voting("Elections 2024");
        voting.addCandidate("Anurag Singh Thakur");
        voting.addCandidate("Arun Ankesh Syal");
        voting.addCandidate("Garib Dass Katoch");
        voting.addCandidate("Gopi Chand Attari");
        voting.addCandidate("Hem Raj");
        voting.addCandidate("Jagdeep Kumar");
        voting.addCandidate("Nand Lal");
        voting.addCandidate("Ramesh Chand Sarthi");
        voting.addCandidate("Satpal Raizada");
        voting.addCandidate("Subedar Major Kulwant Singh Patial");
        voting.addCandidate("Sumit Rana");
        voting.addCandidate("Surender Kumar Gautam");
        voting.addCandidate("NOTA");
        // voting.authorize(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
        vm.stopBroadcast();
        console.log(voting.owner());
        return (voting);
    }
}


// To deploy on anvil ( local chain ) with anvil's private key:
// forge script script/Deploy.s.sol:DeployWithData --fork-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast

