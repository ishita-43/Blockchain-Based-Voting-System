// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Voting {

    struct Voter {
        bool voted;
        bool authorized;
        uint vote;
    }

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    address public owner;
    string public electionName;
    bool public electionEnded = false;

    mapping(address => Voter) public voters;
    Candidate[] public candidates;

    // Events
    event CandidateAdded(uint id, string name);
    event VoterAuthorized(address voter);
    event Voted(address voter, uint voteIndex);
    event ElectionEnded();

    constructor(string memory _name) {
        owner = msg.sender;
        electionName = _name;
    }

    error Voting__NotOwner();
    error Voting__AlreadyVoted();
    error Voting__NotAuthorized();
    error Voting__IncorrectVoteIndex();

    modifier ownerOnly() {
        require(msg.sender == owner, Voting__NotOwner());
        _;
    }

    modifier electionOngoing() {
        require(!electionEnded, "Election has ended");
        _;
    }

    receive() external payable {
        revert("This contract does not accept Ether");
    }

    function addCandidate(string memory _name) public ownerOnly {
        uint256 candidateCount = candidates.length;

        // Check if a candidate with the same name already exists
        for (uint i = 0; i < candidateCount; i++) {
            require(
                keccak256(abi.encodePacked(candidates[i].name)) != keccak256(abi.encodePacked(_name)),
                "Candidate already exists"
            );
        }

        // Add the new candidate if no duplicate is found
        candidates.push(Candidate(candidateCount, _name, 0));

        // Emit event for candidate addition
        emit CandidateAdded(candidateCount, _name);
    }

    function authorize(address _person) public ownerOnly {
        // check if voter is already authorised
        require(!voters[_person].authorized, "Voter is already authorized");

        voters[_person].authorized = true;

        // Emit event for voter authorization
        emit VoterAuthorized(_person);
    }

    function vote(uint _voteIndex) public electionOngoing() {
        require(!voters[msg.sender].voted, Voting__AlreadyVoted());
        require(voters[msg.sender].authorized, Voting__NotAuthorized());
        require(_voteIndex < candidates.length, Voting__IncorrectVoteIndex());

        voters[msg.sender].vote = _voteIndex;
        voters[msg.sender].voted = true;
        candidates[_voteIndex].voteCount += 1;

        // Emit event for voting
        emit Voted(msg.sender, _voteIndex);
    }

    function endElection() public ownerOnly {
        electionEnded = true;

        // Emit event for election ending
        emit ElectionEnded();
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getTotalVotes() public view returns (uint) {
        uint total = 0;
        for (uint i = 0; i < candidates.length; i++) {
            total += candidates[i].voteCount;
        }
        return total;
    }
}
