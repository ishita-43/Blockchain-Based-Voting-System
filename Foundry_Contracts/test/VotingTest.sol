// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "forge-std/Test.sol";
import "../src/Voting.sol";

contract VotingTest is Test {
    Voting voting;
    address owner = makeAddr("Owner");
    address voter1 = makeAddr("Voter1");
    address voter2 = makeAddr("Voter2");

    function setUp() public {
        // Deploy the Voting contract with the owner as msg.sender
        vm.prank(owner);
        voting = new Voting("Election 2024");
    }

    function testElectionName() public view {
        assertEq(voting.electionName(), "Election 2024");
    }

    function testOwnerIsCorrect() public view{
        assertEq(voting.owner(), owner);
    }

    function testAddCandidateAsOwner() public {
        // Only the owner can add a candidate
        vm.startPrank(owner);
        voting.addCandidate("Candidate 1");
        voting.addCandidate("Candidate 2");
        vm.stopPrank();

        Voting.Candidate[] memory candidates = voting.getCandidates();
        assertEq(candidates.length, 2);
        assertEq(candidates[0].name, "Candidate 1");
        assertEq(candidates[1].name, "Candidate 2");
    }

    function testAddCandidateNotOwner() public {
        // Expect revert when non-owner tries to add a candidate
        vm.expectRevert(Voting.Voting__NotOwner.selector);
        voting.addCandidate("Non-owner Candidate");
    }

    function testAuthorizeVoterAsOwner() public {
        // Only the owner can authorize a voter
        vm.prank(owner);
        voting.authorize(voter1);

        // Fetch the Voter struct and check the authorized field
        ( , , bool authorized) = voting.voters(voter1);
        assertTrue(authorized);
    }

    function testAuthorizeVoterNotOwner() public {
        // Expect revert when non-owner tries to authorize a voter
        vm.expectRevert(Voting.Voting__NotOwner.selector);
        voting.authorize(voter1);
    }

    function testVoteAfterAuthorization() public {
        // Owner authorizes voter1
        vm.startPrank(owner);
        voting.addCandidate("Candidate 1");
        voting.authorize(voter1);
        vm.stopPrank();

        // voter1 votes for candidate 0
        vm.prank(voter1);
        voting.vote(0);

        Voting.Candidate[] memory candidates = voting.getCandidates();
        (bool voted,,) = voting.voters(voter1); // Check the "voted" field
        assertTrue(voted);
        assertEq(candidates[0].voteCount, 1);
        assertEq(voting.totalVotes(), 1);
    }

    function testVoteWithoutAuthorization() public {
        // voter1 tries to vote without being authorized
        vm.prank(voter1);
        vm.expectRevert(Voting.Voting__NotAuthorized.selector);
        voting.vote(0);
    }

    function testVoteTwice() public {
        // Owner authorizes voter1
        vm.startPrank(owner);
        voting.addCandidate("Candidate 1");
        voting.authorize(voter1);
        vm.stopPrank();
        // voter1 votes for candidate 0
        vm.prank(voter1);
        voting.vote(0);

        // voter1 tries to vote again
        vm.prank(voter1);
        vm.expectRevert(Voting.Voting__AlreadyVoted.selector);
        voting.vote(0);
    }

    function testVoteWithInvalidCandidate() public {
        // Owner authorizes voter1
        vm.prank(owner);
        voting.authorize(voter1);

        // voter1 tries to vote for a non-existent candidate (invalid index)
        vm.prank(voter1);
        vm.expectRevert(Voting.Voting__IncorrectVoteIndex.selector);
        voting.vote(100); // No candidate at index 100
    }
}
