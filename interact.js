const Web3 = require('web3');
const contract = require('@truffle/contract');
const votingArtifact = require('./build/contracts/Voting.json');

const init = async () => {
    const web3 = new Web3('http://localhost:8545');
    const Voting = contract(votingArtifact);
    Voting.setProvider(web3.currentProvider);

    const accounts = await web3.eth.getAccounts();
    const voting = await Voting.deployed();

    console.log(`Contract deployed at: ${voting.address}`);

    // Add candidates
    await voting.addCandidate("Alice", { from: accounts[0] });
    await voting.addCandidate("Bob", { from: accounts[0] });

    // Authorize voters
    await voting.authorize(accounts[1], { from: accounts[0] });
    await voting.authorize(accounts[2], { from: accounts[0] });

    // Cast votes
    await voting.vote(0, { from: accounts[1] });
    await voting.vote(1, { from: accounts[2] });

    // Get candidates
    const candidates = await voting.getCandidates();
    candidates.forEach(candidate => {
        console.log(`Candidate ${candidate.name}: ${candidate.voteCount} votes`);
    });

    // Get total votes
    const totalVotes = await voting.getTotalVotes();
    console.log(`Total votes: ${totalVotes}`);
};

init();
