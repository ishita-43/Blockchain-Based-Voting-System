// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Voting{

struct Voter{
  bool voted;
  bool authorized;
  uint vote;
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

function addCandidate(string memory _name) public ownerOnly {
    // Check if a candidate with the same name already exists
    for (uint i = 0; i < candidates.length; i++) {
        require(
            keccak256(abi.encodePacked(candidates[i].name)) != keccak256(abi.encodePacked(_name)),
            "Candidate already exists"
        );
    }

    // Add the new candidate if no duplicate is found
    candidates.push(Candidate(candidates.length, _name, 0));
}


function authorize(address _person) public ownerOnly {
  // check if voter is already authorised
   require(!voters[_person].authorized, "Voter is already authorized");

  voters[_person].authorized = true;
}

function vote(uint _voteIndex) public {
  if (voters[msg.sender].voted) revert Voting__AlreadyVoted();
  if (!voters[msg.sender].authorized) revert Voting__NotAuthorized();
  if (_voteIndex >= candidates.length) revert Voting__IncorrectVoteIndex();

  voters[msg.sender].vote = _voteIndex;
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
