// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Voting{

struct Voter{
  bool voted;
  uint vote;
  bool authorized;
 }

struct Candidate{
 uint id;
 string name;
 uint voteCount;
}

address public owner;
string public electionName;
bool public electionEnded = false;

mapping(address => Voter) public voters;
Candidate[] public candidates;
uint public totalVotes;


constructor(string memory _name) {
  owner = msg.sender;
  electionName = _name;
}

error Voting__NotOwner();
error Voting__AlreadyVoted();
error Voting__NotAuthorized();
error Voting__IncorrectVoteIndex();


modifier ownerOnly(){
 require(msg.sender == owner, Voting__NotOwner());
 _;
}

modifier electionOngoing() {
    require(!electionEnded, "Election has ended");
    _;
}

function addCandidate(string memory _name) public ownerOnly{
  candidates.push(Candidate(candidates.length, _name, 0));
}

function authorize(address _person) public ownerOnly {
    voters[_person].authorized = true;
}

function vote(uint _voteIndex) public electionOngoing(){
  require(!voters[msg.sender].voted, Voting__AlreadyVoted());
  require(voters[msg.sender].authorized, Voting__NotAuthorized());
  require(_voteIndex<candidates.length, Voting__IncorrectVoteIndex());
  voters[msg.sender].vote = _voteIndex;
  voters[msg.sender].voted = true;
  candidates[_voteIndex].voteCount += 1;
  totalVotes +=1;
}

function endElection() public ownerOnly { 
        electionEnded = true;
    }

function getCandidates() public view returns (Candidate[] memory) {
  return candidates;
}

function getTotalVotes() public view returns (uint) {
  return totalVotes;
}

}
