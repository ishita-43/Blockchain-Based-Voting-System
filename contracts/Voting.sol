// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

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

mapping(address => Voter) public voters;
Candidate[] public candidates;
uint public totalVotes;

modifier ownerOnly(){
 require(msg.sender == owner, "Caller is not owner");
}

constructor(string memory_name) {
owner = msg.sender;
electionName = _name;
}

function addCandidate(string memory_name) public ownerOnly{
candidate.push(Candidate(candidates.length, _name, 0)) ;
}

function authorize(address _person) public ownerOnly {
voters[_person].authorized =true;
}

function vote(unit _voteIndex) public {
require(!voters[msg.sender].voted, "You have already voted");
require(voters[msg.sender].authorized, " You are not authorized to vote") ;
voters[msg.sender].vote =_voteIndex;
voters[msg.sender].voted = true;
candidates[_voteIndex].voteCount += 1;
totalVotes +=1;
}

function getCandidates() public view returns (Candidate[] memory) {
return candidates;
}

function getTotalVotes() public view returns (uint) {
return totalVotes;
}

}
